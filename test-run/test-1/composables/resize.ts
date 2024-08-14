import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Responsive from '../utils/responsive';

export default function Resize() {
  if (DEV) return;
  const screenWidth = 720;

  Responsive({
    desktop: () => {
      const mediaQuery = window.matchMedia(`(max-width: ${screenWidth - 1}px)`);

      window.addEventListener('resize', function () {
        if (mediaQuery.matches) {
          window.location.reload();
        }
      });
    },
    mobile: () => {
      const mediaQuery = window.matchMedia(`(min-width: ${screenWidth}px)`);

      window.addEventListener('resize', function () {
        if (mediaQuery.matches) {
          window.location.reload();
        }
      });
    },
  });
}
