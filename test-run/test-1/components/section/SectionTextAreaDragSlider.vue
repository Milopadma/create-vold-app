<template>
  <section ref="el" class="section-slider">
    <TextMarquee v-if="props.data.TextAreaDragSliderSubtitle && !textDescription" class="marquee" :text="props.data.TextAreaDragSliderSubtitle" />

    <div class="container">
      <div class="content">
        <div v-if="props.data.TextAreaDragSliderSubtitle && textDescription" class="text">
          <div v-if="props.data.TextAreaDragSliderSubtitle" class="label-wrapper">
            <TextLabel class="label" :text="props.data.TextAreaDragSliderSubtitle" />
          </div>

          <div v-if="textDescription" class="desc">
            <MotionSplittext>
              <p class="font-heading3" v-html="textDescription" />
            </MotionSplittext>
          </div>
        </div>

        <div class="slider">
          <div ref="elDrag" class="slider-wrapper" @mouseenter="cursorDrag = true" @mouseleave="cursorDrag = false">
            <CardSlide
              v-for="(item, index) in props.data.TextAreaDragSliderSlide"
              :key="index"
              :index="index + 1"
              :image="getImage(item.TextAreaDragSliderSlideImage)"
              :title="item.TextAreaDragSliderSlideTitle"
              :desc="item.TextAreaDragSliderSlideDescription" />
          </div>

          <div class="progress">
            <div ref="elProgressFill" class="fill"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Draggable from 'gsap/Draggable';
import InertiaPlugin from 'gsap/InertiaPlugin';

import type { TextAreaDragSliderSection } from '~/types/cms';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);
}

const props = defineProps<{
  data: TextAreaDragSliderSection;
}>();

const el = ref<HTMLElement>();
const elDrag = ref<HTMLElement>();
const elProgressFill = ref<HTMLElement | null>(null);

const cursorDrag = useCursorDrag();

const textDescription = useHighlightedText(() => props.data.TextAreaDragSliderDescription, { spacer: '&nbsp;' });

let ctx: gsap.Context;

onMounted(() => {
  ctx = gsap.context(() => {
    Draggable.create('.slider-wrapper', {
      type: 'x',
      bounds: '.slider',
      cursor: 'grab',
      edgeResistance: 0.9,
      dragResistance: useDevice().isMobile ? 0.1 : 0.2,
      inertia: true,
      throwProps: true,
      throwResistance: 0.8,
      zIndexBoost: false,
      onDrag: function () {
        gsap.to(this.target, { duration: 2.0, overwrite: 'auto', ease: 'power3.out' });

        const totalDragDistance = this.maxX - this.minX;
        const currentPosition = this.maxX - this.x;
        const progress = gsap.utils.clamp(0, 1, currentPosition / totalDragDistance);

        gsap.to(elProgressFill.value, {
          scaleX: progress,
          duration: 0.2,
          ease: 'expo.out',
          overwrite: 'auto',
        });
      },
      onThrowUpdate: function () {
        gsap.to(this.target, { duration: 2.0, overwrite: 'auto', ease: 'power3.out' });

        const totalDragDistance = this.maxX - this.minX;
        const currentPosition = this.maxX - this.x;
        const progress = gsap.utils.clamp(0, 1, currentPosition / totalDragDistance);

        gsap.to(elProgressFill.value, {
          scaleX: progress,
          duration: 0.2,
          ease: 'expo.out',
          overwrite: 'auto',
        });
      },
    });
  }, el.value);
});

onUnmounted(() => {
  ctx && ctx.revert();
});
</script>

<style scoped lang="scss">
.section-slider {
  padding-top: fn.toVw(200);
  padding-bottom: fn.toVw(163);
  background-color: var.$color-secondary;

  @include mx.mobile {
    padding-top: fn.toVw(120);
    padding-bottom: fn.toVw(120);
  }

  .marquee {
    margin-bottom: fn.toVw(144);

    @include mx.mobile {
      margin-bottom: fn.toVw(80);
    }
  }

  .text {
    display: grid;
    grid-template-columns: repeat(var.$grid-col, 1fr);
    column-gap: fn.toVw(var.$grid-gap);
    margin-bottom: fn.toVw(147);

    @include mx.mobile {
      display: flex;
      flex-direction: column;
      margin-bottom: fn.toVw(80);
    }

    .label-wrapper {
      grid-column: 1/3;

      @include mx.mobile {
        grid-column: 1/-1;
        margin-bottom: fn.toVw(48);
      }
    }

    .desc {
      grid-column: 4/12;
      padding-left: fn.toVw(54);

      @include mx.mobile {
        grid-column: 1/-1;
        padding-left: 0;
      }

      &:deep(.spacer) {
        width: fn.toVw(123);

        @include mx.mobile {
          width: fn.toVw(73);
        }
      }
    }
  }

  .slider {
    display: flex;
    flex-direction: column;

    .slider-wrapper {
      display: flex;
      gap: fn.toVw(16);
      flex-wrap: nowrap;
      width: max-content;
    }

    .progress {
      width: 100%;
      height: 2px;
      background-color: rgba($color: var.$color-background2, $alpha: 0.2);
      position: relative;
      margin-left: auto;
      width: 100%;
      max-width: fn.toVw(924);
      margin-top: fn.toVw(128);

      @include mx.mobile {
        max-width: 100%;
        margin-top: fn.toVw(104);
      }

      .fill {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background-color: var.$color-background2;
        transform: scaleX(0);
        transform-origin: left;
      }
    }
  }
}
</style>
