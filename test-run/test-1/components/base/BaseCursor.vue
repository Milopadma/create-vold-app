<template>
  <div v-if="useDevice().isDesktop" ref="el" class="base-cursor">
    <Transition name="fade">
      <div v-if="cursorDrag" class="drag">
        <div class="drag-btn left">
          <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7L2 4L5 1" stroke="white" stroke-width="1.5" />
          </svg>
        </div>

        <p>Drag</p>

        <div class="drag-btn right">
          <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7L4 4L1 1" stroke="white" stroke-width="1.5" />
          </svg>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import gsap from 'gsap';

const el = ref(null);

const cursorDrag = useCursorDrag();

let xTo, yTo;

const animateCursor = (e) => {
  if (xTo && yTo) {
    xTo(e.clientX);
    yTo(e.clientY);
  }
};

onMounted(() => {
  if (!useDevice().isDesktop) return;

  if (el.value) {
    gsap.set(el.value, { xPercent: -50, yPercent: -50 });

    xTo = gsap.quickTo(el.value, 'x', { duration: 0.45 });
    yTo = gsap.quickTo(el.value, 'y', { duration: 0.45 });

    window.addEventListener('mousemove', animateCursor);
  }
});

onUnmounted(() => {
  window.removeEventListener('mousemove', animateCursor);
});
</script>

<style scoped lang="scss">
.base-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  top: 0%;
  left: 0%;
  transform: translate(-50%, -50%);

  @include mx.mobile {
    display: none;
  }

  .drag {
    position: absolute;
    top: fn.toVw(20);
    left: calc(fn.toVw(-112) / 2);
    font-size: fn.toVw(16);
    line-height: 1;
    width: fn.toVw(112);
    color: #fff;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border-radius: fn.toVw(50);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: fn.toVw(6);

    .drag-btn {
      width: fn.toVw(20);
      height: fn.toVw(20);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba($color: #ffffff, $alpha: 0.2);
      border-radius: 50%;

      svg {
        width: fn.toVw(6);
        height: auto;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
