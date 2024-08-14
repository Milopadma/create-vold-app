<template>
  <section id="team" class="team-section">
    <div class="homepage-grid">
      <div class="section-title">
        <h2>{{ props.data.TeamSectionTitle }}</h2>
      </div>

      <div class="team-list">
        <button
          v-for="(member, index) in props.data.TeamSectionList"
          :key="index"
          class="team-card"
          type="button"
          aria-label="Open Profile"
          @click="openDrawer(member)">
          <div class="team-image">
            <NuxtPicture :src="getImage(member.TeamSectionListingImage)" :img-attrs="{ alt: member.TeamSectionListingName }" />
          </div>
          <div class="team-info">
            <h3 class="name">{{ member.TeamSectionListingName }}</h3>
            <p class="role">{{ member.TeamSectionListingOccupation }}</p>
          </div>
        </button>
      </div>
    </div>
  </section>

  <ClientOnly>
    <Teleport to="body">
      <div ref="elDrawer" class="drawer" :class="{ active: isDrawerOpen }">
        <div ref="elDrawerOverlay" class="drawer-overlay" @click="closeDrawer"></div>

        <button class="close-button" type="button" aria-label="close" @click="closeDrawer">
          <span class="text">Close</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13" stroke="white" stroke-width="2" />
            <path d="M1 1L13 13" stroke="white" stroke-width="2" />
          </svg>
        </button>

        <div ref="drawerContent" class="drawer-content" data-lenis-prevent>
          <div>
            <div class="drawer-header">
              <h3 class="name">{{ selectedMember?.TeamSectionListingName }}</h3>
              <p>{{ selectedMember?.TeamSectionListingOccupation }}</p>
            </div>
            <div class="drawer-image">
              <NuxtPicture
                v-if="selectedMember?.TeamSectionListingImage"
                :src="getImage(selectedMember?.TeamSectionListingImage)"
                :img-attrs="{ alt: selectedMember?.TeamSectionListingName }" />
            </div>
            <div class="drawer-description">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p v-html="selectedMember?.TeamSectionListingDescription"></p>
            </div>
          </div>

          <div class="drawer-quote">
            <svg class="icon" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 16V9.02202L6.70518 0L8.05976 1.05727L3.99602 9.02202H6.63745V16H0ZM8.94024 16V9.02202L15.6454 0L17 1.05727L12.9363 9.02202H15.5777V16H8.94024Z"
                fill="#2B3530" />
            </svg>

            <div class="text-wrap">
              <p>{{ selectedMember?.TeamSectionListingQuote }}</p>
              <h3>{{ selectedMember?.TeamSectionListingName }}</h3>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import type { TeamSection } from '~/types/cms';

const props = defineProps<{
  data: TeamSection;
}>();

const isDrawerOpen = ref(false);
const selectedMember = ref<(typeof props.data.TeamSectionList)[0] | null>(null);
const drawerContent = ref<HTMLElement | null>(null);
const isOverlayVisible = ref(false);

const elDrawer = ref<HTMLElement | null>(null);
const elDrawerOverlay = ref<HTMLElement | null>(null);
const isHeaderHidden = ref(false);

const openDrawer = (member: (typeof props.data.TeamSectionList)[0]) => {
  selectedMember.value = member;
  isDrawerOpen.value = true;
  isOverlayVisible.value = true;

  const header = document.getElementById('header');
  isHeaderHidden.value = header?.classList.contains('is--hidden') ? true : false;
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
  isOverlayVisible.value = false;
};

const toggleHeader = (show: boolean) => {
  const header = document.getElementById('header');

  if (show) {
    if (isHeaderHidden.value) return;
    header?.classList.remove('is--hidden');
  } else {
    header?.classList.add('is--hidden');
  }
};
const lenis = useNuxtApp().$lenis as { pause: () => void; resume: () => void };

let targetScrollTop = 0;
let scrollTween: gsap.core.Tween;

