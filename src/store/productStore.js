import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: []
  }),

  actions: {
    addProduct(product) {
      this.products.push(product);
    },

    updateProduct(id, updatedProduct) {
      const index = this.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedProduct };
      }
    },

    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
    },

    updateWeight(id, newWeight) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        product.weight = newWeight;
      }
    },

    updateDelivery(id, newDeliveryInfo) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        product.delivery = newDeliveryInfo;
      }
    },

    updatePacks(id, newPack) {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        product.packs = newPack;
      }
    }
  },

  getters: {
    getProductById: (state) => (id) => {
      return state.products.find((p) => p.id === id);
    }
  }
});
