<script setup lang="ts">
import type { StorySection } from '~/types/cms';

const props = defineProps<{
  data: StorySection;
}>();

const elImg1 = ref<HTMLElement | null>(null);
const elImg2 = ref<HTMLElement | null>(null);

if (useDevice().isDesktop) {
  useParallax(elImg1, {
    speed: 20,
  });

  useParallax(elImg2, {
    speed: 30,
  });
}

const storyDescription = useHighlightedText(() => props.data['elementis-story-description'], { spacer: '&nbsp;' });
</script>

<template>
  <section ref="el" class="story-page">
    <div class="homepage-grid">
      <div class="section-title">
        <TextLabel :text="props.data['elementis-story-title']" />
      </div>
      <div class="story-text">
        <MotionSplittext>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h3 v-html="storyDescription" />
        </MotionSplittext>
      </div>
      <div class="buttons-section">
        <ButtonLink href="/the-story" :text="props.data['elementis-story-button-1-text']" />
        <ButtonLink href="/the-story#team" :text="props.data['elementis-story-button-2-text']" />
      </div>
      <div class="slider-section">
        <div class="slide-1">
          <div ref="elImg1" class="slide-1-img">
            <NuxtPicture :src="getImage(props.data['elementis-story-gallery'][0])" :img-attrs="{ alt: 'Story Image 1' }" />
          </div>
        </div>
        <div class="slide-2">
          <div ref="elImg2" class="slide-2-img">
            <NuxtPicture :src="getImage(props.data['elementis-story-gallery'][1])" :img-attrs="{ alt: 'Story Image 2' }" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.story-page {
  background-color: var.$color-primary;
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
  @extend .font-body1;
  grid-column: 1 / 4;
  grid-column: 1 / 4;
  display: flex;
  flex-direction: row;
  gap: fn.toVw(16);
  align-items: start;
  padding-bottom: fn.toVw(48);

  @include mx.mobile {
    align-items: start;
    grid-column: 1 / 5;
  }

  svg {
    width: 12px;
    height: 12px;
  }
}

.story-text {
  @extend .font-heading3;
  grid-column: 6 / 13;
  padding-left: fn.toVw(64);
  margin-bottom: calc(fn.toVw(88) - fn.toVw(10));

  @include mx.mobile {
    grid-column: 1 / 5;
    margin-bottom: calc(fn.toVw(64) - fn.toVw(16));
    padding-left: 0;
  }

  &:deep(.spacer) {
    width: fn.toVw(120);

    @include mx.mobile {
      width: fn.toVw(73);
    }
  }
}

.buttons-section {
  display: flex;
  flex-direction: column;
  gap: calc(fn.toVw(28) - fn.toVw(10));
  margin-bottom: fn.toVw(101);
  grid-column: 6 / 13;
  margin-left: fn.toVw(64);

  @include mx.mobile {
    margin-bottom: fn.toVw(64);
    gap: calc(fn.toVw(20) - fn.toVw(16));
    grid-column: 1 / 5;
    margin-left: 0;
  }
}

.slider-section {
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: repeat(var.$grid-col, 1fr);

  @include mx.mobile {
    display: flex;
    gap: fn.toVw(16);
    grid-column: 1 / 5;
    overflow-y: hidden;
    overflow-x: scroll;
  }
}

.slide-1 {
  grid-column: 1 / 5;
  padding-right: fn.toVw(61);
  width: 100%;
  height: 100%;
  max-height: fn.toVw(448);

  .slide-1-img {
    width: 100%;
    height: 100%;
  }

  @include mx.mobile {
    padding-right: 0;
    flex: 0 0 auto;
    width: 100%;
    max-width: fn.toVw(296);
    max-height: fn.toVw(346);
  }
}

.slide-2 {
  grid-column: 6 / 13;
  padding-left: fn.toVw(70);
  height: 100%;
  max-height: fn.toVw(805);

  .slide-2-img {
    width: 100%;
    height: 100%;
  }

  @include mx.mobile {
    padding-left: 0;
    flex: 0 0 auto;
    width: 100%;
    max-width: fn.toVw(296);
    max-height: fn.toVw(346);
  }
}

.icon-margin {
  margin-right: fn.toVw(8); // margin between icon and text
}
</style>
