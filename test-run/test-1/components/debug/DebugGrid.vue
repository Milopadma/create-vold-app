<template>
  <div v-if="active" class="debug-grid">
    <div v-for="item in useDevice().isMobile ? 4 : 12" :key="item" class="grid-item"></div>
  </div>
</template>

<script setup>
const active = ref(false);

const eventKeyboard = () => {
  if (event.shiftKey && event.key === 'G') {
    if (active.value) {
      active.value = false;
    } else {
      active.value = true;
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
.debug-grid {
  position: fixed;
  z-index: 9999;
  inset: 0;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(var.$grid-col, 1fr);
  gap: fn.toVw(var.$grid-gap);
  padding: 0 fn.toVw(var.$container);
  pointer-events: none;

  @include mx.mobile {
    grid-template-columns: repeat(var.$grid-col-m, 1fr);
    gap: fn.toVw(var.$grid-gap-m);
    padding: 0 fn.toVw(var.$container-m);
  }

  .grid-item {
    height: 100%;
    background-color: red;
    opacity: 0.15;
  }
}
</style>
