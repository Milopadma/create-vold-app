<template>
  <div class="card-slide">
    <p class="number font-body2">{{ useNumberPad(props.index) }}.</p>
    <div class="image">
      <NuxtPicture :src="props.image" :img-attrs="{ alt: props.title }" />
    </div>

    <h3 class="title font-subheading4">
      {{ props.title }}
    </h3>

    <p class="desc font-body2">
      {{ props.desc }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.card-slide {
  width: 100%;
  max-width: fn.toVw(372);
  display: flex;
  flex-direction: column;

  @include mx.mobile {
    max-width: fn.toVw(320);
  }

  .number {
    margin-bottom: fn.toVw(24);
  }

  .image {
    width: 100%;
    height: fn.toVw(265);
    margin-bottom: fn.toVw(40);

    @include mx.mobile {
      margin-bottom: fn.toVw(28);
    }
  }

  .title {
    width: 100%;
    max-width: fn.toVw(316);
    margin-bottom: fn.toVw(20);

    @include mx.mobile {
      max-width: fn.toVw(308);
      margin-bottom: fn.toVw(18);
    }
  }
}
</style>
