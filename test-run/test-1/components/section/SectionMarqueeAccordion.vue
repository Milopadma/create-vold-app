<template>
  <section ref="el" class="marquee-accordion">
    <TextMarquee class="marquee" :text="props.data.MarqueeAccordionMarqueeText" />

    <div class="container">
      <div class="accordion">
        <div v-for="(item, index) in props.data.MarqueeAccordionContainer" :key="index" ref="elItems" class="item" :class="{ active: index === 0 }">
          <div v-if="index === 0" class="border border-top">
            <div class="border-fill"></div>
          </div>

          <div class="border border-bottom">
            <div class="border-fill"></div>
          </div>

          <div class="head">
            <span class="number font-body3">{{ useNumberPad(index + 1) }}</span>

            <div class="title font-subheading3">{{ item.MarqueeAccordionSlideTitle }}</div>

            <div class="icon">
              <IconArrow />
            </div>
          </div>

          <div class="content">
            <div class="image">
              <NuxtPicture :src="getImage(item.MarqueeAccordionSlideImage)" :img-attrs="{ alt: item.MarqueeAccordionSlideTitle }" />
            </div>
            <p class="desc font-body2">
              {{ item.MarqueeAccordionSlideDescription }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MarqueeAccordionSection } from '~/types/cms';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const el = ref();
const elItems = ref([]);

const props = defineProps<{
  data: MarqueeAccordionSection;
}>();

let ctx: gsap.Context;
onMounted(() => {
  ctx = gsap.context(() => {
    (gsap.utils.toArray(elItems.value) as HTMLElement[]).forEach((item, index) => {
      const head = item.querySelector('.head');
      const content = item.querySelector('.content');

      const isOpen = item.classList.contains('active');

      gsap.set(content, {
        height: isOpen ? 'auto' : 0,
        overwrite: true,
      });

      head?.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other items
        (gsap.utils.toArray(elItems.value) as HTMLElement[]).forEach((otherItem, otherIndex) => {
          if (otherIndex !== index) {
            otherItem?.classList.remove('active');
            gsap.to(otherItem?.querySelector('.content'), {
              height: 0,
              overwrite: true,
              duration: 1,
            });
          }
        });

        if (isOpen) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }

        gsap.to(content, {
          height: isOpen ? 0 : 'auto',
          duration: 1,
          overwrite: true,
          onComplete: () => {
            ScrollTrigger.refresh();
          },
        });
      });
    });
  });
}, el.value);

onUnmounted(() => {
  ctx && ctx.revert();
});
</script>

<style scoped lang="scss">
.marquee-accordion {
  padding: fn.toVw(200) 0;

  @include mx.mobile {
    padding: fn.toVw(120) 0;
  }

  .marquee {
    margin-bottom: fn.toVw(120);
  }

  .container {
    @include mx.mobile {
      padding: 0;
    }
  }

  .accordion {
    width: 100%;
    overflow: hidden;
  }

  .item {
    overflow: hidden;
    position: relative;

    &.active {
      .icon {
        &:deep(svg) {
          transform: rotate(180deg);
        }
      }

      .content {
        height: auto;
        margin-bottom: calc(fn.toVw(40) + fn.toVw(24));
        transform: translateY(calc(fn.toVw(40) - fn.toVw(24)));
      }

      .border-bottom {
        .border-fill {
          transform: scaleX(1);
          transform-origin: left;
        }
      }
    }

    &:hover {
      .border-bottom {
        .border-fill {
          transform: scaleX(1);
          transform-origin: left;
        }
      }
    }

    .border {
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba($color: var.$color-background2, $alpha: 0.5);

      .border-fill {
        background-color: var.$color-background2;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        transform-origin: right;
        transform: scaleX(0);
        transition: transform var.$transition-default;
      }

      &.border-top {
        top: 0;
      }

      &.border-bottom {
        bottom: 0;
      }
    }

    .head {
      padding: fn.toVw(24) 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      cursor: pointer;

      @include mx.mobile {
        padding-top: fn.toVw(20);
        padding-bottom: fn.toVw(20);
        padding-right: fn.toVw(var.$container-m);
      }

      .number {
        position: absolute;
        top: fn.toVw(24);
        left: 0;

        @include mx.mobile {
          top: fn.toVw(20);
          left: fn.toVw(var.$container-m);
        }
      }

      .icon {
        &:deep(svg) {
          width: fn.toVw(14);
          flex-shrink: 0;
          height: auto;
          will-change: transform;
          transition: transform 0.5s var.$transition-ease;

          @include mx.mobile {
            width: fn.toVw(9);
          }

          path {
            fill: var.$color-text;
          }
        }
      }
    }

    .title,
    .content {
      padding-left: fn.toVw(396);

      @include mx.mobile {
        padding-left: fn.toVw(60);
      }
    }

    .content {
      display: flex;
      gap: fn.toVw(80);
      height: 0;
      overflow: hidden;
      margin-bottom: 0;
      will-change: height, margin, transform;
      transition:
        margin 1s var.$transition-ease,
        transform 1s var.$transition-ease;

      @include mx.mobile {
        flex-direction: column;
        gap: fn.toVw(32);
        padding-right: fn.toVw(var.$container-m);
      }

      .image {
        flex-shrink: 0;
        width: fn.toVw(289);
        height: fn.toVw(357);

        @include mx.mobile {
          width: fn.toVw(210);
          height: fn.toVw(260);
        }
      }

      .desc {
        width: 100%;
        max-width: fn.toVw(440);

        @include mx.mobile {
          max-width: 100%;
        }
      }
    }
  }
}
</style>
