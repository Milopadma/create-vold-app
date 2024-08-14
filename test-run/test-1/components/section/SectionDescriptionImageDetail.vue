<script setup lang="ts">
import type { DescriptionImageDetailSection } from '~/types/cms';

const props = defineProps<{
  data: DescriptionImageDetailSection;
}>();

const descriptionText = useHighlightedText(() => props.data.SectionDescriptionImageDetailDescription, { spacer: '&nbsp;' });

const elImg = ref<HTMLElement | null>(null);

if (useDevice().isDesktop) {
  useParallax(elImg, {
    speed: 15,
  });
}
</script>

<template>
  <section class="description-image-detail-page">
    <div class="homepage-grid">
      <div class="section-title">
        <TextLabel :text="props.data.SectionDescriptionImageDetailTitle" />
      </div>
      <div class="description-text">
        <MotionSplittext>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h2 v-html="descriptionText"></h2>
        </MotionSplittext>
      </div>
      <div ref="elImg" class="detail-image">
        <NuxtPicture :src="getImage(props.data.SectionDescriptionImageDetailImage)" :img-attrs="{ alt: 'Detail Image' }" />
      </div>
      <div class="detail-description">
        <p>{{ props.data.SectionDescriptionImageDetaiImageDetail }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.description-image-detail-page {
  background-color: var.$color-secondary;
  padding: fn.toVw(200) fn.toVw(var.$container);

  @include mx.mobile {
    padding: fn.toVw(120) fn.toVw(var.$container-m);
  }
}

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
  padding-bottom: fn.toVw(104);

  @include mx.mobile {
    grid-column: 1 / 5;
    padding-bottom: fn.toVw(48);
  }

  svg {
    width: 12px;
    height: 12px;
  }
}

.description-text {
  grid-column: 1 / 10;
  @extend .font-heading3;
  color: var.$color-text;
  padding-right: fn.toVw(68);
  padding-bottom: fn.toVw(112);

  @include mx.mobile {
    grid-column: 1 / 5;
    padding-right: 0;
    padding-bottom: fn.toVw(64);
  }

  &:deep(.highlight) {
    color: var.$color-teriary;
  }

  &:deep(.spacer) {
    width: fn.toVw(77);

    @include mx.mobile {
      width: fn.toVw(46);
    }
  }
}

.detail-image {
  grid-column: 1 / 8;
  aspect-ratio: 1 / 1;
  padding-bottom: 0;
  padding-right: fn.toVw(35);
  width: 100%;
  height: fn.toVw(512);
  overflow: hidden; // ensure the image doesn't overflow the container

  @include mx.mobile {
    grid-column: 1 / 5;
    padding-right: 0;
    margin-bottom: fn.toVw(48);
    height: fn.toVw(292);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.detail-description {
  grid-column: 8 / 13;
  @extend .font-body2;
  color: var.$color-text;
  margin-left: fn.toVw(32);
  padding-right: fn.toVw(63);

  @include mx.mobile {
    grid-column: 1 / 5;
    margin-left: 0;
    padding-right: 0;
  }
}
</style>
