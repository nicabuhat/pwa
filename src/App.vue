<template>
  <div class="wrapper">
    <ul>
      <li v-for="product in data || []" :key="product.id">
        <ProductPage :id="product.id" :product="product" />
      </li>
    </ul>
    <button @click="handleGeneratePPTX" :disabled="isGenerating">
      {{ isGenerating ? 'Generating...' : 'Generate and Download PPTX' }}
    </button>
    <p v-if="errorMessage" style="color: red">Error: {{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePPTX } from '@/plugins/pptxPlugin';
import ProductPage from './components/pages/ProductPage.vue';

const data = ref(null);
const loading = ref(true);
const error = ref(null);
const generatePPTX = usePPTX();
const isGenerating = ref(false);
const errorMessage = ref('');

const loadData = async () => {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data.value = await response.json();
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);

const handleGeneratePPTX = async () => {
  if (isGenerating.value) return;

  isGenerating.value = true;
  errorMessage.value = '';
  try {
    const response = await fetch('/templates/presentation-template.pptx');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const templateArrayBuffer = await response.arrayBuffer();

    console.log(
      'Template loaded, size:',
      templateArrayBuffer.byteLength,
      'bytes'
    );

    const pres = await generatePPTX(templateArrayBuffer, {
      name: 'My Presentation Title',
      flavor: 'Presentation Subtitle'
      // Add more key-value pairs as needed for your placeholders
    });

    // Trigger the download
    await pres.writeFile({ fileName: 'generated-presentation.pptx' });

    console.log('PPTX generated and downloaded successfully');
  } catch (error) {
    console.error('Error generating PPTX:', error);
    errorMessage.value = error.message;
  } finally {
    isGenerating.value = false;
  }
};

handleGeneratePPTX();
</script>

<style>
.wrapper {
  max-width: 2100px;
  margin: 0 auto;
}
</style>
