<template>
  <section class="hero">
    <div class="overlay-gradient top"></div>
    <div class="overlay-gradient bottom"></div>

    <MotionMask class="hero-mask" color="#2b3530" />

    <div ref="elImg" class="image">
      <NuxtPicture
        class="d-desktop"
        :src="getImage(props.data['elementis-hero-marquee-image'])"
        :img-attrs="{ alt: 'Hero Banner' }"
        sizes="100vw sm:200vw lg:1200px xl:1500px" />
      <NuxtPicture
        class="d-mobile"
        :src="getImage(props.data['elementis-hero-marquee-image-m'])"
        :img-attrs="{ alt: 'Hero Banner' }"
        sizes="100vw sm:200vw lg:1200px xl:1500px" />
    </div>

    <div class="text-title">
      <TextMarquee :text="marqueeText" :scroll-speed="8" />
    </div>

    <div class="text-bottom">
      <div class="container">
        <div class="border"></div>
        <div class="text-bottom-wrapper">
          <IconArrow class="icon" />
          <p class="text-center font-body2">A lifestyle revolution for a sustainable fulfilling future</p>
          <p class="text-scroll font-body2">Scroll to Explore</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const elImg = ref<HTMLElement | null>(null);

if (useDevice().isDesktop) {
  useParallax(elImg, {
    speed: 55,
  });
}

import { computed } from 'vue';
import type { HeroSection } from '~/types/cms';

const props = defineProps<{
  data: HeroSection;
}>();

const marqueeText = computed(() => props.data['elementis-hero-marquee-text']);
</script>

<style scoped lang="scss">
.hero {
  width: 100%;
  min-height: 100vh;
  color: var.$color-white;
  overflow: hidden;
  position: relative;

  @include mx.mobile {
    min-height: calc(100vh - var(--vhmobilebar) - fn.toVw(100));
  }

  .hero-mask {
    z-index: 1;
  }

  .overlay-gradient {
    z-index: 2;

    &.top {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
      height: fn.toVw(243);
      opacity: 0.5;

      @include mx.mobile {
        height: fn.toVw(104);
      }
    }

    &.bottom {
      inset: initial;
      bottom: 0;
      background: linear-gradient(360deg, var.$color-primary 0%, rgba(43, 53, 48, 0) 100%);
      height: calc(fn.toVw(496) - fn.toVw(80));

      @include mx.mobile {
        height: fn.toVw(310);
      }
    }
  }

  .image {
    width: 100%;
    height: calc(100% + fn.toVw(80));
    position: absolute;
    inset: 0;
    pointer-events: none;

    @include mx.mobile {
      height: 100%;
    }

    &:deep(img) {
      width: 100%;
      height: 100%;
    }
  }

  .text-title {
    width: 100%;
    position: absolute;
    bottom: fn.toVw(126);
    left: 0;
    z-index: 2;

    @include mx.mobile {
      bottom: fn.toVw(96);
    }
  }

  .text-bottom {
    position: absolute;
    bottom: fn.toVw(40);
    left: 0;
    z-index: 2;
    width: 100%;

    @include mx.mobile {
      bottom: fn.toVw(60);
    }

    .container {
      @include mx.mobile {
        padding: 0;
      }
    }

    .icon {
      @include mx.mobile {
        display: none;
      }
    }

    .border {
      opacity: 0.5;
    }

    .text-bottom-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-top: fn.toVw(20);
      position: relative;

      .text-center {
        text-align: center;
        width: 100%;
        max-width: fn.toVw(258);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }

      .text-scroll {
        @include mx.mobile {
          display: none;
        }
      }
    }
  }
}
</style>
