<script setup lang="ts">
import type { IntegrativeSection } from '~/types/cms';

const wellnessDescription = useHighlightedText(() => props.data['elementis-integrative-wellness-page-description'], { spacer: '&nbsp;' });

const elImg = ref<HTMLElement | null>(null);

const props = defineProps<{
  data: IntegrativeSection;
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
      <div class="section-title">
        <TextLabel :text="props.data['elementis-integrative-wellness-page-title']" />
      </div>
      <div class="integrative-wellness-description">
        <MotionSplittext>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h3 v-html="wellnessDescription" />
        </MotionSplittext>
      </div>
      <div class="big-image">
        <div ref="elImg" class="reception-image-img">
          <NuxtPicture :src="getImage(props.data['elementis-integrative-wellness-page-image'])" :img-attrs="{ alt: 'Inside Elementis' }" />
        </div>
      </div>
      <div class="integrative-wellness-details">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="props.data['elementis-integrative-wellness-page-details']"></div>
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
  grid-column: 1 / 13;
  padding-bottom: fn.toVw(104);

  @include mx.mobile {
    padding-bottom: fn.toVw(48);
    grid-column: 1 / 5;
  }

  svg {
    width: 12px;
    height: 12px;
  }
}

.integrative-wellness-description {
  grid-column: 1 / 10;
  @extend .font-heading3;
  color: var.$color-text;
  padding-bottom: fn.toVw(112);
  padding-right: fn.toVw(18);

  @include mx.mobile {
    grid-column: 1 / 5;
    padding-bottom: fn.toVw(64);
    padding-right: 0;
  }

  &:deep(.spacer) {
    width: fn.toVw(126);

    @include mx.mobile {
      width: fn.toVw(46);
    }
  }
}

.integrative-wellness-details {
  grid-column: 8 / 13;
  @extend .font-body2;
  color: var.$color-text;
  padding-right: fn.toVw(63);
  padding-left: fn.toVw(43);

  @include mx.mobile {
    grid-column: 1 / 5;
    padding-right: 0;
    padding-left: 0;
    width: 100%;
    max-width: fn.toVw(324);
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
  grid-column: 1 / 8;
  width: 100%;
  height: fn.toVw(512);
  padding-right: fn.toVw(36);

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
    margin-bottom: fn.toVw(48);
    padding-right: 0;
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
  padding-top: fn.toVw(145);
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
