import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Default() {
  // Config GSAP
  gsap.config({
    nullTargetWarn: DEV,
  });

  gsap.defaults({
    ease: 'power4.out',
    duration: 1.0,
  });

  // ScrollTrigger.normalizeScroll(true);
  ScrollTrigger.config({ ignoreMobileResize: true });
}
