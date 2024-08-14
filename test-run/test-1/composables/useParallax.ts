import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxOptions {
  speed?: number;
  innerElement?: string;
  trigger?: {
    start?: string;
    end?: string;
  };
  bounds?: {
    start?: number;
    end?: number;
  };
  fixedScale?: boolean;
}

export function useParallax(target: Ref<HTMLElement | null>, options: ParallaxOptions = {}) {
  const {
    speed = 40,
    innerElement = 'img',
    trigger = {
      start: 'top bottom',
      end: 'bottom top',
    },
    bounds = {
      start: 1,
      end: 1,
    },
    fixedScale = false,
  } = options;

  const innerEl = ref<HTMLElement | null>(null);
  let scrollTrigger: ScrollTrigger | null = null;

  const getScaleValue = (imgContainer: HTMLElement, speed: number): number => {
    const imgHeight = imgContainer.clientHeight;
    const track = imgHeight + window.innerHeight;
    const reverse = speed < 0;

    if (reverse) {
      return 1 + (-speed / 100) * 2;
    } else {
      let excess = (speed / 100) * 2 * imgHeight - track;
      excess = Math.max(excess, 0);

      const scale = 1 + (0.5 - imgHeight / (track + excess)) * (speed / 25);

      return imgHeight > window.innerHeight ? 1 : scale;
    }
  };

  const updateParallax = () => {
    if (!target.value || !innerEl.value) return;

    scrollTrigger?.kill();

    gsap.set(target.value, { overflow: 'hidden' });

    const scale = fixedScale ? 1 : getScaleValue(target.value, speed);
    gsap.set(innerEl.value, { scale });

    scrollTrigger = ScrollTrigger.create({
      trigger: target.value,
      start: trigger.start,
      end: trigger.end,
      scrub: true,
      animation: gsap.fromTo(innerEl.value, { yPercent: speed * -1 * (bounds.start ?? 1) }, { yPercent: speed * (bounds.end ?? 1), ease: 'none' }),
    });
  };

  const cleanup = () => {
    scrollTrigger?.kill();
    window.removeEventListener('resize', updateParallax);
  };

  onMounted(() => {
    if (target.value) {
      innerEl.value = target.value.querySelector(innerElement);
      updateParallax();

      window.addEventListener('resize', updateParallax);
    }
  });

  onUnmounted(cleanup);

  watch(target, (newTarget) => {
    if (newTarget) {
      innerEl.value = newTarget.querySelector(innerElement);
      updateParallax();
    }
  });
}
