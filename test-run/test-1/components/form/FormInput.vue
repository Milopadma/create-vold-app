<template>
  <div class="form-input">
    <label v-if="props.label" class="label font-caption1" :for="`input-${props.name}`">{{ props.label }}</label>
    <input
      :id="`input-${props.name}`"
      v-model="model"
      class="input font-body3"
      :name="`input-${props.name}`"
      :type="props.type"
      :placeholder="props.placeholder"
      :required="props.required" />
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
});

const model = defineModel({ type: String, required: true });
</script>

<style scoped lang="scss">
.form-input {
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

  .input {
    background-color: #c4c7b3;
    border-bottom: 1px solid #9a9d86;
    padding: fn.toVw(12) fn.toVw(24);

    @include mx.mobile {
      padding: fn.toVw(12) fn.toVw(16);
    }

    &::placeholder {
      font: inherit;
      color: var.$color-primary;
      opacity: 0.7;
    }
  }
}
</style>
