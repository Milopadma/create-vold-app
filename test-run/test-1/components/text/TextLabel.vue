<template>
  <div class="text-label">
    <div class="icon">
      <IconBurger class="burger" />
    </div>
    <div class="text font-body1">
      <h2 class="title">{{ props.text }}</h2>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
});
</script>

<style scoped lang="scss">
.text-label {
  display: flex;
  flex-direction: row;
  gap: fn.toVw(20);
  align-items: center;

  .icon {
    width: fn.toVw(12);
    height: 100%;

    .burger {
      width: 100%;
      height: auto;

      &:deep(path) {
        stroke: currentcolor;
      }
    }
  }

  .title {
    margin-top: -0.05em;

    @include mx.mobile {
      margin-top: -0.2em;
    }
  }
}
</style>
