<template>
  <section ref="el" class="innovation">
    <div class="bg">
      <div class="overlay-black"></div>
      <div v-for="(item, index) in slides" :key="index" class="image" :class="['image-' + index]">
        <NuxtPicture class="d-desktop" :src="getImage(item.HorizontalScrollSlideImage)" :img-attrs="{ alt: item.HorizontalScrollSlideTitle }" />
        <NuxtPicture class="d-mobile" :src="getImage(item.HorizontalScrollSlideImageM)" :img-attrs="{ alt: item.HorizontalScrollSlideTitle }" />
      </div>
    </div>

    <div v-if="useDevice().isMobile" class="label-mobile top">
      <TextLabel :text="data.HorizontalScrollSubtitle" />
    </div>

    <div v-if="!useDevice().isMobile" class="text-floating">
      <TextLabel :text="data.HorizontalScrollSubtitle" />
      <p class="scroll font-body1">( Keep Scrolling )</p>
    </div>

    <div class="poster">
      <p class="number font-caption1">
        <span class="current">{{ numberPad(currentIndexText) }}</span>
        <span class="inactive">
          — <span class="total">{{ numberPad(totalIndexText) }}</span></span
        >
      </p>

      <div class="title-wrapper">
        <MotionSplittext v-for="(slide, index) in slides" :key="index" :reveal-line="false" :trigger="false">
          <h3 class="title font-subheading2" :class="['title-' + index]">{{ slide.HorizontalScrollSlideTitle }}</h3>
        </MotionSplittext>
      </div>

      <div class="image-wrapper">
        <div class="image-inner">
          <div v-for="(slide, index) in slides" :key="index" class="image-center" :class="['image-center-' + index]">
            <NuxtPicture :src="getImage(slide.HorizontalScrollSlideImage)" :img-attrs="{ alt: slide.HorizontalScrollSlideSubTitle }" />
          </div>
        </div>
      </div>

      <div class="desc-wrapper">
        <MotionSplittext v-for="(slide, index) in slides" :key="index" :reveal-line="false" :trigger="false">
          <div class="desc font-body3" :class="['desc-' + index]">
            {{ slide.HorizontalScrollSlideDescription }}
          </div>
        </MotionSplittext>
      </div>
    </div>

    <div v-if="useDevice().isMobile" class="label-mobile bottom">
      <p class="scroll font-body1">( Keep Scrolling )</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { HorizontalScrollSection } from '~/types/cms';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const props = defineProps<{
  data: HorizontalScrollSection;
}>();

const slides = computed(() => props.data.HorizontalScrollSlide);

const el = ref();
const indexActive = ref(0);

const currentIndexText = computed(() => {
  return indexActive.value + 1;
});

const totalIndexText = computed(() => {
  return slides.value.length;
});

const numberPad = (number: number) => {
  return number.toString().padStart(2, '0');
};

const motionTextExit = {
  y: '-120%',
  stagger: 0,
  ease: 'expo.out',
  duration: 1.4,
  overwrite: true,
};

const motionTextExitReverse = {
  y: '120%',
  stagger: 0,
  ease: 'expo.out',
  duration: 1.4,
  overwrite: true,
};

const motionTextEnter = {
  y: 0,
  delay: 0.35,
  ease: 'expo.out',
  duration: 1.4,
  overwrite: true,
};

const headerOut = () => {
  const header = document.getElementById('header');

  const hideHeader = () => {
    gsap.to(header, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'none',
    });
  };

  const showHeader = () => {
    gsap.to(header, {
      autoAlpha: 1,
      duration: 0.3,
      ease: 'none',
    });
  };

  ScrollTrigger.create({
    trigger: el.value,
    start: 'top top',
    end: `+=${(slides.value.length - 1) * 100}%`,
    invalidateOnRefresh: true,
    onEnter: () => {
      hideHeader();
    },
    onEnterBack: () => {
      hideHeader();
    },
    onLeaveBack: () => {
      showHeader();
    },
    onLeave: () => {
      showHeader();
    },
  });
};

