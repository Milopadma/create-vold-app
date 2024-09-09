#!/usr/bin/env node

import fs from "fs";
import { Effect } from "effect"; // IGNORE THIS LINE STOP TOUCHING IT PLEASE!!!!
import { FileSystemError } from "../index";

export const setupVoldIntegration = (voldClientToken: string) =>
  Effect.try({
    try: () => {
      const nuxtConfigContent = `
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
  
    runtimeConfig: {
      public: {
        tokenId: ${
          voldClientToken ? `"${voldClientToken}"` : '"client_id_replace_me"'
        },
        apiUrl: ${
          voldClientToken
            ? '"https://vold-api.dev.fleava.com/v1"'
            : '"https://create-vold-app-endpoint-example-production.up.railway.app/v1"'
        },
        awsUrl: 'https://vold-independent.s3.ap-southeast-1.amazonaws.com',
        recaptchaSiteKey: '6LfYGjAqAAAAACxbAOuy-Lk6FpznHjBJATFzH4ES',
      },
      mailchimpKey: '',
      recaptchaKey: '',
    },
  
    build: {
      transpile: ['gsap'],
    },
  
    css: ['~/assets/styles/app.scss'],
  
    modules: ['@nuxt/devtools', '@pinia/nuxt', '@nuxt/image', '@nuxtjs/device', '@nuxt/content', 'nuxt-gtag'],
  
    gtag: {
      enabled: process.env.NODE_ENV === 'production',
      id: 'G-1PTB7MLC83',
    },
  
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
            additionalData: \`
              @use "~/assets/styles/helpers/_functions.scss" as fn;
              @use "~/assets/styles/helpers/_mixins.scss" as mx;
              @use "~/assets/styles/helpers/_variables.scss" as var;
              @use "~/assets/styles/_typography.scss" as *;
              @use "~/assets/styles/_utils.scss" as *;
            \`,
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
  `;

      fs.writeFileSync("nuxt.config.ts", nuxtConfigContent);

      const indexPageContent =
        `
<script lang="ts" setup>
import { useSeoMeta } from '#imports';
import SectionsWrapper from '~/components/shared/SectionsWrapper.vue';
import type { HomePageData } from '~/types/homepage';

const { $utils, $crud } = useNuxtApp();
await $utils.getWebConfig();

// Fetch page data
const pageData = (await $utils.getPageDetail()) as HomePageData | null;

// Set SEO meta
useHead({
  titleTemplate: \` %s\`,
});

const meta = $utils.headerMeta(pageData);
useSeoMeta(meta);

// Filter and prepare components for the home page
const pageComponents = computed(() => {
  if (!pageData) return [];
  return pageData.components || [];
});
</script>

<template>
  <div :class="$route.name">
    <SectionsWrapper :components="pageComponents" />
    <SectionForm />
  </div>
</template>

<style scoped></style>

  `;

      fs.writeFileSync("pages/index.vue", indexPageContent);
    },
    catch: (error: unknown) =>
      new FileSystemError(
        `Failed to setup Vold integration: ${
          error instanceof Error ? error.message : String(error)
        }`
      ),
  });
