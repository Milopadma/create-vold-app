<template>
  <span ref="el">
    <slot />
  </span>
</template>

<script setup>
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

if (import.meta.client) {
  gsap.registerPlugin(SplitText);
}

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  splitType: {
    type: String,
    default: 'lines',
  },
  masking: {
    type: Boolean,
    default: true,
  },
  revealLine: {
    type: Boolean,
    default: true,
  },
  trigger: {
    type: Boolean,
    default: true,
  },
  stagger: {
    type: Number,
    default: undefined,
  },
  delay: {
    type: Number,
    default: 0,
  },
});

const el = ref(null);
let elSplit;

const Masking = (lines) => {
  gsap.utils.toArray(lines).forEach((el) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('masking-text');
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  });
};

onMounted(async () => {
  await nextTick();

  elSplit = new SplitText(el.value.children, {
    type: props.splitType,
    linesClass: 'line',
    wordsClass: 'word',
    charsClass: 'char',
  });

  if (props.masking) {
    Masking(elSplit.lines);
  }

  if (props.revealLine) {
    let tl;
    if (props.trigger) {
      tl = gsap.timeline({
        delay: props.delay,
        defaults: {
          duration: 1.6,
          ease: 'expo.out',
        },
        scrollTrigger: {
          trigger: props.trigger ? el.value : null,
        },
      });
    } else {
      tl = gsap.timeline({
        delay: props.delay,
      });
    }

    tl.to(elSplit.lines, {
      y: 0,
      stagger: props.stagger || /* Replace with your config value */ 0.1,
    });
  }
});

onUnmounted(() => {
  elSplit.revert();
});
</script>