const updateScroll = () => {
  if (drawerContent.value) {
    scrollTween = gsap.to(drawerContent.value, {
      scrollTop: targetScrollTop,
      duration: 0.9,
      ease: 'expo.out',
      overwrite: true,
    });
  }
};

const handleWheel = (e: any) => {
  e.preventDefault();
  if (!drawerContent.value) return;

  const delta = e.deltaY;
  targetScrollTop = Math.max(0, Math.min(drawerContent.value.scrollHeight - drawerContent.value.clientHeight, targetScrollTop + delta));

  updateScroll();
};

const eventKeyboard = () => {
  if (event.key === 'Escape') {
    if (isDrawerOpen.value) {
      isDrawerOpen.value = false;
    }
  }
};

const cleanup = () => {
  if (useDevice().isMobile) return;
  document.removeEventListener('keydown', eventKeyboard);

  if (elDrawer.value) {
    elDrawer.value.removeEventListener('scroll', handleWheel);
    elDrawer.value.removeEventListener('wheel', handleWheel);
  }

  if (elDrawerOverlay.value) {
    elDrawerOverlay.value.removeEventListener('scroll', handleWheel);
    elDrawerOverlay.value.removeEventListener('wheel', handleWheel);
  }

  if (scrollTween) {
    scrollTween.kill();
  }
};

onMounted(() => {
  watch(isDrawerOpen, (value) => {
    if (value) {
      lenis?.pause();
      toggleHeader(false);

      nextTick(() => {
        if (drawerContent.value) {
          drawerContent.value.scrollTop = 0;
        }

        if (useDevice().isMobile) return;
        document.addEventListener('keydown', eventKeyboard);

        if (elDrawer.value) {
          elDrawer.value.addEventListener('scroll', handleWheel, { passive: false });
          elDrawer.value.addEventListener('wheel', handleWheel, { passive: false });
        }

        if (elDrawerOverlay.value) {
          elDrawerOverlay.value.addEventListener('scroll', handleWheel, { passive: false });
          elDrawerOverlay.value.addEventListener('wheel', handleWheel, { passive: false });
        }
      });
    } else {
      lenis?.resume();
      toggleHeader(true);

      cleanup();
    }
  });
});

onUnmounted(() => {
  cleanup();
});
</script>

<style scoped lang="scss">
.team-section {
  background-color: var.$color-secondary;
  padding-top: fn.toVw(200);
  padding-bottom: fn.toVw(200);

  @include mx.mobile {
    padding-top: fn.toVw(120);
    padding-bottom: fn.toVw(120);
  }
}

.homepage-grid {
  display: grid;
  grid-template-columns: repeat(var.$grid-col, 1fr);
  column-gap: fn.toVw(var.$grid-gap);
  padding-left: fn.toVw(var.$container);
  padding-right: fn.toVw(var.$container);

  @include mx.mobile {
    display: flex;
    flex-wrap: wrap;
    padding-left: fn.toVw(var.$container-m);
    padding-right: fn.toVw(var.$container-m);
  }
}

.section-title {
  width: 100%;
  grid-column: 1 / -1;
  padding-bottom: fn.toVw(144);
  display: flex;
  align-items: center;
  justify-content: center;
  @extend .font-heading2;

  @include mx.mobile {
    padding-bottom: fn.toVw(64);
  }
}

.team-list {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: fn.toVw(var.$grid-gap);
  row-gap: fn.toVw(72);

  @include mx.mobile {
    grid-template-columns: repeat(1, 1fr);
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    row-gap: fn.toVw(40);
    column-gap: fn.toVw(7);
  }
}

.team-card {
  grid-column: span 1;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: transform 0.3s ease;

  @include mx.mobile {
    width: calc((100% / 2) - fn.toVw(var.$container-m) / 4);
  }

  &:hover {
    .team-image {
      &:deep(img) {
        transform: scale(1.1);
      }
    }
  }
}

