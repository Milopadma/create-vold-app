<template>
  <section ref="el" class="wellness-slideshow">
    <div class="container">
      <div class="head">
        <TextLabel text="Integrative Wellness" />

        <p v-if="!useDevice().isMobile" class="d-desktop">/ Life Optimizing Program</p>
      </div>

      <div class="border"></div>

      <div class="content">
        <div class="title-wrapper">
          <MotionSplittext v-for="(item, index) in props.data.elementisTextImageSlide" :key="index" :reveal-line="false" :trigger="false">
            <h3 class="title font-heading2" :class="['title-' + index]">{{ item.elementisTextImageSlideTitle }}</h3>
          </MotionSplittext>
        </div>

        <p class="number font-body2">
          <span class="current">{{ useNumberPad(currentIndexText) }}&nbsp;</span>
          <span class="inactive">
            —
            <span class="total">{{ useNumberPad(totalIndexText) }}</span>
          </span>
        </p>

        <div v-if="useDevice().isMobile" class="image-wrapper d-mobile">
          <div v-for="(item, index) in props.data.elementisTextImageSlide" :key="index" class="d-desktop image" :class="['image-' + index]">
            <NuxtPicture :src="getImage(item.elementisTextImageSlideImage)" :img-attrs="{ alt: item.elementisTextImageSlideTitle }" />
          </div>
          <div v-for="(item, index) in props.data.elementisTextImageSlide" :key="index" class="d-mobile image" :class="['image-' + index]">
            <NuxtPicture :src="getImage(item.elementisTextImageSlideImageM)" :img-attrs="{ alt: item.elementisTextImageSlideTitle }" />
          </div>
        </div>

        <div class="desc-wrapper">
          <MotionSplittext v-for="(item, index) in props.data.elementisTextImageSlide" :key="index" :reveal-line="false" :trigger="false">
            <p class="desc" :class="['desc-' + index]">{{ item.elementisTextImageSlideDescription }}</p>
          </MotionSplittext>
        </div>

        <div class="navigation">
          <p class="nav-btn link" @click="slideTo('prev')">Prev</p>
          <span>/</span>
          <p class="nav-btn link" @click="slideTo('next')">Next</p>
        </div>

        <div v-if="!useDevice().isMobile" class="image-wrapper d-desktop">
          <div v-for="(item, index) in props.data.elementisTextImageSlide" :key="index" class="d-desktop image" :class="['image-' + index]">
            <NuxtPicture :src="getImage(item.elementisTextImageSlideImage)" :img-attrs="{ alt: item.elementisTextImageSlideTitle }" />
          </div>
          <div v-for="(item, index) in props.data.elementisTextImageSlideM" :key="index" class="d-mobile image" :class="['image-' + index]">
            <NuxtPicture :src="getImage(item.elementisTextImageSlideImage)" :img-attrs="{ alt: item.elementisTextImageSlideTitle }" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import type { TextImageSliderSection } from '~/types/cms';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const props = defineProps<{
  data: TextImageSliderSection;
}>();

const motionTextExit = {
  y: '-120%',
  stagger: 0,
  ease: 'expo.out',
  duration: 1.2,
  overwrite: true,
};

const motionTextExitReverse = {
  y: '120%',
  stagger: 0,
  ease: 'expo.out',
  duration: 1.2,
  overwrite: true,
};

const motionTextEnter = {
  y: 0,
  delay: 0.3,
  ease: 'expo.out',
  duration: 1.2,
  overwrite: true,
};

const el = ref();
const indexActive = ref(0);

const currentIndexText = computed(() => {
  return indexActive.value + 1;
});

const totalIndexText = computed(() => {
  return props.data.elementisTextImageSlide.length;
});

const slideTo = (direction: string) => {
  if (direction === 'prev') {
    indexActive.value = (indexActive.value - 1 + props.data.elementisTextImageSlide.length) % props.data.elementisTextImageSlide.length;
  } else {
    indexActive.value = (indexActive.value + 1) % props.data.elementisTextImageSlide.length;
  }
};

let ctx: gsap.Context;

