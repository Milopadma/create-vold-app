<template>
  <div :to="props.href" :external="props.external" :target="props.external ? '_blank' : ''" class="button-text font-button1">
    <div class="text-wrapper">
      <span class="text font-subheading4">{{ props.text }}</span>
      <span v-if="props.number" class="number font-body3">{{ numberPad }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
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

const numberPad = computed(() => {
  return String(props.number).padStart(2, '0');
});
</script>

<style scoped lang="scss">
.button-text {
  color: var.$color-primary;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: fn.toVw(24) fn.toVw(24) fn.toVw(24) 0;
  position: relative;
  border-top: 1px solid rgba($color: var.$color-primary, $alpha: 0.5);
  transition: color 0.6s var.$transition-ease;
  cursor: default;

  @include mx.mobile {
    padding: fn.toVw(16) fn.toVw(20);
  }

  &:last-child {
    border-bottom: 1px solid rgba($color: var.$color-primary, $alpha: 0.5);
  }

  &:hover {
    color: var.$color-white;

    .text-wrapper {
      .text {
        transform: translateX(fn.toVw(16));

        @include mx.mobile {
          transform: translateX(fn.toVw(4));
        }
      }
    }

    &::after {
      transform: scaleY(1);
      transform-origin: bottom;
    }
  }

  &::after {
    content: '';
    background-color: var.$color-primary;
    height: 100%;
    width: 100%;
    position: absolute;
    inset: 0;
    transform-origin: top;
    transform: scaleY(0);
    transition: transform 0.6s var.$transition-ease;
  }

  .text-wrapper {
    width: 100%;
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;

    .text {
      transition: transform 0.6s var.$transition-ease;
    }
  }
}
</style>
