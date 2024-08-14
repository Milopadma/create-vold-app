<script setup lang="ts">
defineProps<{
  sectionId: string;
}>();
</script>

<template>
  <section class="error-component-section">
    <div class="homepage-grid">
      <div class="error-message">
        <strong>Error:</strong>
        <span> Unknown section: "{{ sectionId }}". This component does not exist.</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.error-component-section {
  background-color: var.$color-primary;
  padding: fn.toVw(80) fn.toVw(var.$container);

  @include mx.mobile {
    padding: fn.toVw(60) fn.toVw(var.$container-m);
  }
}

.homepage-grid {
  display: grid;
  grid-template-columns: repeat(var.$grid-col, 1fr);
  column-gap: fn.toVw(var.$grid-gap);

  @include mx.mobile {
    grid-template-columns: repeat(var.$grid-col-m, 1fr);
    column-gap: fn.toVw(var.$grid-gap-m);
  }
}

.error-message {
  grid-column: 1 / -1;
  @extend .font-body2;
  color: var.$color-text;
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  padding: fn.toVw(20);
  border-radius: fn.toVw(4);

  strong {
    font-weight: bold;
    margin-right: fn.toVw(8);
  }
}
</style>
