<script setup lang="ts">
import { useSeoMeta } from '#imports';
import SectionsWrapper from '~/components/shared/SectionsWrapper.vue';
import type { PageData } from '~/types/common';

const { $utils, $crud } = useNuxtApp();
await $utils.getWebConfig();
const route = useRoute();

// Fetch page data
const pageData = (await $crud.GET_SINGLE(route.params.page as string)) as PageData | null;

// Set SEO meta
useSeoMeta($utils.headerMeta());

// Check if it's a valid slug
const validSlug = pageData?.results?.some((page) => page.customUrl.en === route.params.page);

if (!validSlug) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

// Filter and prepare components for the current page
const pageComponents = computed(() => {
  if (!pageData?.results) return [];
  const currentPage = pageData.results.find((page) => page.customUrl.en === route.params.page);
  return currentPage?.components || [];
});
</script>

<template>
  <div :class="$route.name">
    <SectionsWrapper :components="pageComponents" />
    <SectionForm />
  </div>
</template>

<style scoped></style>
