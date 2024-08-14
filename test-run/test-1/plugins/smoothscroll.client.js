// plugins/lenis.js

import { defineNuxtPlugin } from '#app';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default defineNuxtPlugin((nuxtApp) => {
  const lenis = new Lenis({
    duration: 0.9,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -11 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  const header = document.getElementById('header');

  lenis.on('scroll', (e) => {
    ScrollTrigger.update();

    if (e.isStopped) return;
    if (e.direction === 1) {
      // Scroll up
      header.classList.add('is--hidden');
    } else if (e.direction === -1) {
      // Scroll down
      header.classList.remove('is--hidden');
    }
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Use provide to inject globally
  nuxtApp.provide('lenis', {
    lenis,

    pause() {
      lenis.stop();
      document.documentElement.style.setProperty('overflow', 'hidden');
    },

    resume() {
      lenis.start();
      document.documentElement.style.removeProperty('overflow');
    },
  });
});
