<template>
  <div ref="el" class="textmarquee font-heading1">
    <div class="marquee__wrapper">
      <div class="marquee__group" :class="{ reverse: isReverse }">
        <p class="text">
          {{ props.text }}<span aria-label="hidden">&nbsp;• {{ props.text }} • {{ props.text }} •</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  reverse: {
    type: Boolean,
    default: false,
  },
  scrollSpeed: {
    type: Number,
    default: 15,
  },
});

const calcDuration = computed(() => {
  return props.text.length * 3.5;
});

const el = ref<HTMLElement | null>(null);
const isReverse = ref(props.reverse);

let ctx: gsap.Context | null = null;
let roll1: gsap.core.Timeline | null = null;
let scrollTriggerInstance: ScrollTrigger | null = null;

const setupMarquee = () => {
  if (!el.value || !import.meta.client) return;

  if (ctx) {
    ctx.revert();
  }

  ctx = gsap.context(() => {
    gsap.to('.marquee__wrapper', {
      x: isReverse.value ? `+=${props.scrollSpeed}%` : `-=${props.scrollSpeed}%`,
      ease: 'none',
      duration: 2,
      scrollTrigger: {
        trigger: el.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    const roll = (targets: string, vars: gsap.TweenVars, reverse: boolean) => {
      vars = { ease: 'none', ...vars };
      const tl = gsap.timeline({
        repeat: -1,
        onReverseComplete() {
          this.totalTime(this.rawTime() + this.duration() * 10);
        },
      });
      const elements = gsap.utils.toArray(targets) as HTMLElement[];
      const clones = elements.map((el) => {
        const clone = el.cloneNode(true) as HTMLElement;
        el.parentNode?.appendChild(clone);
        return clone;
      });
      const positionClones = () =>
        elements.forEach((el, i) =>
          gsap.set(clones[i], {
            position: 'absolute',
            overwrite: false,
            top: el.offsetTop,
            left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth),
          }),
        );

      positionClones();
      elements.forEach((el, i) =>
        tl.to(
          [el, clones[i]],
          {
            xPercent: reverse ? 100 : -100,
            ...vars,
          },
          0,
        ),
      );

      return tl;
    };

    let direction = isReverse.value ? -1 : 1;

    roll1 = roll(
      '.marquee__group',
      {
        duration: calcDuration.value,
      },
      isReverse.value,
    );

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: el.value,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate(self) {
        if (self.direction !== direction) {
          direction *= -1;
          gsap.to(roll1, { timeScale: direction, overwrite: true });
        }
      },
    });
  }, el.value);
};

onMounted(() => {
  setupMarquee();
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
    ctx = null;
  }
  if (roll1) {
    roll1.kill();
    roll1 = null;
  }
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
    scrollTriggerInstance = null;
  }
});
</script>

<style scoped lang="scss">
.textmarquee {
  padding: 0;
  text-transform: none;
  overflow: hidden;

  @include mx.mobile {
    font-size: 100px;
  }
}

.marquee__wrapper {
  display: flex;
  user-select: none;
  height: auto;
  white-space: nowrap;
}

.marquee__group {
  flex-shrink: 0;
  display: inline-block;
  min-width: 100%;
  padding-left: 0.25em;
}

.marquee .text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  white-space: nowrap;
  max-width: none;
  margin: 0;
  line-height: normal;
  text-transform: none;
}
</style>
