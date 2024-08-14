<template>
  <header id="header" ref="el" :class="{ active: headerActive, 'is--open': isOpen }">
    <nav class="nav font-button3">
      <NuxtLink class="logo" to="/">
        <IconLogo />
        <h1 class="visually-hidden">Elementis</h1>
      </NuxtLink>

      <ul class="menu">
        <li v-for="(item, index) in menuItems.main" :key="index">
          <NuxtLink class="link" active-class="active" :to="item.path">{{ item.name }}</NuxtLink>
        </li>
      </ul>

      <div class="hamburger-wrapper">
        <!-- Phase 2 -->
        <div class="btn font-button3" @click="scrollToForm()">
          <span>Join Us</span>
          <svg class="icon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.99777 7.10952C9.99777 7.37403 9.77842 7.59338 9.51391 7.59338C9.2494 7.59338 9.03005 7.37403 9.03005 7.10952V1.65226L0.824169 9.85814C0.727397 9.95491 0.60482 10.0001 0.482243 10.0001C0.359664 10.0001 0.237087 9.95491 0.140315 9.85814C-0.0467777 9.67104 -0.0467777 9.36137 0.140315 9.17428L8.34687 0.967721H2.88825C2.62374 0.967721 2.40439 0.748371 2.40439 0.48386C2.40439 0.21935 2.62374 0 2.88825 0H9.51391C9.58874 0 9.65995 0.0175542 9.72361 0.048719C9.77174 0.0715417 9.81672 0.102708 9.85623 0.142219C9.90282 0.188807 9.93781 0.242996 9.96119 0.301C9.98474 0.357588 9.99777 0.419383 9.99777 0.48386V7.10952Z"
              fill="white" />
          </svg>

          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 61" xml:space="preserve" class="btn-svg">
            <path
              pathLength="1"
              fill="none"
              stroke-width="1"
              stroke-miterlimit="10"
              opacity="0.5"
              d="M0 61 H150 V0 H0 Z"
              class="btn-main-stroke btn-stroke-static"></path>
            <path
              pathLength="1"
              fill="none"
              stroke-miterlimit="10"
              opacity="1"
              d="M0 61 H150 V0 H0 Z"
              class="btn-main-stroke btn-stroke-hover"></path>
          </svg>
        </div>
        <!-- <NuxtLink class="text link" to="/">Community</NuxtLink> -->
        <div class="hamburger" @click="isOpen = !isOpen">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>

        <div class="close" @click="isOpen = false">
          <div class="close-line-wrapper">
            <div class="close-line"></div>
          </div>
          <div class="close-line-wrapper">
            <div class="close-line"></div>
          </div>
        </div>
      </div>

      <Teleport to="body">
        <div ref="elPopup" class="popup" :class="{ 'is--open': isOpen }">
          <div class="overlay-black" @click="isOpen = false"></div>

          <div class="content">
            <p class="subtitle subtitle-top">Discover Pages</p>
            <ul class="menu">
              <li v-for="(item, index) in menuItems.main" :key="index">
                <ButtonLink :text="item.name" :href="item.path" :class="{ active: item.path === route.path }" />
              </li>
              <li>
                <ButtonLink href="/" text="Join Us" @click.prevent="scrollToForm()" />
              </li>
            </ul>

            <div class="contact">
              <div class="item">
                <p class="subtitle">Email Address :</p>
                <a class="link" href="mailto:info@elementis.co">info@elementis.co</a>
              </div>

              <div class="item">
                <p class="subtitle">Phone :</p>
                <a class="link" href="tel:+62 823 4078 1817">+62 823 4078 1817</a>
              </div>

              <div class="item">
                <p class="subtitle">Social Media :</p>
                <ul class="socmed-list">
                  <li>
                    <NuxtLink to="/" target="_blank" external>
                      <IconInstagram />
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" target="_blank" external>
                      <IconPinterest />
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" target="_blank" external>
                      <IconTiktok />
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" target="_blank" external>
                      <IconYoutube />
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/" target="_blank" external>
                      <IconLinkedin />
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </nav>
  </header>
</template>

<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import menuItems from '~/data/menu.json';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const el = ref();
const elPopup = ref();
const isOpen = ref(false);
const route = useRoute();
const router = useRouter();

const headerActive = ref(false);

const lenis = useNuxtApp().$lenis;

let ctx;

const menuOpen = () => {
  ctx = gsap.context(() => {
    gsap.fromTo(
      '.subtitle-top, .button-link, .item',
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        willChange: 'transform',
        ease: 'expo.out',
        duration: 1.2,
        overwrite: true,
      },
    );
  }, elPopup.value);
};

