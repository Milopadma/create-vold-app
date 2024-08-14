<template>
  <section ref="el" class="scroll-chapter">
    <div v-for="(item, index) in props.data.List" :key="index" class="items" :class="['items-' + index]">
      <div class="overlay-black"></div>

      <div class="overlay-gradient"></div>
      <div class="text">
        <p class="number">
          <span class="current">{{ useNumberPad(index + 1) }}&nbsp;</span>
          <span class="inactive">
            —
            <span class="total">{{ useNumberPad(totalIndexText) }}</span>
          </span>
        </p>

        <h3 class="title font-subheading1">{{ item.Title }}</h3>

        <p class="desc top">
          {{ item.TopDescription }}
        </p>

        <ul class="list">
          <li v-for="(listitem, index2) in item.List" :key="index2">{{ listitem.Text }}</li>
        </ul>

        <p class="desc bottom">
          {{ item.BottomDescription }}
        </p>
      </div>
      <div class="image">
        <NuxtPicture :src="getImage(item.Image)" :img-attrs="{ alt: item.Title }" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import type { ScrollChapter } from '~/types/cms';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const props = defineProps<{
  data: ScrollChapter;
}>();

const el = ref();

const totalIndexText = computed(() => {
  return props.data.List.length;
});

let ctx: gsap.Context;

const headerOut = () => {
  const header = document.getElementById('header');

  const hideHeader = () => {
    gsap.to(header, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'none',
    });
  };

  const showHeader = () => {
    gsap.to(header, {
      autoAlpha: 1,
      duration: 0.3,
      ease: 'none',
    });
  };

  ScrollTrigger.create({
    trigger: el.value,
    start: 'top top',
    end: `+=${totalIndexText.value * 100 * 1.5}%`,
    invalidateOnRefresh: true,
    onEnter: () => {
      hideHeader();
    },
    onEnterBack: () => {
      hideHeader();
    },
    onLeaveBack: () => {
      showHeader();
    },
    onLeave: () => {
      showHeader();
    },
  });
};

onMounted(() => {
  if (useDevice().isMobile) return;

  ctx = gsap.context(() => {
    headerOut();

    const tl = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        trigger: el.value,
        start: 'top top',
        end: `+=${totalIndexText.value * 100 * 1.5}%`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    gsap.utils.toArray('.scroll-chapter .items').forEach((item, index) => {
      const element = item as HTMLElement;
      const overlay = element.querySelector('.overlay-black');
      const sectionHeight = element.clientHeight;
      const text = element.querySelector('.text');
      const textHeight = text?.clientHeight || 0;
      const offsetScroll = 200;

      if (index > 0) {
        tl.to(
          element,
          {
            y: 0,
            scale: 1,
          },
          '<',
        );
      }

      tl.to(text, {
        y: () => sectionHeight - textHeight - offsetScroll,
      });

      if (index < totalIndexText.value - 1) {
        tl.to(overlay, {
          opacity: 0.4,
          duration: 0.5,
        });

        tl.to(
          element,
          {
            scale: 0.85,
          },
          '<',
        );
      }
    });
  }, el.value);
});

onUnmounted(() => {
  ctx && ctx.revert();
});
</script>

<style scoped lang="scss">
.scroll-chapter {
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: #121714;
  @extend .font-body2;

  @include mx.mobile {
    height: auto;
  }

  .items {
    height: 100%;
    display: flex;
    overflow: hidden;
    position: absolute;
    background-color: var.$color-background;
    inset: 0;
    transform: translateY(101%) scale(0.9);
    transform-origin: top;
    will-change: transform;
    backface-visibility: hidden;

    @include mx.mobile {
      transform: translateY(0%);
      position: relative;
      flex-direction: column;
    }

    &.items-0 {
      transform: translateY(0%) scale(1);
      transform-origin: center;
    }
  }

  .overlay-black {
    width: 100%;
    height: 100%;
    z-index: 10;
    opacity: 0;

    @include mx.mobile {
      display: none;
    }
  }

  .overlay-gradient {
    width: 45.28%;
    inset: initial;
    bottom: 0px;
    height: fn.toVw(180);
    background: linear-gradient(0deg, var.$color-background 15%, rgba(43, 53, 48, 0) 100%);

    @include mx.mobile {
      display: none;
    }
  }

  .text {
    padding: fn.toVw(80) fn.toVw(96);
    width: 45.28%;
    height: fit-content;
    position: relative;
    overflow: hidden;

    @include mx.mobile {
      order: 2;
      width: 100%;
      padding: fn.toVw(32) fn.toVw(20);
    }

    .number {
      display: flex;
      grid-column: 1/2;
      margin-bottom: fn.toVw(120);

      @include mx.mobile {
        margin-bottom: fn.toVw(56);
      }

      .current {
        width: fn.toVw(30);
      }

      .inactive {
        opacity: 0.5;
      }
    }

    .title {
      margin-bottom: fn.toVw(40);

      @include mx.mobile {
        margin-bottom: fn.toVw(24);
      }
    }

    .list {
      margin: fn.toVw(56) 0;
      display: flex;
      flex-direction: column;

      @include mx.mobile {
        margin-top: fn.toVw(40);
        margin-bottom: fn.toVw(40);
        margin-left: fn.toVw(-20);
        width: calc(100% + (fn.toVw(20) * 2));
      }

      li {
        padding-top: fn.toVw(16);
        padding-bottom: fn.toVw(16);
        padding-left: fn.toVw(63);
        border-top: 1px solid rgba($color: var.$color-text, $alpha: 0.5);
        position: relative;
        counter-increment: list-counter;

        @include mx.mobile {
          padding-left: fn.toVw(57);
        }

        &::before {
          @extend .font-caption1;
          content: counter(list-counter, decimal-leading-zero);
          position: absolute;
          left: 0;
          top: calc(50% - fn.toVw(5));
          transform: translateY(-50%);

          @include mx.mobile {
            top: fn.toVw(18);
            transform: initial;
            padding-left: fn.toVw(20);
          }
        }
      }
    }
  }

  .image {
    width: 54.72%;

    @include mx.mobile {
      order: 1;
      width: 100%;
      height: fn.toVw(264);
    }
  }
}
</style>
