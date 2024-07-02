<template>
  <div class="wrapper">
    <AppNav />
    <main>
      <div class="px-32 py-12 bg-gray">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import AppNav from '@/components/common/AppNav.vue';
export default {
  name: 'TemplateLayout',
  components: {
    AppNav
  }
};
</script>

<style>
.wrapper {
  max-width: 2100px;
  margin: 0 auto;
}
</style>
