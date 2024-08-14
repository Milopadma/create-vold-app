<template>
  <footer class="footer">
    <div class="container">
      <div class="left font-body3">
        <IconLogo class="logo" />

        <div class="contact d-desktop">
          <div class="contact-item">
            <p>Email Address :</p>
            <a class="link" href="mailto:info@elementis.co">info@elementis.co</a>
          </div>

          <div class="contact-item">
            <p>Phone :</p>
            <a class="link" href="tel:+62 823 4078 1817">+62 823 4078 1817</a>
          </div>
        </div>
      </div>

      <ul class="menu-page font-subheading1">
        <li v-for="(item, index) in menuItems.footer.left" :key="index">
          <NuxtLink :to="item.path" class="link">{{ item.name }}</NuxtLink>
        </li>
      </ul>

      <ul class="menu-page-2 font-subheading1">
        <li v-for="(item, index) in menuItems.footer.right" :key="index">
          <NuxtLink :to="item.path" class="link">{{ item.name }}</NuxtLink>
        </li>
      </ul>

      <div class="contact d-mobile">
        <div class="contact-item">
          <p>Email Address :</p>
          <a class="link" href="mailto:info@elementis.co">info@elementis.co</a>
        </div>

        <div class="contact-item">
          <p>Phone :</p>
          <a class="link" href="tel:+62 823 4078 1817">+62 823 4078 1817</a>
        </div>
      </div>

      <div class="social font-button3">
        <p>Social Media :</p>

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

    <div class="border border-mobile"></div>

    <div class="container bottom font-body3">
      <div class="border"></div>

      <div class="credit">
        <p>
          Website by
          <NuxtLink class="link" to="https://fleava.com/" target="_blank" external title="Fleava - Bali & Singapore Creative Digital Agency">
            Fleava
          </NuxtLink>
        </p>
      </div>

      <div class="copyright">
        <p>© {{ new Date().getFullYear() }} ELEMENTIS. All Rights Reserved</p>
      </div>

      <!-- Phase 2 -->
      <!-- <div class="terms">
        <NuxtLink class="link" to="/">Terms & Conditions</NuxtLink> <span class="spacer">|</span>
        <NuxtLink class="link" to="/">Privacy Policy</NuxtLink>
      </div> -->

      <div class="scroll" @click="scrollToTop()">
        <p>Scroll to top</p>
        <IconArrow />
      </div>
    </div>
  </footer>
</template>

<script setup>
import menuItems from '~/data/menu.json';

const lenis = useNuxtApp().$lenis;

const scrollToTop = () => {
  lenis.lenis.scrollTo(0, {
    duration: 1,
    force: true,
  });
};
</script>

