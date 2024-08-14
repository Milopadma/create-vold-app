<script setup lang="ts">
import type { TwoDescriptionsGallerySection } from '~/types/cms';

const elImg = ref<HTMLElement | null>(null);

const props = defineProps<{
  data: TwoDescriptionsGallerySection;
}>();

const sectionDescription = useHighlightedText(() => props.data.TwoDescriptionsGallerySectionDescription, { spacer: '&nbsp;' });
</script>

<template>
  <section class="page">
    <div class="homepage-grid">
      <div class="section-title">
        <TextLabel :text="props.data.TwoDescriptionsGallerySectionTitle" />
      </div>
      <div class="section-description">
        <MotionSplittext>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="sectionDescription"></span>
        </MotionSplittext>
      </div>

      <div class="section-details">
        <div v-for="(detail, index) in props.data.TwoDescriptionsGallerySectionDetailsContainer" :key="index">
          <MotionSplittext>
            <p>
              {{ detail.TwoDescriptionsGallerySectionDetail }}
            </p>
          </MotionSplittext>
        </div>
      </div>
      <div class="gallery">
        <div v-for="(item, index) in props.data.TwoDescriptionsGallerySectionImages" ref="elImg" :key="index" class="img">
          <NuxtPicture :src="getImage(item)" :img-attrs="{ alt: 'Gallery Image' }" />
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
  }

  svg {
    width: 12px;
    height: 12px;
  }
}

.section-description {
  grid-column: 5 / 12;
  @extend .font-heading3;
  color: var.$color-text;
  padding-left: fn.toVw(60);
  padding-bottom: fn.toVw(80);

  @include mx.mobile {
    padding-left: 0;
    grid-column: 1 / 5;
    padding-bottom: fn.toVw(64);
    padding-top: fn.toVw(48);
  }

  :deep(.highlight) {
    color: var.$color-teriary;
  }

  :deep(.spacer) {
    width: fn.toVw(77);

    @include mx.mobile {
      width: fn.toVw(46);
    }
  }
}

.section-details {
  grid-column: 5 / 13;
  @extend .font-body2;
  color: var.$color-text;
  padding-left: fn.toVw(60);
  display: grid;
  grid-template-columns: subgrid;
  padding-bottom: fn.toVw(120);

  div {
    grid-column: span 4;
  }

  div:nth-child(2) {
    padding-left: fn.toVw(40);
  }

  @include mx.mobile {
    grid-column: 1 / 5;
    padding-right: 0;
    padding-left: 0;
    padding-bottom: 0;
    order: 2;

    div {
      grid-column: span 4;
      padding-bottom: fn.toVw(32);
    }

    div:nth-child(2) {
      padding-left: 0;
    }
  }
}

.gallery {
  grid-column: 1 / 13;
  display: grid;
  align-items: end;
  grid-template-columns: subgrid;

  .img:nth-child(1) {
    max-height: fn.toVw(416);
    grid-column: 1 / 5;
    margin-right: fn.toVw(-60);
  }

  .img:nth-child(2) {
    max-height: fn.toVw(582);
    grid-column: 6 / 13;
    margin-left: fn.toVw(-60);
  }

  @include mx.mobile {
    grid-column: 1 / -1;
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    height: fn.toVw(292);
    padding-left: fn.toVw(var.$container-m);
    padding-right: 0;
    order: 1;
    margin-left: calc(-1 * fn.toVw(var.$container-m));
    margin-right: calc(-1 * fn.toVw(var.$container-m));
    width: calc(100% + 2 * fn.toVw(var.$container-m));
    padding-bottom: fn.toVw(48);

    .img {
      flex: 0 0 auto;
      width: calc(100% - fn.toVw(var.$container-m));
      scroll-snap-align: start;
      height: fn.toVw(292);
      object-fit: cover;
    }

    .img:nth-child(1) {
      margin-right: fn.toVw(20);
      padding-left: fn.toVw(var.$container-m);
    }

    .img:nth-child(2) {
      margin-left: 0;
      padding-right: fn.toVw(var.$container-m);
    }
  }
}

.big-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page {
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

.highlight {
  color: var.$color-teriary;
}
</style>
