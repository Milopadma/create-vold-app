// https://nuxtjs.org/docs/directory-structure/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Elementis',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { property: 'og:type', content: 'website' },

        { name: 'msapplication-TileColor', content: '#2b3530' },
        { name: 'theme-color', content: '#2b3530' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'preload',
          href: '/fonts/BasisGrotesqueArabicPro-Light.woff2',
          as: 'font',
          type: 'font/woff2',
        },
        {
          rel: 'preload',
          href: '/fonts/BasisGrotesqueArabicPro-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
        },
        {
          rel: 'preload',
          href: '/fonts/BasisGrotesqueArabicPro-Medium.woff2',
          as: 'font',
          type: 'font/woff2',
        },
        {
          rel: 'preload',
          href: '/fonts/BasisGrotesqueArabicPro-Bold.woff2',
          as: 'font',
          type: 'font/woff2',
        },
        {
          rel: 'preload',
          href: '/fonts/BasisGrotesqueArabicPro-Black.woff2',
          as: 'font',
          type: 'font/woff2',
        },
      ],
    },
  },

  //runtime
  runtimeConfig: {
    public: {
      tokenId: '668cd748118e3e2550dbcdf9',
      apiUrl: 'https://vold-api.dev.fleava.com/v1',
      awsUrl: 'https://vold-independent.s3.ap-southeast-1.amazonaws.com',
    },
  },

  build: {
    transpile: ['gsap'],
  },

  // css
  css: ['~/assets/styles/app.scss'],

  // modules
  modules: ['@nuxt/devtools', '@pinia/nuxt', '@nuxt/image', '@nuxtjs/device', '@nuxt/content'],

  image: {
    quality: 95,
    format: ['webp'],
  },

  imports: {
    dirs: ['stores'],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/styles/helpers/_functions.scss" as fn;
            @use "~/assets/styles/helpers/_mixins.scss" as mx;
            @use "~/assets/styles/helpers/_variables.scss" as var;
            @use "~/assets/styles/_typography.scss" as *;
            @use "~/assets/styles/_utils.scss" as *;
          `,
        },
      },
    },
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  compatibilityDate: '2024-07-03',

  routeRules: {
    '/home': { redirect: '/' },
  },
});
