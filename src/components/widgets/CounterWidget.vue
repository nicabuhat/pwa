<template>
  <div
    class="flex items-center space-x-2 border border-light-gray rounded-full p-1">
    <button
      @click="$emit('decrement')"
      class="bg-white h-12 w-12 rounded-full grid place-content-center font-bold">
      <i class="fa-light fa-minus"></i>
    </button>
    <span class="text-lg font-bold">{{ count }}</span>
    <button
      @click="$emit('increment')"
      class="bg-white h-12 w-12 rounded-full grid place-content-center font-bold">
      <i class="fa-light fa-plus"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CounterWidget'
};
</script>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  count: {
    type: Number,
    required: true
  }
});

defineEmits(['increment', 'decrement']);
</script>

<style scoped></style>
