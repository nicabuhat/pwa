<template>
  <div class="wrapper">
    <ul>
      <li v-for="product in data || []" :key="product.id">
        <ProductPage :id="product.id" :product="product" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductPage from './components/pages/ProductPage.vue';

const data = ref(null);
const loading = ref(true);
const error = ref(null);

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
</script>

<style>
.wrapper {
  max-width: 2100px;
  margin: 0 auto;
}
</style>
