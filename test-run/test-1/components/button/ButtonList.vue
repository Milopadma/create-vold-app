<template>
  <NuxtLink :to="props.href" :external="props.external" :target="props.external ? '_blank' : ''" class="button-link font-button1">
    <div class="text-wrapper">
      <span v-if="props.number" class="number font-caption1">{{ numberPad }}</span>
      <span class="text font-subheading3">{{ props.text }}</span>
    </div>
    <IconArrowUpRight class="icon" />
  </NuxtLink>
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
.button-link {
  color: var.$color-text;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: fn.toVw(24) fn.toVw(24) fn.toVw(24) 0;
  position: relative;
  border-top: 1px solid var.$color-text;
  transition: color 0.6s var.$transition-ease;

  @include mx.mobile {
    padding: fn.toVw(20);
  }

  &:last-child {
    border-bottom: 1px solid var.$color-text;
  }

  &:hover {
    color: var.$color-primary;

    .text-wrapper {
      .number {
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
    background-color: var.$color-text;
    height: 100%;
    width: 100%;
    position: absolute;
    inset: 0;
    transform-origin: top;
    transform: scaleY(0);
    transition: transform 0.6s var.$transition-ease;
  }

  .text-wrapper,
  .icon {
    position: relative;
    z-index: 2;
  }

  .text-wrapper {
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    gap: fn.toVw(113);

    @include mx.mobile {
      gap: fn.toVw(24);
    }

    .number {
      transition: transform 0.6s var.$transition-ease;
    }
  }

  .icon {
    flex-shrink: 0;
    width: 100%;
    max-width: fn.toVw(16);
    height: auto;

    @include mx.mobile {
      max-width: fn.toVw(12);
    }
  }
}
</style>