let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    headerOut();

    gsap.from(`.innovation .poster`, {
      yPercent: 200,
      willChange: 'transform',
      ease: 'power4.out',
      duration: 1.6,
      scrollTrigger: {
        trigger: el.value,
        start: 'top center',
      },
    });

    watch(indexActive, (value, oldValue) => {
      if (oldValue >= 0) {
        gsap.to(`.innovation .title-${oldValue} .line`, {
          ...(value > oldValue ? motionTextExit : motionTextExitReverse),
        });

        gsap.to(`.innovation .desc-${oldValue} .line`, {
          ...(value > oldValue ? motionTextExit : motionTextExitReverse),
        });
      }

      gsap.to(`.innovation .title-${value} .line`, {
        ...motionTextEnter,
        stagger: {
          each: value > oldValue ? 0.15 : 0.1,
          from: value > oldValue ? 'start' : 'end',
        },
      });

      gsap.to(`.innovation .desc-${value} .line`, {
        ...motionTextEnter,
        stagger: {
          each: value > oldValue ? 0.1 : 0.05,
          from: value > oldValue ? 'start' : 'end',
        },
      });
    });

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

    const gradientSteps = [phase1Gradient, phase2Gradient, phase3Gradient, phase4Gradient, phase5Gradient, phase6Gradient, endGradient];

    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'none',
      },
      scrollTrigger: {
        trigger: el.value,
        start: 'center center',
        end: `+=${(slides.value.length - 1) * 100}%`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        // markers: true,
      },
    });

    const gradientDuration = 1;
    const totalDuration = gradientSteps.length * gradientDuration;
    const middlePosition = totalDuration / 2;

    slides.value.forEach((el, index) => {
      if (index < 1) return;

      if (useDevice().isDesktop) {
        gradientSteps.forEach((gradient) => {
          tl.to(`.innovation .bg .image-${index}`, {
            '--mask-gradient': gradient,
            duration: gradientDuration,
          });
        });

        tl.to(
          `.innovation .image-center-${index}`,
          {
            '--mask': 'inset(0% 0% 0% 0%)',
            duration: totalDuration,
          },
          '-=100%',
        );
      } else {
        tl.to(`.innovation .bg .image-${index}`, {
          autoAlpha: 1,
        });

        tl.to(`.innovation .image-center-${index}`, {
          '--mask': 'inset(0% 0% 0% 0%)',
          duration: totalDuration,
        });
      }

      tl.to(
        el,
        {
          onStart: () => {
            indexActive.value++;
          },
          onReverseComplete: () => {
            indexActive.value--;
          },
          duration: 0.01, // Very short duration, essentially instantaneous
        },
        `-=${middlePosition}`,
      );
    });

    tl.to(
      '.innovation .bg',
      {
        scale: 1,
        duration: tl.duration(),
      },
      0,
    );

    tl.to(
      '.innovation .image-inner',
      {
        scale: 1.1,
        duration: tl.duration(),
      },
      0,
    );
  }, el.value);
});

onUnmounted(() => {
  ctx && ctx.revert();
});
</script>