onMounted(() => {
  let lastIndex = indexActive.value;

  const phase1Gradient = `linear-gradient(
            0deg,
            black 0% 1.4582633333333332%, transparent 1.4582633333333332% 3.3333333333333335%, black 3.3333333333333335% 4.591596666666667%, transparent 4.591596666666667% 6.666666666666667%, black 6.666666666666667% 7.72493%, transparent 7.72493% 10%, black 10% 10.858263333333333%, transparent 10.858263333333333% 13.333333333333334%, black 13.333333333333334% 13.991596666666668%, transparent 13.991596666666668% 16.666666666666668%, black 16.666666666666668% 17.12493%, transparent 17.12493% 20%, black 20% 20.258263333333336%, transparent 20.258263333333336% 23.333333333333336%, black 23.333333333333336% 23.39159666666667%, transparent 23.39159666666667% 26.666666666666668%, black 26.666666666666668% 26.666666666666668%, transparent 26.666666666666668% 30%, black 30% 30.000000000000004%, transparent 30.000000000000004% 33.333333333333336%, black 33.333333333333336% 33.333333333333336%, transparent 33.333333333333336% 36.66666666666667%, black 36.66666666666667% 36.666666666666664%, transparent 36.666666666666664% 40%, black 40% 40%, transparent 40% 43.333333333333336%, black 43.333333333333336% 43.333333333333336%, transparent 43.333333333333336% 46.66666666666667%, black 46.66666666666667% 46.666666666666664%, transparent 46.666666666666664% 50%, black 50% 50%, transparent 50% 53.333333333333336%, black 53.333333333333336% 53.333333333333336%, transparent 53.333333333333336% 56.66666666666667%, black 56.66666666666667% 56.666666666666664%, transparent 56.666666666666664% 60%, black 60% 60%, transparent 60% 63.333333333333336%, black 63.333333333333336% 63.333333333333336%, transparent 63.333333333333336% 66.66666666666667%, black 66.66666666666667% 66.66666666666667%, transparent 66.66666666666667% 70%, black 70% 70.00000000000001%, transparent 70.00000000000001% 73.33333333333334%, black 73.33333333333334% 73.33333333333334%, transparent 73.33333333333334% 76.66666666666667%, black 76.66666666666667% 76.66666666666667%, transparent 76.66666666666667% 80%, black 80% 80.00000000000001%, transparent 80.00000000000001% 83.33333333333334%, black 83.33333333333334% 83.33333333333334%, transparent 83.33333333333334% 86.66666666666667%, black 86.66666666666667% 86.66666666666667%, transparent 86.66666666666667% 90%, black 90% 90.00000000000001%, transparent 90.00000000000001% 93.33333333333334%, black 93.33333333333334% 93.33333333333334%, transparent 93.33333333333334% 96.66666666666667%, black 96.66666666666667% 96.66666666666667%, transparent 96.66666666666667% 100%
        )`;

  const phase2Gradient = `linear-gradient(
            0deg,
            black 0% 2.9932766666666666%, transparent 2.9932766666666666% 3.3333333333333335%, black 3.3333333333333335% 6.12661%, transparent 6.12661% 6.666666666666667%, black 6.666666666666667% 9.259943333333334%, transparent 9.259943333333334% 10%, black 10% 12.393276666666667%, transparent 12.393276666666667% 13.333333333333334%, black 13.333333333333334% 15.526610000000002%, transparent 15.526610000000002% 16.666666666666668%, black 16.666666666666668% 18.659943333333334%, transparent 18.659943333333334% 20%, black 20% 21.793276666666667%, transparent 21.793276666666667% 23.333333333333336%, black 23.333333333333336% 24.92661%, transparent 24.92661% 26.666666666666668%, black 26.666666666666668% 28.059943333333333%, transparent 28.059943333333333% 30%, black 30% 31.19327666666667%, transparent 31.19327666666667% 33.333333333333336%, black 33.333333333333336% 34.32661%, transparent 34.32661% 36.66666666666667%, black 36.66666666666667% 37.459943333333335%, transparent 37.459943333333335% 40%, black 40% 40.59327666666667%, transparent 40.59327666666667% 43.333333333333336%, black 43.333333333333336% 43.72661000000001%, transparent 43.72661000000001% 46.66666666666667%, black 46.66666666666667% 46.859943333333334%, transparent 46.859943333333334% 50%, black 50% 50%, transparent 50% 53.333333333333336%, black 53.333333333333336% 53.333333333333336%, transparent 53.333333333333336% 56.66666666666667%, black 56.66666666666667% 56.666666666666664%, transparent 56.666666666666664% 60%, black 60% 60%, transparent 60% 63.333333333333336%, black 63.333333333333336% 63.333333333333336%, transparent 63.333333333333336% 66.66666666666667%, black 66.66666666666667% 66.66666666666667%, transparent 66.66666666666667% 70%, black 70% 70.00000000000001%, transparent 70.00000000000001% 73.33333333333334%, black 73.33333333333334% 73.33333333333334%, transparent 73.33333333333334% 76.66666666666667%, black 76.66666666666667% 76.66666666666667%, transparent 76.66666666666667% 80%, black 80% 80.00000000000001%, transparent 80.00000000000001% 83.33333333333334%, black 83.33333333333334% 83.33333333333334%, transparent 83.33333333333334% 86.66666666666667%, black 86.66666666666667% 86.66666666666667%, transparent 86.66666666666667% 90%, black 90% 90.00000000000001%, transparent 90.00000000000001% 93.33333333333334%, black 93.33333333333334% 93.33333333333334%, transparent 93.33333333333334% 96.66666666666667%, black 96.66666666666667% 96.66666666666667%, transparent 96.66666666666667% 100%
        )`;

  const phase3Gradient = `linear-gradient(
            0deg,
            black 0% 3.3333333333333335%, transparent 3.3333333333333335% 3.3333333333333335%, black 3.3333333333333335% 6.666666666666667%, transparent 6.666666666666667% 6.666666666666667%, black 6.666666666666667% 10%, transparent 10% 10%, black 10% 13.333333333333334%, transparent 13.333333333333334% 13.333333333333334%, black 13.333333333333334% 16.666666666666668%, transparent 16.666666666666668% 16.666666666666668%, black 16.666666666666668% 20%, transparent 20% 20%, black 20% 23.328290000000003%, transparent 23.328290000000003% 23.333333333333336%, black 23.333333333333336% 26.461623333333335%, transparent 26.461623333333335% 26.666666666666668%, black 26.666666666666668% 29.59495666666667%, transparent 29.59495666666667% 30%, black 30% 32.72829%, transparent 32.72829% 33.333333333333336%, black 33.333333333333336% 35.86162333333334%, transparent 35.86162333333334% 36.66666666666667%, black 36.66666666666667% 38.99495666666667%, transparent 38.99495666666667% 40%, black 40% 42.12829%, transparent 42.12829% 43.333333333333336%, black 43.333333333333336% 45.26162333333334%, transparent 45.26162333333334% 46.66666666666667%, black 46.66666666666667% 48.394956666666666%, transparent 48.394956666666666% 50%, black 50% 51.528290000000005%, transparent 51.528290000000005% 53.333333333333336%, black 53.333333333333336% 54.66162333333334%, transparent 54.66162333333334% 56.66666666666667%, black 56.66666666666667% 57.794956666666664%, transparent 57.794956666666664% 60%, black 60% 60.928290000000004%, transparent 60.928290000000004% 63.333333333333336%, black 63.333333333333336% 64.06162333333334%, transparent 64.06162333333334% 66.66666666666667%, black 66.66666666666667% 67.19495666666667%, transparent 67.19495666666667% 70%, black 70% 70.32829000000001%, transparent 70.32829000000001% 73.33333333333334%, black 73.33333333333334% 73.46162333333334%, transparent 73.46162333333334% 76.66666666666667%, black 76.66666666666667% 76.66666666666667%, transparent 76.66666666666667% 80%, black 80% 80.00000000000001%, transparent 80.00000000000001% 83.33333333333334%, black 83.33333333333334% 83.33333333333334%, transparent 83.33333333333334% 86.66666666666667%, black 86.66666666666667% 86.66666666666667%, transparent 86.66666666666667% 90%, black 90% 90.00000000000001%, transparent 90.00000000000001% 93.33333333333334%, black 93.33333333333334% 93.33333333333334%, transparent 93.33333333333334% 96.66666666666667%, black 96.66666666666667% 96.66666666666667%, transparent 96.66666666666667% 100%
        )`;

  const phase4Gradient = `linear-gradient(
            0deg,
            black 0% 3.3333333333333335%, transparent 3.3333333333333335% 3.3333333333333335%, black 3.3333333333333335% 6.666666666666667%, transparent 6.666666666666667% 6.666666666666667%, black 6.666666666666667% 10%, transparent 10% 10%, black 10% 13.333333333333334%, transparent 13.333333333333334% 13.333333333333334%, black 13.333333333333334% 16.666666666666668%, transparent 16.666666666666668% 16.666666666666668%, black 16.666666666666668% 20%, transparent 20% 20%, black 20% 23.333333333333336%, transparent 23.333333333333336% 23.333333333333336%, black 23.333333333333336% 26.666666666666668%, transparent 26.666666666666668% 26.666666666666668%, black 26.666666666666668% 30%, transparent 30% 30%, black 30% 33.333333333333336%, transparent 33.333333333333336% 33.333333333333336%, black 33.333333333333336% 36.66666666666667%, transparent 36.66666666666667% 36.66666666666667%, black 36.66666666666667% 40%, transparent 40% 40%, black 40% 43.333333333333336%, transparent 43.333333333333336% 43.333333333333336%, black 43.333333333333336% 46.66666666666667%, transparent 46.66666666666667% 46.66666666666667%, black 46.66666666666667% 49.929973333333336%, transparent 49.929973333333336% 50%, black 50% 53.06330666666667%, transparent 53.06330666666667% 53.333333333333336%, black 53.333333333333336% 56.19664%, transparent 56.19664% 56.66666666666667%, black 56.66666666666667% 59.329973333333335%, transparent 59.329973333333335% 60%, black 60% 62.46330666666667%, transparent 62.46330666666667% 63.333333333333336%, black 63.333333333333336% 65.59664000000001%, transparent 65.59664000000001% 66.66666666666667%, black 66.66666666666667% 68.72997333333333%, transparent 68.72997333333333% 70%, black 70% 71.86330666666667%, transparent 71.86330666666667% 73.33333333333334%, black 73.33333333333334% 74.99664%, transparent 74.99664% 76.66666666666667%, black 76.66666666666667% 78.12997333333334%, transparent 78.12997333333334% 80%, black 80% 81.26330666666668%, transparent 81.26330666666668% 83.33333333333334%, black 83.33333333333334% 84.39664%, transparent 84.39664% 86.66666666666667%, black 86.66666666666667% 87.52997333333333%, transparent 87.52997333333333% 90%, black 90% 90.66330666666667%, transparent 90.66330666666667% 93.33333333333334%, black 93.33333333333334% 93.79664000000001%, transparent 93.79664000000001% 96.66666666666667%, black 96.66666666666667% 96.92997333333334%, transparent 96.92997333333334% 100%
        )`;

  const phase5Gradient = `linear-gradient(
            0deg,
            black 0% 3.3333333333333335%, transparent 3.3333333333333335% 3.3333333333333335%, black 3.3333333333333335% 6.666666666666667%, transparent 6.666666666666667% 6.666666666666667%, black 6.666666666666667% 10%, transparent 10% 10%, black 10% 13.333333333333334%, transparent 13.333333333333334% 13.333333333333334%, black 13.333333333333334% 16.666666666666668%, transparent 16.666666666666668% 16.666666666666668%, black 16.666666666666668% 20%, transparent 20% 20%, black 20% 23.333333333333336%, transparent 23.333333333333336% 23.333333333333336%, black 23.333333333333336% 26.666666666666668%, transparent 26.666666666666668% 26.666666666666668%, black 26.666666666666668% 30%, transparent 30% 30%, black 30% 33.333333333333336%, transparent 33.333333333333336% 33.333333333333336%, black 33.333333333333336% 36.66666666666667%, transparent 36.66666666666667% 36.66666666666667%, black 36.66666666666667% 40%, transparent 40% 40%, black 40% 43.333333333333336%, transparent 43.333333333333336% 43.333333333333336%, black 43.333333333333336% 46.66666666666667%, transparent 46.66666666666667% 46.66666666666667%, black 46.66666666666667% 50%, transparent 50% 50%, black 50% 53.333333333333336%, transparent 53.333333333333336% 53.333333333333336%, black 53.333333333333336% 56.66666666666667%, transparent 56.66666666666667% 56.66666666666667%, black 56.66666666666667% 60%, transparent 60% 60%, black 60% 63.333333333333336%, transparent 63.333333333333336% 63.333333333333336%, black 63.333333333333336% 66.66666666666667%, transparent 66.66666666666667% 66.66666666666667%, black 66.66666666666667% 70%, transparent 70% 70%, black 70% 73.33333333333334%, transparent 73.33333333333334% 73.33333333333334%, black 73.33333333333334% 76.53165333333334%, transparent 76.53165333333334% 76.66666666666667%, black 76.66666666666667% 79.66498666666666%, transparent 79.66498666666666% 80%, black 80% 82.79832%, transparent 82.79832% 83.33333333333334%, black 83.33333333333334% 85.93165333333334%, transparent 85.93165333333334% 86.66666666666667%, black 86.66666666666667% 89.06498666666667%, transparent 89.06498666666667% 90%, black 90% 92.19832000000001%, transparent 92.19832000000001% 93.33333333333334%, black 93.33333333333334% 95.33165333333334%, transparent 95.33165333333334% 96.66666666666667%, black 96.66666666666667% 98.46498666666666%, transparent 98.46498666666666% 100%
        )`;

  const phase6Gradient = `linear-gradient(
            0deg,
            black 0% 3.3333333333333335%, transparent 3.3333333333333335% 3.3333333333333335%, black 3.3333333333333335% 6.666666666666667%, transparent 6.666666666666667% 6.666666666666667%, black 6.666666666666667% 10%, transparent 10% 10%, black 10% 13.333333333333334%, transparent 13.333333333333334% 13.333333333333334%, black 13.333333333333334% 16.666666666666668%, transparent 16.666666666666668% 16.666666666666668%, black 16.666666666666668% 20%, transparent 20% 20%, black 20% 23.333333333333336%, transparent 23.333333333333336% 23.333333333333336%, black 23.333333333333336% 26.666666666666668%, transparent 26.666666666666668% 26.666666666666668%, black 26.666666666666668% 30%, transparent 30% 30%, black 30% 33.333333333333336%, transparent 33.333333333333336% 33.333333333333336%, black 33.333333333333336% 36.66666666666667%, transparent 36.66666666666667% 36.66666666666667%, black 36.66666666666667% 40%, transparent 40% 40%, black 40% 43.333333333333336%, transparent 43.333333333333336% 43.333333333333336%, black 43.333333333333336% 46.66666666666667%, transparent 46.66666666666667% 46.66666666666667%, black 46.66666666666667% 50%, transparent 50% 50%, black 50% 53.333333333333336%, transparent 53.333333333333336% 53.333333333333336%, black 53.333333333333336% 56.66666666666667%, transparent 56.66666666666667% 56.66666666666667%, black 56.66666666666667% 60%, transparent 60% 60%, black 60% 63.333333333333336%, transparent 63.333333333333336% 63.333333333333336%, black 63.333333333333336% 66.66666666666667%, transparent 66.66666666666667% 66.66666666666667%, black 66.66666666666667% 70%, transparent 70% 70%, black 70% 73.33333333333334%, transparent 73.33333333333334% 73.33333333333334%, black 73.33333333333334% 76.66666666666667%, transparent 76.66666666666667% 76.66666666666667%, black 76.66666666666667% 80%, transparent 80% 80%, black 80% 83.33333333333334%, transparent 83.33333333333334% 83.33333333333334%, black 83.33333333333334% 86.66666666666667%, transparent 86.66666666666667% 86.66666666666667%, black 86.66666666666667% 90%, transparent 90% 90%, black 90% 93.33333333333334%, transparent 93.33333333333334% 93.33333333333334%, black 93.33333333333334% 96.66666666666667%, transparent 96.66666666666667% 96.66666666666667%, black 96.66666666666667% 100%, transparent 100% 100%
        )`;

  const startGradient = `linear-gradient(
            0deg,
            black 0% 3.3333333333333335%, transparent 3.3333333333333335% 3.3333333333333335%, black 3.3333333333333335% 6.666666666666667%, transparent 6.666666666666667% 6.666666666666667%, black 6.666666666666667% 10%, transparent 10% 10%, black 10% 13.333333333333334%, transparent 13.333333333333334% 13.333333333333334%, black 13.333333333333334% 16.666666666666668%, transparent 16.666666666666668% 16.666666666666668%, black 16.666666666666668% 20%, transparent 20% 20%, black 20% 23.333333333333336%, transparent 23.333333333333336% 23.333333333333336%, black 23.333333333333336% 26.666666666666668%, transparent 26.666666666666668% 26.666666666666668%, black 26.666666666666668% 30%, transparent 30% 30%, black 30% 33.333333333333336%, transparent 33.333333333333336% 33.333333333333336%, black 33.333333333333336% 36.66666666666667%, transparent 36.66666666666667% 36.66666666666667%, black 36.66666666666667% 40%, transparent 40% 40%, black 40% 43.333333333333336%, transparent 43.333333333333336% 43.333333333333336%, black 43.333333333333336% 46.66666666666667%, transparent 46.66666666666667% 46.66666666666667%, black 46.66666666666667% 50%, transparent 50% 50%, black 50% 53.333333333333336%, transparent 53.333333333333336% 53.333333333333336%, black 53.333333333333336% 56.66666666666667%, transparent 56.66666666666667% 56.66666666666667%, black 56.66666666666667% 60%, transparent 60% 60%, black 60% 63.333333333333336%, transparent 63.333333333333336% 63.333333333333336%, black 63.333333333333336% 66.66666666666667%, transparent 66.66666666666667% 66.66666666666667%, black 66.66666666666667% 70%, transparent 70% 70%, black 70% 73.33333333333334%, transparent 73.33333333333334% 73.33333333333334%, black 73.33333333333334% 76.66666666666667%, transparent 76.66666666666667% 76.66666666666667%, black 76.66666666666667% 80%, transparent 80% 80%, black 80% 83.33333333333334%, transparent 83.33333333333334% 83.33333333333334%, black 83.33333333333334% 86.66666666666667%, transparent 86.66666666666667% 86.66666666666667%, black 86.66666666666667% 90%, transparent 90% 90%, black 90% 93.33333333333334%, transparent 93.33333333333334% 93.33333333333334%, black 93.33333333333334% 96.66666666666667%, transparent 96.66666666666667% 96.66666666666667%, black 96.66666666666667% 99.98465%, transparent 99.98465% 100%
        )`;

  const endGradient = `linear-gradient(
            0deg,
            black 0% 3.3333333333333335%, transparent 3.3333333333333335% 3.3333333333333335%, black 3.3333333333333335% 6.666666666666667%, transparent 6.666666666666667% 6.666666666666667%, black 6.666666666666667% 10%, transparent 10% 10%, black 10% 13.333333333333334%, transparent 13.333333333333334% 13.333333333333334%, black 13.333333333333334% 16.666666666666668%, transparent 16.666666666666668% 16.666666666666668%, black 16.666666666666668% 20%, transparent 20% 20%, black 20% 23.333333333333336%, transparent 23.333333333333336% 23.333333333333336%, black 23.333333333333336% 26.666666666666668%, transparent 26.666666666666668% 26.666666666666668%, black 26.666666666666668% 30%, transparent 30% 30%, black 30% 33.333333333333336%, transparent 33.333333333333336% 33.333333333333336%, black 33.333333333333336% 36.66666666666667%, transparent 36.66666666666667% 36.66666666666667%, black 36.66666666666667% 40%, transparent 40% 40%, black 40% 43.333333333333336%, transparent 43.333333333333336% 43.333333333333336%, black 43.333333333333336% 46.66666666666667%, transparent 46.66666666666667% 46.66666666666667%, black 46.66666666666667% 50%, transparent 50% 50%, black 50% 53.333333333333336%, transparent 53.333333333333336% 53.333333333333336%, black 53.333333333333336% 56.66666666666667%, transparent 56.66666666666667% 56.66666666666667%, black 56.66666666666667% 60%, transparent 60% 60%, black 60% 63.333333333333336%, transparent 63.333333333333336% 63.333333333333336%, black 63.333333333333336% 66.66666666666667%, transparent 66.66666666666667% 66.66666666666667%, black 66.66666666666667% 70%, transparent 70% 70%, black 70% 73.33333333333334%, transparent 73.33333333333334% 73.33333333333334%, black 73.33333333333334% 76.66666666666667%, transparent 76.66666666666667% 76.66666666666667%, black 76.66666666666667% 80%, transparent 80% 80%, black 80% 83.33333333333334%, transparent 83.33333333333334% 83.33333333333334%, black 83.33333333333334% 86.66666666666667%, transparent 86.66666666666667% 86.66666666666667%, black 86.66666666666667% 90%, transparent 90% 90%, black 90% 93.33333333333334%, transparent 93.33333333333334% 93.33333333333334%, black 93.33333333333334% 96.66666666666667%, transparent 96.66666666666667% 96.66666666666667%, black 96.66666666666667% 100%, transparent 100% 100%
        )`;

  const endGradient2 = `linear-gradient(
            0deg,
            black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%, black 0% 0%, transparent 0% 0%
        )`;

  const endGradient3 = `linear-gradient(
            0deg,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%
        )`;

  const gradientSteps = [phase1Gradient, phase2Gradient, phase3Gradient, phase4Gradient, phase5Gradient, phase6Gradient, endGradient];

  const gradientStepsBackward = [
    endGradient,
    phase6Gradient,
    phase5Gradient,
    phase4Gradient,
    phase3Gradient,
    phase2Gradient,
    phase1Gradient,
    endGradient2,
  ];

  const gradientDuration = 0.1;

  ctx = gsap.context(() => {
    watch(indexActive, (value) => {
      const totalSlides = props.data.elementisTextImageSlide.length;
      const distance = (value - lastIndex + totalSlides) % totalSlides;
      const isForward = distance <= totalSlides / 2;

      if (isForward) {
        gsap.fromTo(`.wellness-slideshow .title-${lastIndex} .line`, { y: 0 }, { ...motionTextExit });
        gsap.fromTo(`.wellness-slideshow .desc-${lastIndex} .line`, { y: 0 }, { ...motionTextExit });

        gsap.fromTo(
          `.wellness-slideshow .title-${value} .line`,
          { y: '120%' },
          {
            ...motionTextEnter,
            stagger: {
              each: 0.1,
              from: 'start',
            },
          },
        );

        gsap.fromTo(
          `.wellness-slideshow .desc-${value} .line`,
          { y: '120%' },
          {
            ...motionTextEnter,
            stagger: {
              each: 0.1,
              from: 'start',
            },
          },
        );

        const tl = gsap.timeline({
          defaults: {
            duration: 1,
            ease: 'none',
          },
          onComplete: () => {
            if (useDevice().isMobile) return;

            if (value === 0) {
              gsap.set(`.wellness-slideshow .image-${totalSlides - 1}`, {
                display: 'none',
                overwrite: true,
              });
            } else {
              gsap.set(`.wellness-slideshow .image-${value - 1}`, {
                display: 'none',
                overwrite: true,
              });
            }
          },
        });

        if (useDevice().isDesktop) {
          tl.set(`.wellness-slideshow .image-${value}`, {
            '--mask-gradient': endGradient2,
            display: 'block',
            zIndex: 2,
          });

          tl.set(`.wellness-slideshow .image-${lastIndex}`, {
            '--mask-gradient': endGradient,
            zIndex: 1,
          });

          gradientSteps.forEach((gradient) => {
            tl.to(`.wellness-slideshow .image-${value}`, {
              '--mask-gradient': gradient,
              duration: gradientDuration,
            });
          });
        } else {
          tl.to(
            `.wellness-slideshow .image-${lastIndex}`,
            {
              clipPath: 'inset(0% 0% 100% 0%)',
              display: 'block',
              zIndex: 1,
              duration: 1.2,
              ease: 'expo.out',
            },
            '<',
          );

          tl.fromTo(
            `.wellness-slideshow .image-${value}`,
            {
              clipPath: 'inset(100% 0% 0% 0%)',
            },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              display: 'block',
              zIndex: 2,
              duration: 1.2,
              ease: 'expo.out',
            },
            '<',
          );
        }
      } else {
        gsap.fromTo(`.wellness-slideshow .title-${lastIndex} .line`, { y: 0 }, { ...motionTextExitReverse });
        gsap.fromTo(`.wellness-slideshow .desc-${lastIndex} .line`, { y: 0 }, { ...motionTextExitReverse });

        gsap.fromTo(
          `.wellness-slideshow .title-${value} .line`,
          { y: '-120%' },
          {
            ...motionTextEnter,
            stagger: {
              each: 0.1,
              from: 'end',
            },
          },
        );

        gsap.fromTo(
          `.wellness-slideshow .desc-${value} .line`,
          { y: '-120%' },
          {
            ...motionTextEnter,
            stagger: {
              each: 0.1,
              from: 'end',
            },
          },
        );

        const tl = gsap.timeline({
          defaults: {
            duration: 1,
            ease: 'none',
          },
          onComplete: () => {
            if (useDevice().isMobile) return;

            if (value === totalSlides - 1) {
              gsap.set(`.wellness-slideshow .image-0`, {
                display: 'none',
                overwrite: true,
              });
            } else {
              gsap.set(`.wellness-slideshow .image-${value + 1}`, {
                display: 'none',
                overwrite: true,
              });
            }
          },
        });

        if (useDevice().isDesktop) {
          tl.set(`.wellness-slideshow .image-${value}`, {
            '--mask-gradient': startGradient,
            display: 'block',
            zIndex: 1,
          });

          tl.set(`.wellness-slideshow .image-${lastIndex}`, {
            '--mask-gradient': endGradient,
            zIndex: 2,
          });

          gradientStepsBackward.forEach((gradient) => {
            tl.to(`.wellness-slideshow .image-${lastIndex}`, {
              '--mask-gradient': gradient,
              duration: gradientDuration,
            });
          });
        } else {
          tl.to(
            `.wellness-slideshow .image-${lastIndex}`,
            {
              clipPath: 'inset(100% 0% 0% 0%)',
              display: 'block',
              zIndex: 1,
              duration: 1.2,
              ease: 'expo.out',
            },
            '<',
          );

          tl.fromTo(
            `.wellness-slideshow .image-${value}`,
            {
              clipPath: 'inset(0% 0% 100% 0%)',
            },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              display: 'block',
              zIndex: 2,
              duration: 1.2,
              ease: 'expo.out',
            },
            '<',
          );
        }
      }

      lastIndex = value;
    });
  }, el.value);
});