<style scoped lang="scss">
.footer {
  background-color: var.$color-primary;
  padding-top: fn.toVw(144);
  padding-bottom: fn.toVw(40);

  @include mx.mobile {
    padding-top: fn.toVw(120);
    padding-bottom: fn.toVw(30);
  }

  .container {
    display: grid;
    grid-template-columns: repeat(var.$grid-col, 1fr);
    column-gap: fn.toVw(var.$grid-gap);
    row-gap: fn.toVw(42);
    width: 100%;

    @include mx.mobile {
      gap: fn.toVw(var.$grid-gap-m);
      grid-template-columns: repeat(var.$grid-col-m, 1fr);
    }
  }

  .left {
    grid-column: 1/3;

    @include mx.mobile {
      grid-column: 1/-1;
    }

    .logo {
      margin-bottom: fn.toVw(70);

      @include mx.mobile {
        margin-bottom: fn.toVw(64);
      }

      &:deep(path) {
        fill: var.$color-text;
      }
    }
  }

  .contact {
    @include mx.mobile {
      display: grid;
      grid-template-columns: repeat(var.$grid-col-m, 1fr);
      gap: fn.toVw(var.$grid-gap-m);
      width: 100%;
      grid-column: 1/-1;
      margin-top: fn.toVw(63);
    }

    .contact-item {
      &:nth-child(1) {
        @include mx.mobile {
          grid-column: 1/3;
        }
      }

      &:nth-child(2) {
        @include mx.mobile {
          grid-column: 3/-1;
        }
      }

      &:not(:last-child) {
        margin-bottom: fn.toVw(40);

        @include mx.mobile {
          margin-bottom: 0;
        }
      }

      p {
        color: var.$color-text;
        opacity: 0.5;

        @include mx.mobile {
          font-size: fn.toVw(14);
        }
      }

      a {
        display: block;
        margin-top: fn.toVw(16);
      }
    }
  }

  .menu-page,
  .menu-page-2 {
    display: flex;
    flex-direction: column;
    gap: fn.toVw(25);
    white-space: nowrap;
  }

  .menu-page {
    grid-column: 6/8;

    @include mx.mobile {
      grid-column: 1/3;
    }
  }

  .menu-page-2 {
    grid-column: 9/-1;
    padding-left: fn.toVw(50);

    @include mx.mobile {
      grid-column: 3/-1;
      padding-left: 0;
      margin-left: fn.toVw(-10);
    }
  }

  .social {
    grid-column: 6/-1;

    @include mx.mobile {
      grid-column: 1/-1;
      margin-top: fn.toVw(48);
    }

    p {
      @include mx.mobile {
        font-size: fn.toVw(14);
        opacity: 0.5;
      }
    }

    .socmed-list {
      display: flex;
      gap: fn.toVw(48);
      margin-top: fn.toVw(48);

      @include mx.mobile {
        gap: fn.toVw(32);
        margin-top: fn.toVw(24);
      }

      svg {
        max-width: fn.toVw(28);
        max-height: fn.toVw(28);

        @include mx.mobile {
          max-width: fn.toVw(24);
          max-height: fn.toVw(24);
        }
      }
    }
  }

  .border-mobile {
    display: none;

    @include mx.mobile {
      width: 100%;
      display: block;
      margin-top: fn.toVw(115);
      margin-bottom: fn.toVw(30);
    }
  }

  .border,
  .border-mobile {
    opacity: 0.5;
  }

  .bottom {
    margin-top: fn.toVw(115);
    width: 100%;
    row-gap: 0;

    @include mx.mobile {
      margin-top: 0;
      row-gap: fn.toVw(16);
    }

    .border {
      grid-column: 1/-1;
      margin-bottom: fn.toVw(28);

      @include mx.mobile {
        display: none;
      }
    }

    .credit {
      grid-column: 1/3;

      @include mx.mobile {
        order: 2;
        grid-column: 1/-1;
      }
    }

    .copyright {
      grid-column: 6/10;

      @include mx.mobile {
        order: 1;
        grid-column: 1/-1;
      }
    }

    .scroll {
      grid-column: 11/-1;
      justify-self: flex-end;
      display: flex;
      align-items: center;
      gap: fn.toVw(16);
      cursor: pointer;

      @include mx.mobile {
        order: 3;
        justify-self: flex-start;
        gap: fn.toVw(12);
        grid-column: 1/-1;
      }

      &:hover {
        &:deep(svg) {
          transform: translateY(-3px) rotate(180deg);
        }
      }

      &:deep(svg) {
        width: fn.toVw(12);
        height: auto;
        transform: rotate(180deg);
        will-change: transform;
        transition: transform 0.3s var.$transition-ease;

        @include mx.mobile {
          width: fn.toVw(10);
        }

        path {
          fill: var.$color-text;
        }
      }
    }

    /* Phase 2 */
    /* .terms {
      grid-column: 6/10;

      @include mx.mobile {
        grid-column: 1/-1;
      }

      .spacer {
        margin-left: 0.5em;
        margin-right: 0.8em;
      }
    } */
  }
}
</style>
