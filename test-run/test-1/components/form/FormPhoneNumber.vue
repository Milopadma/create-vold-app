<template>
  <div class="form-select">
    <label v-if="props.label" class="label font-caption1" :for="`input-${props.name}`">{{ props.label }}</label>

    <div class="input-wrapper">
      <div class="select-wrapper">
        <select :id="`input-phone`" v-model="selectedDialCode" class="phone font-body3" :name="`input-phone`">
          <option v-for="item in items" :key="item.code" :value="item.dial_code">({{ item.dial_code }}) {{ item.name }}</option>
        </select>

        <span>{{ formatSelectedDialCode }}</span>

        <div class="arrow">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="#2B3530" stroke-width="1.5" />
          </svg>
        </div>
      </div>

      <input
        :id="`input-${props.name}`"
        ref="elInput"
        v-model="modelInput"
        class="input font-body3"
        :name="`input-${props.name}`"
        type="number"
        :placeholder="props.placeholder"
        :required="props.required" />
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

const elInput = ref();

const modelInput = ref('');

const selectedDialCode = ref(null);

const formatSelectedDialCode = computed(() => {
  const selectedItem = props.items.find((item) => item.dial_code === selectedDialCode.value);
  return selectedItem ? selectedItem.dial_code : '';
});

const model = defineModel({ type: String, required: true });

model.value = formatSelectedDialCode.value + modelInput.value;

watch([formatSelectedDialCode, modelInput], () => {
  model.value = formatSelectedDialCode.value + modelInput.value;
});

const setCountryBasedOnLocale = () => {
  const countryCode = getUserCountry();
  const selectedItem = props.items.find((item) => item.code === countryCode);
  if (selectedItem) {
    selectedDialCode.value = selectedItem.dial_code;
  }
};

onMounted(() => {
  setCountryBasedOnLocale();

  watch(formatSelectedDialCode, () => {
    elInput.value.focus();
  });
});
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
    display: flex;
    background-color: #c4c7b3;
    border-bottom: 1px solid #9a9d86;
    padding: fn.toVw(12) fn.toVw(24);

    @include mx.mobile {
      padding: fn.toVw(12) fn.toVw(16);
    }
  }

  .input {
    width: 100%;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
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

  .select-wrapper {
    position: relative;
    width: fn.toVw(95);
    overflow: hidden;
    font-size: fn.toVw(var.$font-size-body3);
    display: flex;
    align-items: center;

    @include mx.mobile {
      font-size: fn.toVw(var.$font-size-body3-m);
    }
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

  .phone {
    width: 100%;
    border: 0px;
    background-color: #c4c7b3;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: none;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* Make the select invisible */
    z-index: 2; /* Ensure the select is above the custom display */
    cursor: pointer;

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
