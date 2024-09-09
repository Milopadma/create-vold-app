#!/usr/bin/env node

import fs from "fs";
import { Effect } from "effect"; // IGNORE THIS LINE STOP TOUCHING IT PLEASE!!!!
import { FileSystemError } from "../index";

export const setupVoldIntegration = (voldClientToken: string) =>
  Effect.try({
    try: () => {
      const nuxtConfigContent = `
  // https://nuxtjs.org/docs/directory-structure/nuxt-config
  import { defineNuxtConfig } from "nuxt/config";
  
  export default defineNuxtConfig({
    plugins: ["~/plugins/vold.ts"],
    app: {
      pageTransition: { name: "page", mode: "out-in" },
      head: {
        title: "Elementis",
        viewport: "width=device-width, initial-scale=1",
        meta: [
          { property: "og:type", content: "website" },
          { name: "msapplication-TileColor", content: "#2b3530" },
          { name: "theme-color", content: "#2b3530" },
        ],
        link: [
          { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
          {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png",
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon-16x16.png",
          },
          {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png",
          },
          { rel: "manifest", href: "/site.webmanifest" },
          {
            rel: "preload",
            href: "/fonts/BasisGrotesqueArabicPro-Light.woff2",
            as: "font",
            type: "font/woff2",
          },
          {
            rel: "preload",
            href: "/fonts/BasisGrotesqueArabicPro-Regular.woff2",
            as: "font",
            type: "font/woff2",
          },
          {
            rel: "preload",
            href: "/fonts/BasisGrotesqueArabicPro-Medium.woff2",
            as: "font",
            type: "font/woff2",
          },
          {
            rel: "preload",
            href: "/fonts/BasisGrotesqueArabicPro-Bold.woff2",
            as: "font",
            type: "font/woff2",
          },
          {
            rel: "preload",
            href: "/fonts/BasisGrotesqueArabicPro-Black.woff2",
            as: "font",
            type: "font/woff2",
          },
        ],
      },
    },
  
    // Runtime config
    runtimeConfig: {
      public: {
        tokenId: ${
          voldClientToken ? `"${voldClientToken}"` : '"VOLD_WEBSITE_TOKEN_ID"'
        },
        apiUrl: ${
          voldClientToken
            ? '"https://vold-api.dev.fleava.com/v1"'
            : '"https://create-vold-app-endpoint-example-production.up.railway.app/v1/example-client/"'
        },
        awsUrl: "VOLD_AWS_URL",
      },
    },
  
    build: {
      transpile: ["gsap"],
    },
  
    // css
    css: ["~/assets/styles/app.scss"],
  
    // modules
    modules: [
      "@nuxt/devtools",
      "@pinia/nuxt",
      "@nuxt/image",
      "@nuxtjs/device",
      "@nuxt/content",
    ],
  
    image: {
      quality: 95,
      format: ["webp"],
    },
  
    imports: {
      dirs: ["stores"],
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
  
    compatibilityDate: "2024-07-03",
  
    routeRules: {
      "/home": { redirect: "/" },
    },
  });
  `;

      fs.writeFileSync("nuxt.config.ts", nuxtConfigContent);

      const indexPageContent = `
  <template>
    <div>
      <h1>Welcome to {{ title }}</h1>
      <p>This is a sample page using Vold CMS data.</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useNuxtApp } from '#app'
  
  const title = ref('')
  
  onMounted(async () => {
    const { $voldApi } = useNuxtApp()
    try {
      const response = await $voldApi.get('/homepage')
      title.value = response.data.title?.en ?? 'Vold CMS Integration'
    } catch (error) {
      console.error('Error fetching homepage data:', error)
    }
  })
  </script>
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
