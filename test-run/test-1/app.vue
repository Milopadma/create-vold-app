<script setup>
import mobilebar from './utils/mobilebar';

const tlTransition = useTlTransition();
const isTransition = useIsTransition();
const elPageTransition = ref();

onMounted(() => {
  configDefault();
  resize();
  mobilebar();
});

useHead({
  titleTemplate: `%s ― create-vold-app`,
});

useSeoMeta({
  title: 'create-vold-app',
  ogTitle: 'create-vold-app',
  description: 'Vold app project',
  ogDescription: 'Vold app project',
  ogImage: '/hero.jpg',
  twitterCard: 'summary_large_image',
});

const pageTransition = {
  name: 'page',
  mode: 'out-in',
  onEnter: (el, done) => {
    setTimeout(() => {
      tlTransition.value.reverse();
    }, 200);

    done();
    isTransition.value = false;
  },
  onLeave: (el, done) => {
    isTransition.value = true;
    tlTransition.value.play();

    tlTransition.value.eventCallback('onComplete', () => {
      done();
      elPageTransition.value.isRotate = true;
    });
  },
};
</script>

<template>
  <Html lang="en">
    <Body>
      <!-- Header -->
      <BaseHeader />

      <BasePageTransition ref="elPageTransition" />

      <DebugGrid />
      <DebugBorders />

      <BaseCursor />

      <!-- Layout -->
      <NuxtLayout :class="{ 'is--transition': isTransition }">
        <NuxtPage :transition="pageTransition" />
      </NuxtLayout>

      <!-- Footer -->
      <BaseFooter />
    </Body>
  </Html>
</template>
