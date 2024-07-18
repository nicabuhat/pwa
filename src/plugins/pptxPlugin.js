import { inject } from 'vue';
import PptxGenJS from 'pptxgenjs';
import JSZip from 'jszip';

const PPTXSymbol = Symbol('PPTX');

export function createPPTXPlugin() {
  return {
    install: (app) => {
      const generatePPTX = async (template, data) => {
        console.log('Starting PPTX generation');
        console.log('Data to be injected:', data);

        if (!template) {
          throw new Error('Template is required');
        }

        try {
          const zip = new JSZip();
          await zip.loadAsync(template);

          // Check if presentation.xml exists
          const presentationFile = zip.file('ppt/presentation.xml');
          if (!presentationFile) {
            throw new Error('presentation.xml not found in the template');
          }

          // Read the presentation.xml file
          const presentationXml = await presentationFile.async('text');
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(presentationXml, 'text/xml');

          // Get all slide references
          const slideRefs = xmlDoc.getElementsByTagName('p:sldId');
          console.log(`Number of slides found: ${slideRefs.length}`);

          // Create a new presentation
          const pres = new PptxGenJS();

          for (let i = 0; i < slideRefs.length; i++) {
            const slideId = slideRefs[i].getAttribute('r:id');
            const slideFilePath = `ppt/slides/${slideId}.xml`;
            const slideFile = zip.file(slideFilePath);

            if (!slideFile) {
              console.warn(`Slide file not found: ${slideFilePath}`);
              continue;
            }

            const slideXml = await slideFile.async('text');
            const slideDoc = parser.parseFromString(slideXml, 'text/xml');

            const slide = pres.addSlide();

            // Process text boxes
            const textBoxes = slideDoc.getElementsByTagName('a:t');
            for (let j = 0; j < textBoxes.length; j++) {
              let text = textBoxes[j].textContent;
              // Replace placeholders
              Object.keys(data).forEach((key) => {
                const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
                text = text.replace(regex, data[key]);
              });

              // Find the parent p:sp element to get the shape properties
              let currentElement = textBoxes[j].parentElement;
              while (currentElement && currentElement.tagName !== 'p:sp') {
                currentElement = currentElement.parentElement;
              }

              if (currentElement) {
                const xfrm = currentElement.getElementsByTagName('a:xfrm')[0];
                const off = xfrm.getElementsByTagName('a:off')[0];
                const ext = xfrm.getElementsByTagName('a:ext')[0];

                const x = parseInt(off.getAttribute('x')) / 914400; // Convert EMUs to inches
                const y = parseInt(off.getAttribute('y')) / 914400;
                const w = parseInt(ext.getAttribute('cx')) / 914400;
                const h = parseInt(ext.getAttribute('cy')) / 914400;

                slide.addText(text, { x, y, w, h });
              }
            }

            // Process images
            const blipFills = slideDoc.getElementsByTagName('p:blipFill');
            for (let j = 0; j < blipFills.length; j++) {
              const blip = blipFills[j].getElementsByTagName('a:blip')[0];
              const imageId = blip.getAttribute('r:embed');
              const imagePath = `ppt/media/${imageId}.png`; // Assuming PNG, adjust if needed

              const imageFile = zip.file(imagePath);
              if (!imageFile) {
                console.warn(`Image file not found: ${imagePath}`);
                continue;
              }

              const imageData = await imageFile.async('base64');

              // Find the parent p:pic element to get the image properties
              let currentElement = blipFills[j].parentElement;
              while (currentElement && currentElement.tagName !== 'p:pic') {
                currentElement = currentElement.parentElement;
              }

              if (currentElement) {
                const xfrm = currentElement.getElementsByTagName('a:xfrm')[0];
                const off = xfrm.getElementsByTagName('a:off')[0];
                const ext = xfrm.getElementsByTagName('a:ext')[0];

                const x = parseInt(off.getAttribute('x')) / 914400; // Convert EMUs to inches
                const y = parseInt(off.getAttribute('y')) / 914400;
                const w = parseInt(ext.getAttribute('cx')) / 914400;
                const h = parseInt(ext.getAttribute('cy')) / 914400;

                slide.addImage({
                  data: `data:image/png;base64,${imageData}`,
                  x,
                  y,
                  w,
                  h
                });
              }
            }

            console.log(`Processed slide ${i + 1}`);
          }

          console.log('Template processed successfully');
          return pres;
        } catch (error) {
          console.error('Error processing template:', error);
          throw error;
        }
      };

      app.provide(PPTXSymbol, generatePPTX);
    }
  };
}

export function usePPTX() {
  const generatePPTX = inject(PPTXSymbol);
  if (!generatePPTX) {
    throw new Error('PPTX plugin not properly installed');
  }
  return generatePPTX;
}