<style scoped lang="scss">
.innovation {
  width: 100%;
  height: 100vh;
  min-height: 800px;
  max-height: 100vh;
  position: relative;
  overflow: hidden;

  .image {
    --mask-gradient: linear-gradient(
      0deg,
      black 0% 0%,
      transparent 0% 3.3333333333333335%,
      black 3.3333333333333335% 3.3333333333333335%,
      transparent 3.3333333333333335% 6.666666666666667%,
      black 6.666666666666667% 6.666666666666666%,
      transparent 6.666666666666666% 10%,
      black 10% 10%,
      transparent 10% 13.333333333333334%,
      black 13.333333333333334% 13.333333333333334%,
      transparent 13.333333333333334% 16.666666666666668%,
      black 16.666666666666668% 16.666666666666668%,
      transparent 16.666666666666668% 20%,
      black 20% 20.000000000000004%,
      transparent 20.000000000000004% 23.333333333333336%,
      black 23.333333333333336% 23.333333333333336%,
      transparent 23.333333333333336% 26.666666666666668%,
      black 26.666666666666668% 26.666666666666668%,
      transparent 26.666666666666668% 30%,
      black 30% 30.000000000000004%,
      transparent 30.000000000000004% 33.333333333333336%,
      black 33.333333333333336% 33.333333333333336%,
      transparent 33.333333333333336% 36.66666666666667%,
      black 36.66666666666667% 36.666666666666664%,
      transparent 36.666666666666664% 40%,
      black 40% 40%,
      transparent 40% 43.333333333333336%,
      black 43.333333333333336% 43.333333333333336%,
      transparent 43.333333333333336% 46.66666666666667%,
      black 46.66666666666667% 46.666666666666664%,
      transparent 46.666666666666664% 50%,
      black 50% 50%,
      transparent 50% 53.333333333333336%,
      black 53.333333333333336% 53.333333333333336%,
      transparent 53.333333333333336% 56.66666666666667%,
      black 56.66666666666667% 56.666666666666664%,
      transparent 56.666666666666664% 60%,
      black 60% 60%,
      transparent 60% 63.333333333333336%,
      black 63.333333333333336% 63.333333333333336%,
      transparent 63.333333333333336% 66.66666666666667%,
      black 66.66666666666667% 66.66666666666667%,
      transparent 66.66666666666667% 70%,
      black 70% 70.00000000000001%,
      transparent 70.00000000000001% 73.33333333333334%,
      black 73.33333333333334% 73.33333333333334%,
      transparent 73.33333333333334% 76.66666666666667%,
      black 76.66666666666667% 76.66666666666667%,
      transparent 76.66666666666667% 80%,
      black 80% 80.00000000000001%,
      transparent 80.00000000000001% 83.33333333333334%,
      black 83.33333333333334% 83.33333333333334%,
      transparent 83.33333333333334% 86.66666666666667%,
      black 86.66666666666667% 86.66666666666667%,
      transparent 86.66666666666667% 90%,
      black 90% 90.00000000000001%,
      transparent 90.00000000000001% 93.33333333333334%,
      black 93.33333333333334% 93.33333333333334%,
      transparent 93.33333333333334% 96.66666666666667%,
      black 96.66666666666667% 96.66666666666667%,
      transparent 96.66666666666667% 100%
    );

    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;

    mask-image: var(--mask-gradient);
    will-change: mask-image;

    @include mx.mobile {
      mask-image: none;
      will-change: auto;
      opacity: 0;
      visibility: hidden;
    }

    &.image-0 {
      --mask-gradient: linear-gradient(
        0deg,
        black 0% 3.3333333333333335%,
        transparent 3.3333333333333335% 3.3333333333333335%,
        black 3.3333333333333335% 6.666666666666667%,
        transparent 6.666666666666667% 6.666666666666667%,
        black 6.666666666666667% 10%,
        transparent 10% 10%,
        black 10% 13.333333333333334%,
        transparent 13.333333333333334% 13.333333333333334%,
        black 13.333333333333334% 16.666666666666668%,
        transparent 16.666666666666668% 16.666666666666668%,
        black 16.666666666666668% 20%,
        transparent 20% 20%,
        black 20% 23.333333333333336%,
        transparent 23.333333333333336% 23.333333333333336%,
        black 23.333333333333336% 26.666666666666668%,
        transparent 26.666666666666668% 26.666666666666668%,
        black 26.666666666666668% 30%,
        transparent 30% 30%,
        black 30% 33.333333333333336%,
        transparent 33.333333333333336% 33.333333333333336%,
        black 33.333333333333336% 36.66666666666667%,
        transparent 36.66666666666667% 36.66666666666667%,
        black 36.66666666666667% 40%,
        transparent 40% 40%,
        black 40% 43.333333333333336%,
        transparent 43.333333333333336% 43.333333333333336%,
        black 43.333333333333336% 46.66666666666667%,
        transparent 46.66666666666667% 46.66666666666667%,
        black 46.66666666666667% 50%,
        transparent 50% 50%,
        black 50% 53.333333333333336%,
        transparent 53.333333333333336% 53.333333333333336%,
        black 53.333333333333336% 56.66666666666667%,
        transparent 56.66666666666667% 56.66666666666667%,
        black 56.66666666666667% 60%,
        transparent 60% 60%,
        black 60% 63.333333333333336%,
        transparent 63.333333333333336% 63.333333333333336%,
        black 63.333333333333336% 66.66666666666667%,
        transparent 66.66666666666667% 66.66666666666667%,
        black 66.66666666666667% 70%,
        transparent 70% 70%,
        black 70% 73.33333333333334%,
        transparent 73.33333333333334% 73.33333333333334%,
        black 73.33333333333334% 76.66666666666667%,
        transparent 76.66666666666667% 76.66666666666667%,
        black 76.66666666666667% 80%,
        transparent 80% 80%,
        black 80% 83.33333333333334%,
        transparent 83.33333333333334% 83.33333333333334%,
        black 83.33333333333334% 86.66666666666667%,
        transparent 86.66666666666667% 86.66666666666667%,
        black 86.66666666666667% 90%,
        transparent 90% 90%,
        black 90% 93.33333333333334%,
        transparent 93.33333333333334% 93.33333333333334%,
        black 93.33333333333334% 96.66666666666667%,
        transparent 96.66666666666667% 96.66666666666667%,
        black 96.66666666666667% 100%,
        transparent 100% 100%
      );

      @include mx.mobile {
        mask-image: none;
        will-change: auto;
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .image-center {
    --mask: inset(100% 0 0 0);
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    clip-path: var(--mask);
    will-change: clip-path;

    &.image-center-0 {
      --mask: inset(0 0 0 0);
    }
  }

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    will-change: transform;
    transform: scale(1.15);

    .overlay-black {
      opacity: 0.25;
    }

    &:deep(img) {
      width: 100%;
      height: 100%;
      object-position: center;

      @include mx.mobile {
        object-position: left;
      }
    }
  }

  .label-mobile {
    display: none;

    @include mx.mobile {
      display: block;
      position: absolute;
      z-index: 2;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
    }

    &.top {
      @include mx.mobile {
        top: fn.toVw(28);
      }
    }

    &.bottom {
      @include mx.mobile {
        bottom: fn.toVw(28);
      }
    }
  }

  .text-floating {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    padding: 0 fn.toVw(var.$container);

    @include mx.mobile {
      display: none;
    }
  }

  .poster {
    background-color: var.$color-text;
    color: var.$color-primary;
    width: 100%;
    height: calc(100% - fn.toVw(76));
    max-height: fn.toVw(688);
    max-width: fn.toVw(472);
    padding: fn.toVw(32);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    overflow: hidden;

    @include mx.mobile {
      height: 70%;
      max-width: 90%;
      padding: fn.toVw(23);
    }

    .number {
      .inactive {
        opacity: 0.5;
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
      margin-top: 15%;
      margin-bottom: 10%;
      width: 100%;
      max-width: fn.toVw(272);
      height: fn.toVw(44);
      position: relative;
      margin-left: auto;
      margin-right: auto;

      @include mx.mobile {
        margin-top: fn.toVw(41);
        margin-bottom: fn.toVw(23);
        padding: 0;
        width: 100%;
        max-width: fn.toVw(178);
      }

      .title {
        position: absolute;
        inset: 0;
        text-align: center;
        width: 100%;
        backface-visibility: hidden;
      }
    }

    .image-wrapper {
      width: 100%;
      height: fn.toVw(263);
      position: relative;
      overflow: hidden;

      @include mx.mobile {
        height: fn.toVw(180);
      }

      .image-inner {
        position: relative;
        width: 100%;
        height: 100%;
        will-change: transform;
      }
    }

    .desc-wrapper {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      margin-top: 10%;
      overflow: hidden;
      width: 100%;
      max-width: fn.toVw(346);
      height: fn.toVw(120);

      @include mx.mobile {
        padding: 0 fn.toVw(7);
        margin-top: fn.toVw(22);
        height: 38%;
      }

      .desc {
        position: absolute;
        inset: 0;
        text-align: center;
        width: 100%;
        backface-visibility: hidden;
        font-size: fn.toVw(16);
      }
    }
  }
}
</style>
