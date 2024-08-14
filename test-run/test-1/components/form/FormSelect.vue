<template>
  <div class="form-select">
    <label v-if="props.label" class="label font-caption1" :for="`input-${props.name}`">{{ props.label }}</label>

    <div class="input-wrapper">
      <select :id="`input-${props.name}`" v-model="model" class="input font-body3" :name="`input-${props.name}`" :required="props.required">
        <option value="" disabled selected>{{ props.placeholder }}</option>
        <option v-for="item in props.items" :key="item.code" :value="item.name">{{ item.name }}</option>
      </select>

      <div class="arrow">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L6 6L11 1" stroke="#2B3530" stroke-width="1.5" />
        </svg>
      </div>
    </div>
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
  required: {
    type: Boolean,
    default: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const model = defineModel({ type: String, required: true });
</script>

<style scoped lang="scss">
.form-select {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: fn.toVw(12);

  &:not(:last-child) {
    margin-bottom: fn.toVw(16);
  }

  .label {
    color: var.$color-primary;
    opacity: 0.6;
  }

  .input-wrapper {
    position: relative;
    width: 100%;
    cursor: pointer;
  }

  .arrow {
    display: flex;
    position: absolute;
    top: 50%;
    right: fn.toVw(24);
    transform: translateY(-50%);

    svg {
      width: fn.toVw(10);
      height: auto;
    }
  }

  .input {
    width: 100%;
    background-color: #c4c7b3;
    border: 0px;
    border-bottom: 1px solid #9a9d86;
    padding: fn.toVw(12) fn.toVw(24);
    cursor: pointer;
    color: inherit;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: none;

    @include mx.mobile {
      padding: fn.toVw(12) fn.toVw(16);
    }

    &::placeholder,
    &:invalid {
      font: inherit;
      font-size: fn.toVw(var.$font-size-body3);
      color: var.$color-primary;
      opacity: 0.7;

      @include mx.mobile {
        font-size: fn.toVw(var.$font-size-body3-m);
      }
    }
  }
}
</style>
