<template>
  <NuxtLink :to="props.href" :external="props.external" :target="props.external ? '_blank' : ''" class="button-link font-button1">
    <span class="text">{{ props.text }}</span>
    <IconArrowUpRight class="icon" />

    <div class="border">
      <div class="border-fill"></div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  external: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.button-link {
  color: var.$color-text;
  display: flex;
  align-items: center;
  gap: fn.toVw(150);
  justify-content: space-between;
  cursor: pointer;
  padding: fn.toVw(10) fn.toVw(16) fn.toVw(10) 0;
  position: relative;

  @include mx.mobile {
    padding: fn.toVw(16) fn.toVw(16) fn.toVw(16) 0;
  }

  &:hover,
  &.active {
    .border {
      .border-fill {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }

  .text {
    flex-shrink: 0;
  }

  .icon {
    flex-shrink: 0;
    width: 100%;
    max-width: fn.toVw(12);
    height: auto;
  }

  .border {
    background-color: rgba($color: var.$color-text, $alpha: 0.5);
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: -1px;
    left: 0;

    .border-fill {
      background-color: var.$color-text;
      width: 100%;
      height: 1px;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform var.$transition-default;
    }
  }
}
</style>
