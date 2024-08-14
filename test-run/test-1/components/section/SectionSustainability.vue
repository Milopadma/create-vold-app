<script setup lang="ts">
import gsap from 'gsap';
import type { SustainabilitySection } from '~/types/cms';

const props = defineProps<{
  data: SustainabilitySection;
}>();

const el = ref<HTMLElement | null>(null);

onMounted(() => {
  if (el.value) {
    gsap.to(el.value, { opacity: 1, duration: 1 });
  }
});
</script>

<template>
  <section ref="el" class="sustainability-page">
    <h2 class="visually-hidden">Sustainability</h2>

    <div class="marquee-container-wrapper">
      <TextMarquee :text="props.data['elementis-sustainability-marquee-text']" />
    </div>

    <div class="homepage-grid">
      <div class="sustainability-description-1">
        <MotionSplittext>
          <p>{{ props.data['elementis-sustainability-description-1'] }}</p>
        </MotionSplittext>
      </div>
      <div class="sustainability-description-2">
        <MotionSplittext :delay="0.2">
          <p>{{ props.data['elementis-sustainability-description-2'] }}</p>
        </MotionSplittext>
      </div>
      <div class="buttons-section">
        <ButtonList
          v-for="(item, index) in props.data['elementis-sustainability-button-list']"
          :key="index"
          :external="false"
          :href="item.Link"
          :number="index + 1"
          :text="item['elementis-sustainability-button-text']" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.sustainability-page {
  background-color: var.$color-secondary;
  padding: fn.toVw(240) 0;

  @include mx.mobile {
    padding: fn.toVw(144) 0;
  }
}

.homepage-grid {
  display: grid;
  grid-template-columns: repeat(var.$grid-col, 1fr);
  column-gap: fn.toVw(var.$grid-gap);
  padding: 0 fn.toVw(var.$container);

  @include mx.mobile {
    grid-template-columns: repeat(var.$grid-col-m, 1fr);
    column-gap: fn.toVw(var.$grid-gap-m);
    padding: 0 fn.toVw(var.$container-m);
  }
}

.sustainability-description-1,
.sustainability-description-2 {
  padding-right: fn.toVw(32);

  @include mx.mobile {
    padding-right: 0;
  }
}

.sustainability-description-1 {
  grid-column: 4 / 8;
  @extend .font-body2;

  @include mx.mobile {
    grid-column: 1 / 5;
    padding-bottom: fn.toVw(40);
  }
}

.sustainability-description-2 {
  grid-column: 8 / 12;
  @extend .font-body2;

  @include mx.mobile {
    grid-column: 1 / 5;
  }
}

.discover-button {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  border-bottom: 0.5px solid var.$color-text;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: fn.toVw(20);
  padding-right: fn.toVw(20);
  position: relative;
  overflow: hidden;
  @extend .font-subheading3;

  .discover-button-text span {
    @extend .font-caption1;
  }

  &:hover {
    color: var.$color-secondary;

    .discover-button-text span {
      transform: translateX(16px);
      transition: all 0.3s ease;

      @include mx.mobile {
        transform: translateX(0);
      }
    }

    .icon {
      z-index: 1;
      color: var.$color-primary;
    }
  }

  &:not(:hover) {
    .discover-button-text span {
      transition: all 0.3s ease;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var.$color-secondary;
    transition:
      clip-path 0.3s ease,
      background-color 0.3s ease;
    clip-path: inset(0 0 100% 0); // start from bottom
  }

  &:hover::after {
    background-color: var.$color-text;
    clip-path: inset(0 0 0 0); // fill to top
  }

  &:not(:hover)::after {
    clip-path: inset(100% 0 0 0); // leave to top
  }

  .discover-button-text {
    position: relative;
    z-index: 1; // ensure text is above the background
  }

  @include mx.mobile {
    padding-top: fn.toVw(16);
    padding-bottom: fn.toVw(16);
  }
}
.discover-button:first-of-type {
  padding-top: 24px;
  border-top: 0.5px solid var.$color-text;

  @include mx.mobile {
    padding-top: fn.toVw(16);
  }
}

.discover-button-text {
  display: flex;
  flex-direction: row;
  gap: fn.toVw(112);

  @include mx.mobile {
    gap: fn.toVw(21);
  }
}

.buttons-section {
  display: flex;
  flex-direction: column;
  margin-top: fn.toVw(112);
  grid-column: 4 / 13;

  @include mx.mobile {
    margin-top: fn.toVw(72);
    grid-column: 1 / -1; // span full width of the grid
    width: 100vw; // full viewport width
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    grid-column: 1 / -1; // span full width of the grid
  }
}

.marquee-container-wrapper {
  grid-column: 1 / 13;
  padding-bottom: fn.toVw(120);
  @extend .font-heading1;
  color: var.$color-text;

  @include mx.mobile {
    font-size: fn.toVw(72);
  }

  @include mx.mobile {
    grid-column: 1 / 4;
    padding-bottom: fn.toVw(72);
  }
}
</style>
