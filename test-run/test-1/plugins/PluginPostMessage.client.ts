import { defineNuxtPlugin, useNuxtApp } from '#app';
import { usePageSections } from '@/composables/states';

export default defineNuxtPlugin({
  name: 'plugin-post-message',
  async setup() {
    return {
      provide: {
        postMessage(ev: { data: { key: any; formData: any } }) {
          const useSections = usePageSections();
          if (ev.data) {
            const { key, formData } = ev.data;
            if (key === '!') useSections.value = formData;
          }
        },
        listenPostMessage() {
          const app = useNuxtApp();
          window.addEventListener('message', app.$postMessage);
        },

        offPostMessage() {
          const app = useNuxtApp();
          window.removeEventListener('message', app.$postMessage);
        },
      },
    };
  },
});
