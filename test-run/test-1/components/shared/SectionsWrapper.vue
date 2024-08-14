<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';
import ErrorComponentSection from '~/components/section/ErrorComponentSection.vue';
import type { ComponentData } from '~/types/common';

const props = defineProps<{
  components: {
    id: string;
    section: string;
    sectionId: string;
    title: string;
    section_title?: string;
    data?: ComponentData;
  }[];
}>();

const toPascalCase = (str: string) => str.replace(/(^\w|-\w)/g, clearAndUpper);
const clearAndUpper = (text: string) => text.replace(/-/, '').toUpperCase();

const createComponent = (id: string) => {
  const componentName = `Section${toPascalCase(id)}`;
  return defineAsyncComponent({
    loader: () =>
      import(`~/components/section/${componentName}.vue`).catch(() => {
        console.error(`Failed to load component: ${componentName}`);
        return ErrorComponentSection;
      }),
    errorComponent: ErrorComponentSection,
  });
};

const dynamicComponents = computed(() =>
  props.components.map((comp) => ({
    component: createComponent(comp.sectionId),
    props: {
      data: comp.data,
      sectionId: comp.sectionId,
    },
  })),
);
</script>

<template>
  <div class="main-wrapper">
    <template v-for="(comp, index) in dynamicComponents" :key="index">
      <component :is="comp.component" v-bind="comp.props" />
    </template>
  </div>
</template>

<style scoped></style>
