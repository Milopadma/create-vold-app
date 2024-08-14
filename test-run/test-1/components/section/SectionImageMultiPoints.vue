<script setup lang="ts">
import type { ImageMultiPointsSection } from '~/types/cms';

const elImg = ref<HTMLElement | null>(null);

const props = defineProps<{
  data: ImageMultiPointsSection;
}>();

if (useDevice().isDesktop) {
  useParallax(elImg, {
    speed: 30,
  });
}
</script>

<template>
  <section class="story-page">
    <div class="homepage-grid">
      <div class="big-image">
        <div ref="elImg" class="reception-image-img">
          <NuxtPicture :src="getImage(props.data.ImageMultiPointsImage)" :img-attrs="{ alt: 'Reception' }" />
        </div>
      </div>
      <div class="section-title">
        <TextLabel :text="props.data.ImageMultiPointsSubtitle" />
      </div>

      <div v-for="(point, index) in props.data.ImageMultiPointsList" :key="index" class="point-container">
        <div class="point-number">{{ useNumberPad(index + 1) }}</div>
        <div class="point-title">
          <MotionSplittext>
            <h3>{{ point.ImageMultiPointsPointTitle }}</h3>
          </MotionSplittext>
        </div>
        <div class="point-description">
          <MotionSplittext :delay="0.2">
            <p class="font-body2">{{ point.ImageMultiPointsPointDescription }}</p>
          </MotionSplittext>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.homepage-grid {
  display: grid;
  grid-template-columns: repeat(var.$grid-col, 1fr);
  column-gap: fn.toVw(var.$grid-gap);

  @include mx.mobile {
    grid-template-columns: repeat(var.$grid-col-m, 1fr);
    column-gap: fn.toVw(var.$grid-gap-m);
  }
}

.section-title {
  grid-column: 1 / 4;

  @include mx.mobile {
    grid-column: 1 / 5;
    padding-bottom: fn.toVw(48);
  }

  svg {
    width: 12px;
    height: 12px;
  }
}

.point-container {
  grid-column: 5 / 13;
  display: grid;
  grid-template-columns: subgrid;
  position: relative;
  padding-top: fn.toVw(40);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    height: 0.5px;
    opacity: 0.5;
    background-color: var.$color-text;
  }

  @include mx.mobile {
    padding-top: fn.toVw(24);
    grid-column: 1 / 5;

    &::before {
      left: fn.toVw(170);
      width: 100vw;
    }
  }
}

.point-number {
  @extend .font-caption1;
  color: var.$color-text;

  @include mx.mobile {
    grid-column: 1 / 1;
  }
}

.point-title {
  grid-column: 2 / 4;
  @extend .font-subheading1;
  color: var.$color-text;
  margin-bottom: calc(fn.toVw(80) - fn.toVw(10));

  h3 {
    position: relative;
    margin-left: fn.toVw(-24);
  }

  @include mx.mobile {
    grid-column: 2 / 5;
    margin-bottom: 0;
    padding-right: fn.toVw(30);
    padding-bottom: fn.toVw(40);

    h3 {
      margin-left: fn.toVw(-48);
    }
  }
}

.point-description {
  grid-column: 4 / 13;
  padding-left: fn.toVw(64);
  @extend .font-body2;
  color: var.$color-text;
  margin-bottom: fn.toVw(80);
  padding-right: fn.toVw(40);

  @include mx.mobile {
    grid-column: 2 / 5;
    padding-left: 0;
    margin-top: 0;
    padding-right: 0;
    margin-bottom: 0;
    padding-bottom: fn.toVw(40);
    padding-right: 0;

    margin-left: fn.toVw(-48);
  }

  &:deep(.spacer) {
    width: fn.toVw(77);

    @include mx.mobile {
      width: fn.toVw(46);
    }
  }
}

.discover-section {
  grid-column: 5 / 9;
  padding-right: fn.toVw(54);

  @include mx.mobile {
    grid-column: 1 / 5;
    padding-right: 0;
  }
}

.big-image {
  grid-column: 5 / 13;
  width: 100%;
  height: fn.toVw(508);
  margin-bottom: fn.toVw(144);

  &:deep(img) {
    width: 100%;
    height: 100%;
  }

  .reception-image-img {
    width: 100%;
    height: 100%;
  }

  @include mx.mobile {
    grid-column: 1 / 5;
    height: fn.toVw(292);
    margin-bottom: fn.toVw(56);
    scale: 1.02;
  }
}

.big-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-page {
  background-color: var.$color-primary;
  padding-left: fn.toVw(var.$container);
  padding-right: fn.toVw(var.$container);
  padding-top: fn.toVw(225);
  padding-bottom: fn.toVw(200);

  @include mx.mobile {
    padding-left: fn.toVw(var.$container-m);
    padding-right: fn.toVw(var.$container-m);
    padding-top: fn.toVw(170);
    padding-bottom: fn.toVw(120);
  }
}
</style>
