<template>
  <div class="form-checkbox">
    <div class="checkbox-wrapper">
      <input
        :id="`input-${props.name}`"
        v-model="model"
        class="checkbox"
        :name="`input-${props.name}`"
        type="checkbox"
        :placeholder="props.placeholder"
        :value="props.label"
        :checked="props.checked" />
      <svg class="checkmark" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.888916 2.2223L3.61114 4.94453L7.88892 0.666748" stroke="#D1CCBF" stroke-width="1.5" />
      </svg>
    </div>
    <label v-if="props.label" class="label font-caption1" :for="`input-${props.name}`">{{ props.label }}</label>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: 'Input',
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel({ type: Boolean });
</script>

<style scoped lang="scss">
.form-checkbox {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: fn.toVw(8);
  cursor: pointer;

  .label {
    color: var.$color-primary;
    font-size: fn.toVw(15);
    cursor: pointer;
  }

  .checkbox-wrapper {
    position: relative;
    display: flex;
  }

  .checkbox {
    width: fn.toVw(14);
    height: fn.toVw(14);
    flex-shrink: 0;
    border: 1px solid var.$color-primary;
    cursor: pointer;

    &:checked {
      background-color: var.$color-primary;

      ~ .checkmark {
        display: block;
      }
    }
  }

  .checkmark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: fn.toVw(7);
    height: auto;
    display: none;
    pointer-events: none;
  }
}
</style>
