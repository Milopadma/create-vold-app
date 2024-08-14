<script setup lang="ts">
import type { TimelineSection } from '~/types/cms';

const props = defineProps<{
  data: TimelineSection;
}>();

function processTimelinePoints(pointsString: string): string[] {
  // Remove <p> tags if present
  const cleanedString = pointsString.replace(/<\/?p>/g, '');
  // Split the string by <br> or <br/> tags
  return cleanedString
    .split(/<br\s*\/?>/i)
    .map((point) => point.trim())
    .filter(Boolean);
}
</script>

<template>
  <section class="timeline-section">
    <div class="marquee-container-wrapper">
      <TextMarquee :text="props.data.TimelineMarqueeText" />
    </div>

    <div class="homepage-grid">
      <div v-for="(contentGroup, groupIndex) in props.data.TimelineContent" :key="groupIndex" class="content-group">
        <div class="content-label">
          <MotionSplittext>
            <p>/ {{ contentGroup.TimelineContentLabel }}</p>
          </MotionSplittext>
        </div>

        <template v-for="(block, blockIndex) in contentGroup.TimelineContentBlock" :key="`${groupIndex}-${blockIndex}`">
          <div class="block-container">
            <div class="block-number">
              <MotionSplittext>
                <p>{{ blockIndex + 1 < 10 ? `0${blockIndex + 1}` : blockIndex + 1 }}</p>
              </MotionSplittext>
            </div>
            <div class="block-content">
              <MotionSplittext>
                <p>{{ block.TimelineContentBlock }}</p>
              </MotionSplittext>
            </div>
            <div class="block-points">
              <template
                v-for="(point, pointIndex) in processTimelinePoints(block.TimelineContentPoints)"
                :key="`${groupIndex}-${blockIndex}-${pointIndex}`">
                <MotionSplittext>
                  <p :class="{ 'last-point': pointIndex === processTimelinePoints(block.TimelineContentPoints).length - 1 }">{{ point }}</p>
                </MotionSplittext>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.timeline-section {
  background-color: var.$color-secondary;
  padding-top: fn.toVw(200);
  padding-bottom: fn.toVw(200);
}

.homepage-grid {
  display: grid;
  grid-template-columns: repeat(var.$grid-col, 1fr);
  column-gap: fn.toVw(var.$grid-gap);
  padding-left: fn.toVw(var.$container);
  padding-right: fn.toVw(var.$container);
}

.marquee-container-wrapper {
  padding-bottom: fn.toVw(144);
  @extend .font-heading1;
  color: var.$color-text;

  @include mx.mobile {
    font-size: fn.toVw(72);
    padding-bottom: fn.toVw(72);
  }
}

.content-group {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;

  &:nth-child(2) {
    padding-top: fn.toVw(156);
  }
}

.content-label {
  grid-column: 4 / 8;
  padding-bottom: fn.toVw(28);

  &:deep(p) {
    @extend .font-body3;
    margin-bottom: 0;
    opacity: 0.5;
  }
}

.block-container {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;

  border-top: 1px solid rgba(var.$color-text, 0.5);
  padding-top: fn.toVw(24);
}

.block-number {
  grid-column: 1 / 1;

  &:deep(p) {
    @extend .font-body3;
  }
}

.block-content {
  grid-column: 4 / 6;

  &:deep(p) {
    @extend .font-subheading3;
  }
}

.block-points {
  @extend .font-body2;
  grid-column: 8 / 13;

  &:deep(p) {
    color: var.$color-text;
    margin-bottom: fn.toVw(20);
    padding-bottom: fn.toVw(20);
    border-bottom: 1px solid rgba(var.$color-text, 0.5);

    &.last-point {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: fn.toVw(24);
    }
  }
}
</style>
