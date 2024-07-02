<template>
  <TemplateLayout>
    <div class="grid grid-cols-12 h-[75vh] grid-rows-1">
      <div class="col-span-6 h-0 min-h-full space-y-6">
        <div>
          <h1 class="text-6xl font-bold">{{ product.name }}</h1>
          <p class="text-lg">{{ product.description }}</p>
        </div>
        <span class="block text-4xl font-serif font-bold"
          >${{ product.price.toFixed(2) }}</span
        >
        <div class="font-bold flex items-center space-x-8 text-lg">
          <div
            class="flavor bg-white rounded-full py-2 px-4 flex space-x-2 items-center">
            <div class="color h-5 w-5 bg-gold rounded-full"></div>
            <div>{{ product.flavor }}</div>
          </div>
          <div>4 Packs</div>
        </div>
        <div>
          <div>
            <span>Frequency: </span>
            <span class="font-bold text-lg">Delivery every 30 Days</span>
          </div>
        </div>
        <div class="font-bold flex space-x-8 pb-12 text-lg">
          <RadioBtn id="weight1" value="75" v-model="weight"> 75mg </RadioBtn>
          <RadioBtn id="weight2" value="150" v-model="weight"> 150mg </RadioBtn>
          <RadioBtn id="weight3" value="225" v-model="weight"> 225mg </RadioBtn>
        </div>
        <hr />
        <div class="flex space-x-8 py-4">
          <CounterWidget
            :count="count"
            @increment="increment"
            @decrement="decrement" />
          <CartBtn />
        </div>
        <hr />
      </div>
      <div class="col-span-1"></div>
      <div div class="col-span-5 ml-auto h-full">
        <img class="h-max-full aspect-auto" :src="product.image" alt="" />
      </div>
    </div>
  </TemplateLayout>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import TemplateLayout from '@/components/layout/TemplateLayout.vue';
import CounterWidget from '@/components/widgets/CounterWidget.vue';
import CartBtn from '@/components/widgets/CartBtn.vue';
import RadioBtn from '@/components/widgets/RadioBtn.vue';

defineProps({
  id: {
    type: Number,
    require: true
  },
  product: {
    type: Object,
    required: true
  }
});

const count = ref(0);
const weight = ref('1');

const increment = () => {
  count.value++;
};

const decrement = () => {
  if (count.value > 0) {
    count.value--;
  }
};

// const addToCart = () => {
//   // Implement add to cart functionality
//   console.log('Adding to cart:', {
//     ...props.product,
//     selectedWeight: weight.value,
//     quantity: count.value
//   });
// };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
hr {
  border: none;
  border-top: 2px dotted #141414;
  height: 1px;
}
</style>