watch(isOpen, (value) => {
  if (value) {
    lenis.pause();
    menuOpen();
  } else {
    lenis.resume();
  }
});

watch(router.currentRoute, () => {
  isOpen.value = false;
});

const scrollToForm = () => {
  if (isOpen.value) {
    isOpen.value = false;
  }

  nextTick(() =>
    lenis.lenis.scrollTo('.form-section', {
      duration: 1,
      force: true,
      offset: useDevice().isMobile ? 430 : 0,
    }),
  );
};

onMounted(() => {
  ScrollTrigger.create({
    trigger: document.body,
    start: `${window.innerHeight - 300}px`,
    invalidateOnRefresh: true,
    onEnter: () => {
      headerActive.value = true;
    },
    onLeaveBack: () => {
      headerActive.value = false;
    },
  });
});

onUnmounted(() => {
  ctx && ctx.revert();
});
</script>

<style scoped lang="scss">
#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  color: var.$color-white;
  transition:
    background-color 0.6s var.$transition-ease,
    color 0.6s var.$transition-ease,
    transform 1s var.$transition-ease;

  &.is--hidden {
    transform: translate3d(0, -120%, 0);
  }

  &.active {
    color: var.$color-primary;
    background-color: var.$color-background2;

    .nav {
      padding-top: fn.toVw(8);
      padding-bottom: fn.toVw(8);

      @include mx.mobile {
        padding-top: fn.toVw(18);
        padding-bottom: fn.toVw(18);
      }

      .logo {
        width: 100%;
        max-width: fn.toVw(215);

        &:deep(path) {
          fill: var.$color-primary;
        }

        @include mx.mobile {
          max-width: fn.toVw(152);
        }
      }

      .hamburger-wrapper {
        .btn {
          border-color: rgba($color: var.$color-primary, $alpha: 0.5);

          .icon {
            path {
              fill: var.$color-primary;
            }
          }
        }
      }

      .hamburger {
        .line {
          background-color: var.$color-primary;
        }
      }
    }
  }

  &.is--open {
    .logo {
      &:deep(path) {
        @include mx.mobile {
          fill: var.$color-primary;
        }
      }
    }

    .nav {
      .hamburger {
        pointer-events: none;

        .line {
          background-color: var.$color-primary;
          transform: scaleX(0);

          &:nth-child(1) {
            transition: transform 0.3s var.$transition-ease 0s;
          }

          &:nth-child(2) {
            transition: transform 0.3s var.$transition-ease 0.1s;
          }

          &:nth-child(3) {
            transition: transform 0.3s var.$transition-ease 0.2s;
          }
        }
      }
    }

    .close {
      pointer-events: auto;

      .close-line-wrapper {
        .close-line {
          transition-delay: 0.3s;
        }

        &:first-child {
          .close-line {
            transform: scaleX(1);
          }
        }

        &:last-child {
          .close-line {
            transform: scaleX(1);
          }
        }
      }
    }
  }
}