.team-image {
  margin-bottom: fn.toVw(40);
  overflow: hidden;
  width: 100%;
  height: fn.toVw(374);

  @include mx.mobile {
    margin-bottom: fn.toVw(20);
    height: fn.toVw(212);
  }

  &:deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var.$transition-default;
  }
}

.team-info {
  .name {
    @extend .font-body1;
    margin-bottom: fn.toVw(12);

    @include mx.mobile {
      margin-bottom: fn.toVw(10);
    }
  }

  .role {
    @extend .font-body3;
    opacity: 0.5;
  }
}

.team-quote {
  margin-top: fn.toVw(24);

  p {
    @extend .font-body2;
    font-style: italic;
  }
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100dvh;
  z-index: 999;
  -webkit-overflow-scrolling: touch;
  display: flex;
  pointer-events: none;

  &.active {
    pointer-events: auto;

    .drawer-content {
      transform: translateX(0);
    }

    .drawer-overlay {
      opacity: 0.6;
    }

    .drawer-image {
      &:deep(img) {
        transform: scale(1);
      }
    }

    .close-button {
      transform: translate(-50%, -50%);
      pointer-events: auto;
    }
  }
}

.close-button {
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: 50%;
  right: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fn.toVw(64);
  height: fn.toVw(64);
  background-color: rgba(var.$color-white, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  color: var.$color-white;
  transform: translate(825%, -50%);
  transition:
    background-color 0.3s ease,
    transform var.$transition-default;
  pointer-events: none;

  @include mx.mobile {
    z-index: 4;
    top: fn.toVw(48);
    right: initial;
    left: 50%;
    width: auto;
    height: auto;
    padding: fn.toVw(10) fn.toVw(20);
    border-radius: 10rem;
    display: flex;
    gap: fn.toVw(8);
    align-items: center;
    transform: translate(-50%, -300%);
  }

  &:hover {
    background-color: rgba(var.$color-white, 0.4);
  }

  .text {
    display: none;

    @include mx.mobile {
      display: block;
    }
  }

  svg {
    width: fn.toVw(12);
    height: auto;

    @include mx.mobile {
      width: fn.toVw(10);
    }
  }
}

.drawer-content {
  width: fn.toVw(444);
  padding: fn.toVw(74) fn.toVw(64) 0 fn.toVw(64);
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var.$color-secondary;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  transform: translateX(105%);
  transition: transform var.$transition-default;

  @include mx.mobile {
    width: 100%;
    padding: fn.toVw(126) fn.toVw(32) 0 fn.toVw(32);
  }
}

.drawer-header {
  padding-bottom: fn.toVw(32);

  .name {
    @extend .font-subheading2;
    margin-bottom: fn.toVw(10);

    @include mx.mobile {
      margin-bottom: fn.toVw(8);
    }
  }

  p {
    @extend .font-body3;
    opacity: 0.6;
  }
}

.drawer-image {
  margin-bottom: fn.toVw(32);
  overflow: hidden;

  &:deep(img) {
    width: 100%;
    height: auto;
    object-fit: cover;
    transform: scale(1.2);
    transition: transform 1.4s var.$transition-ease;
  }
}

.drawer-description {
  padding-bottom: fn.toVw(64);
  @extend .font-body2;

  p,
  &:deep(p) {
    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }
}

.drawer-quote {
  background-color: var.$color-text;
  color: var.$color-secondary;
  padding: fn.toVw(64);
  margin: 0 fn.toVw(-64);
  display: flex;
  gap: fn.toVw(26);
  align-items: flex-start;

  .icon {
    width: fn.toVw(17);
    height: auto;
    flex-shrink: 0;
  }

  .text-wrap {
    display: flex;
    flex-direction: column;
    gap: fn.toVw(40);
  }

  p {
    @extend .font-body2;
  }
}

.drawer-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: var.$color-black;
  opacity: 0;
  z-index: 1;
  transition: opacity var.$transition-default;
}
</style>
