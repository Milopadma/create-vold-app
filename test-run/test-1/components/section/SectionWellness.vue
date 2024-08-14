<script setup lang="ts">
import type { WellnessSection } from '~/types/cms';

const elImg = ref<HTMLElement | null>(null);

const props = defineProps<{
  data: WellnessSection;
}>();

const wellnessDescription = useHighlightedText(() => props.data['elementis-wellness-description'], { spacer: '&nbsp;' });

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
          <NuxtPicture :src="getImage(props.data['elementis-wellness-image'])" :img-attrs="{ alt: 'Reception' }" />
        </div>
      </div>
      <div class="section-title">
        <TextLabel :text="props.data['elementis-wellness-title']" />
      </div>

      <div class="wellness-description">
        <MotionSplittext>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h3 v-html="wellnessDescription" />
        </MotionSplittext>
      </div>
      <div class="wellness-details">
        <MotionSplittext :delay="0.2">
          <p>
            {{ props.data['elementis-wellness-details'] }}
          </p>
        </MotionSplittext>
      </div>
      <div v-if="props.data['elementis-wellness-button']" class="discover-section">
        <ButtonLink href="/integrative-wellness" :text="props.data['elementis-wellness-button']" />
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

.wellness-description {
  grid-column: 5 / 12;
  @extend .font-heading3;
  color: var.$color-text;
  margin-bottom: fn.toVw(80);
  padding-right: fn.toVw(18);

  @include mx.mobile {
    grid-column: 1 / 5;
    margin-top: fn.toVw(48);
    margin-bottom: fn.toVw(48);
    padding-right: 0;
  }

  &:deep(.spacer) {
    width: fn.toVw(64);

    @include mx.mobile {
      width: fn.toVw(46);
    }
  }
}

.wellness-details {
  grid-column: 5 / 9;
  @extend .font-body2;
  color: var.$color-text;
  margin-bottom: calc(fn.toVw(80) - fn.toVw(10));
  padding-right: fn.toVw(54);

  @include mx.mobile {
    grid-column: 1 / 5;
    margin-bottom: calc(fn.toVw(80) - fn.toVw(16));
    padding-right: fn.toVw(30);
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
