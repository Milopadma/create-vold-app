<script setup lang="ts">
import { useSeoMeta } from '#imports';
import SectionsWrapper from '~/components/shared/SectionsWrapper.vue';
import type { HomePageData } from '~/types/common';

const { $utils, $crud } = useNuxtApp();
await $utils.getWebConfig();

// Fetch page data
const pageData = (await $utils.getPageDetail()) as HomePageData | null;

// Set SEO meta
useSeoMeta($utils.headerMeta());

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
