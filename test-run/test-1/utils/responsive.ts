import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface ResponsiveProps {
  desktop?: () => void;
  mobile?: () => void;
  both?: () => void;
}

export default function Responsive({ desktop, mobile, both }: ResponsiveProps): void {
  try {
    ScrollTrigger.matchMedia({
      // desktop
      '(min-width: 720px)': function () {
        if (!desktop) return;
        desktop();
      },

      // mobile
      '(max-width: 719px)': function () {
        if (!mobile) return;
        mobile();
      },

      // both
      all: function () {
        if (!both) return;
        both();
      },
    });
  } catch (error) {
    return;
  }
}