.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: fn.toVw(33) fn.toVw(var.$container);
  transition: padding 0.6s var.$transition-ease;

  @include mx.mobile {
    padding: fn.toVw(40) fn.toVw(20);
  }

  .logo {
    width: 100%;
    max-width: fn.toVw(215);
    height: auto;
    display: flex;
    align-items: center;
    padding: 4px 0;

    @include mx.mobile {
      max-width: fn.toVw(152);
    }

    &:deep(svg) {
      width: 100%;
      height: auto;

      path {
        transition: fill 0.3s var.$transition-ease;
      }
    }
  }

  .menu {
    display: flex;
    gap: fn.toVw(24);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    @include mx.mobile {
      display: none;
    }
  }

  .hamburger-wrapper {
    display: flex;
    align-items: center;
    gap: fn.toVw(40);

    @include mx.mobile {
      gap: fn.toVw(10);
    }

    .btn {
      display: flex;
      position: relative;
      gap: fn.toVw(16);
      padding: fn.toVw(18) fn.toVw(20);
      cursor: pointer;

      @include mx.mobile {
        display: none;
      }

      &:hover {
        .btn-svg {
          .btn-stroke-static {
            stroke-dashoffset: -1;
            transition-delay: 0s;
          }

          .btn-main-stroke {
            stroke-dashoffset: 0;
            transition-delay: 0.2s;
          }
        }
      }

      .btn-svg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: visible !important;

        .btn-main-stroke {
          stroke-linecap: square !important;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          stroke-width: 1px !important;
        }

        .btn-stroke-static,
        .btn-stroke-hover {
          transition: stroke-dashoffset var.$transition-default;
          transition-delay: 0.3s;
          stroke: currentcolor;
        }

        .btn-stroke-static {
          opacity: 0.5;
          stroke-dashoffset: 0;
        }

        .btn-stroke-hover {
          stroke-dashoffset: 1;
          z-index: 1;
        }
      }

      .icon {
        flex-shrink: 0;
        width: fn.toVw(10);
        height: auto;

        path {
          transition: fill 0.3s var.$transition-ease;
        }
      }
    }

    .text {
      @include mx.mobile {
        display: none;
      }
    }
  }

  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    gap: fn.toVw(8);
    width: fn.toVw(28);
    height: 100%;
    cursor: pointer;
    pointer-events: auto;

    @include mx.mobile {
      display: flex;
    }

    .line {
      width: 100%;
      height: 1px;
      background-color: var.$color-white;
      transform-origin: right;
      transition: background-color 0.3s var.$transition-ease 0s;

      &:nth-child(1) {
        transition: transform 0.3s var.$transition-ease 0.2s;
      }

      &:nth-child(2) {
        transition: transform 0.3s var.$transition-ease 0.2s;
      }

      &:nth-child(3) {
        transition: transform 0.3s var.$transition-ease 0.2s;
      }
    }
  }

  .close {
    position: absolute;
    top: 50%;
    right: fn.toVw(var.$container-m);
    transform: translateY(-50%);
    width: fn.toVw(28);
    height: fn.toVw(28);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    .close-line-wrapper {
      position: absolute;
      top: 50%;
      left: 0%;
      transition: transform 0.6s var.$transition-ease;

      .close-line {
        background-color: var.$color-primary;
        width: fn.toVw(22);
        height: 1px;
        transition: transform 0.6s var.$transition-ease;
        transition-delay: 0s;
      }

      &:first-child {
        transform: rotate(45deg);

        .close-line {
          transform-origin: left;
          transform: scaleX(0);
        }
      }

      &:last-child {
        transform: rotate(-45deg);

        .close-line {
          transform-origin: bottom;
          transform: scaleX(0);
        }
      }
    }
  }
}

.popup {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100dvh;
  z-index: 999;
  overflow: hidden;
  pointer-events: none;
  --basesvh: 812;

  &.is--open {
    pointer-events: auto;

    .overlay-black {
      opacity: 0.35;
      pointer-events: auto;
    }

    .content {
      transform: translateX(0);
    }
  }

  .overlay-black {
    z-index: 1;
    opacity: 0;
    transition: opacity var.$transition-default;
  }

  .content {
    width: 100%;
    max-width: fn.toVw(512);
    background-color: var.$color-background2;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 2;
    transform: translateX(105%);
    transition: transform var.$transition-default;
    color: var.$color-primary;

    @include mx.mobile {
      max-width: 100%;
      padding-top: calc(100svh * 129 / var(--basesvh));
      padding-left: fn.toVw(20);
      padding-right: fn.toVw(20);
    }

    .subtitle {
      color: var.$color-primary;
      font-size: fn.toVw(14);
      opacity: 0.5;
    }

    .menu {
      display: none;

      @include mx.mobile {
        display: flex;
        flex-direction: column;
        gap: calc(calc(100svh * 15 / var(--basesvh)) / 2);
        font-size: fn.toVw(32);
        margin: calc(100svh * 32 / var(--basesvh)) 0;
      }

      li {
        &:deep(.button-link) {
          color: var.$color-primary;
          padding-top: calc(100svh * 15 / var(--basesvh));
          padding-bottom: calc(100svh * 15 / var(--basesvh));

          .border {
            background-color: rgba($color: var.$color-primary, $alpha: 0.5);

            .border-fill {
              background-color: var.$color-primary;
            }
          }
        }
      }
    }

    .contact {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: calc(100svh * 30 / var(--basesvh));
      row-gap: calc(100svh * 48 / var(--basesvh));
      position: absolute;
      bottom: calc(100svh * 40 / var(--basesvh));
      left: 0;
      width: 100%;
      padding: fn.toVw(20);

      .item {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: calc(100svh * 20 / var(--basesvh));
      }

      .socmed-list {
        display: flex;
        gap: fn.toVw(30);

        &:deep(svg) {
          width: auto;
          height: fn.toVw(20);

          path {
            fill: var.$color-primary;
          }
        }
      }
    }
  }
}
</style>
