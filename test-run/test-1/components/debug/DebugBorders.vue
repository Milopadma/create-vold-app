<template>
  <div v-if="active" class="debug-borders">
    <div v-for="item in useDevice().isMobile ? 4 : 12" :key="item" class="border-item"></div>
  </div>
</template>

<script setup>
const active = ref(false);

const eventKeyboard = () => {
  if (event.shiftKey && event.key === 'D') {
    if (active.value) {
      active.value = false;
      document.querySelectorAll('*:not(#nuxt-devtools-anchor div)').forEach((el) => {
        el.style.outline = '';
      });
    } else {
      active.value = true;
      document.querySelectorAll('*:not(#nuxt-devtools-anchor div)').forEach((el) => {
        el.style.outline = '1px solid red';
      });
    }
  }
};

onMounted(() => {
  document.addEventListener('keydown', eventKeyboard);
});

onUnmounted(() => {
  document.removeEventListener('keydown', eventKeyboard);
});
</script>

<style scoped lang="scss">
.debug-borders {
  .border-item {
    border: 1px solid red;
  }
}
</style>
