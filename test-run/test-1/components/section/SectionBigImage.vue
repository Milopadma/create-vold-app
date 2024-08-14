<script setup lang="ts">
import type { BigImageSection } from '~/types/cms';

const props = defineProps<{
  data: BigImageSection;
}>();

const elImg = ref<HTMLElement | null>(null);

if (useDevice().isDesktop) {
  useParallax(elImg, {
    speed: 15,
  });
}
</script>

<template>
  <section class="big-image-section">
    <div class="big-image">
      <div ref="elImg" class="big-image-container">
        <NuxtPicture :src="getImage(props.data.BigImageImage)" :img-attrs="{ alt: 'Full-width image' }" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.big-image-section {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.big-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .big-image-container {
    width: 100%;
    height: 100%;
  }

  &:deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
