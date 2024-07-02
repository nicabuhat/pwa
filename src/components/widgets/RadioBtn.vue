<template>
  <label :for="id" class="radio-container">
    <input
      type="radio"
      :id="id"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
      class="radio-input" />
    <span class="radio-button"></span>
    <span class="radio-text"><slot></slot></span>
  </label>
</template>

<script>
export default {
  name: 'RadioButton'
};
</script>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  id: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.radio-container {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
}

.radio-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.radio-button {
  position: absolute;
  top: 50%;
  left: 0;
  height: 24px;
  width: 24px;
  background-color: trasparent;
  border: 2px solid black;
  border-radius: 100%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
}

.radio-container:hover .radio-input ~ .radio-button {
  background-color: #1a72b1;
  border-color: #1a72b1;
  transition: all 0.3s ease;
}

.radio-container .radio-input:checked ~ .radio-button {
  background-color: transparent;
  border-color: #1a72b1;
}

.radio-button:after {
  content: '';
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #1a72b1;
}

.radio-container .radio-input:checked ~ .radio-button:after {
  display: block;
}

.radio-text {
  margin-left: 32px;
}
</style>