onUnmounted(() => {
  ctx && ctx.revert();
});
</script>

<style scoped lang="scss">
.wellness-slideshow {
  background-color: var.$color-secondary;

  --basesvh: 812;

  @include mx.mobile {
    height: calc(100vh - var(--vhmobilebar));
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: fn.toVw(25) 0;

    @include mx.mobile {
      padding: fn.toVw(20) 0;
    }
  }

  .border {
    background-color: var.$color-text;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(var.$grid-col, 1fr);
    column-gap: fn.toVw(var.$grid-gap);
    padding: fn.toVw(33) 0;

    @include mx.mobile {
      display: flex;
      flex-direction: column;
      padding-top: calc(100svh * 64 / var(--basesvh));
      padding-bottom: calc(100svh * 87 / var(--basesvh));
    }

    .image-wrapper {
      width: 100%;
      height: fn.toVw(688);
      max-height: 85vh;
      grid-column: 8/-1;
      grid-row: 1/3;
      position: relative;

      @include mx.mobile {
        order: 2;
        height: calc(100svh * 234 / var(--basesvh));
      }

      &:deep(img) {
        width: 100%;
        height: 100%;
      }
    }

    .image {
      --mask-gradient: linear-gradient(
        0deg,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%,
        black 0% 0%,
        transparent 0% 0%
      );

      padding-left: fn.toVw(9);
      width: 100%;
      height: 100%;
      position: absolute;
      inset: 0;

      mask-image: var(--mask-gradient);
      will-change: mask-image;

      display: none;

      @include mx.mobile {
        padding-left: 0;
        mask-image: none;
        clip-path: inset(100% 0 0 0);
        will-change: clip-path;
      }

      &.image-0 {
        --mask-gradient: linear-gradient(
          0deg,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%,
          black 100% 100%,
          transparent 100% 100%
        );

        display: block;

        @include mx.mobile {
          clip-path: inset(0 0 0 0);
          will-change: clip-path;
        }
      }
    }

    .title-0,
    .desc-0 {
      &:deep(.masking-text) {
        .line {
          transform: translateY(0%);
        }
      }
    }

    .title-wrapper {
      width: 100%;
      max-width: fn.toVw(496);
      margin-top: fn.toVw(126);
      margin-bottom: fn.toVw(88);
      grid-column: 1/6;
      position: relative;

      @include mx.mobile {
        order: 3;
        margin-top: calc(100svh * 48 / var(--basesvh));
        margin-bottom: calc(100svh * 88 / var(--basesvh));
      }

      .title {
        position: absolute;
        inset: 0;
        width: 100%;
        backface-visibility: hidden;
      }
    }

    .number {
      display: flex;
      grid-column: 1/2;

      .current {
        width: fn.toVw(30);
      }

      @include mx.mobile {
        order: 1;
        margin-bottom: calc(100svh * 24 / var(--basesvh));
      }

      .inactive {
        opacity: 0.5;
      }
    }

    .desc-wrapper {
      overflow: hidden;
      width: 100%;
      max-width: fn.toVw(340);
      height: fn.toVw(200);
      grid-column: 3/7;
      font-size: fn.toVw(18);
      line-height: calc(24 / 18);
      position: relative;

      @include mx.mobile {
        height: calc(100svh * 140 / var(--basesvh));
        order: 4;
        font-size: fn.toVw(16);
        padding-right: 0;
      }

      .desc {
        position: absolute;
        inset: 0;
        backface-visibility: hidden;
      }
    }

    .navigation {
      grid-column: 3/7;
      display: flex;
      align-items: center;
      gap: fn.toVw(20);
      margin-top: fn.toVw(-133);
      user-select: none;

      @include mx.mobile {
        margin-top: calc(100svh * 40 / var(--basesvh));
        order: 4;
      }

      .nav-btn {
        cursor: pointer;
        padding: 1rem;
        margin: -1rem;

        &::before {
          width: calc(100% - 1rem * 2);
          bottom: 1rem;
          left: 1rem;
        }
      }
    }
  }
}
</style>
