<template>
  <button class="button-text">
    <slot />
  </button>
</template>

<script setup></script>

<style scoped lang="scss">
.button-text {
  color: var.$color-text;
  display: flex;
  align-items: center;
  gap: fn.toVw(12);
  cursor: pointer;
}
</style>
