<template>
  <div class="social-links-module">
    <div class="module-inner">
      <!-- 社交图标 -->
      <div class="social-icons">
        <a
          v-for="(item, index) in socialLinks"
          :key="item.name"
          :href="item.url"
          target="_blank"
          :title="item.tip"
          class="social-icon"
          :style="{ animationDelay: `${index * 60}ms` }"
        >
          <img class="icon-img" :src="item.icon" height="20" />
        </a>
      </div>

      <!-- 分割线 -->
      <div class="divider" />

      <!-- 网站链接列表 -->
      <div class="site-links">
        <a
          v-for="(item, index) in siteLinks"
          :key="item.name"
          :href="item.link"
          target="_blank"
          class="site-link"
        >
          {{ item.name }}
          <span v-if="index < siteLinks.length - 1" class="dot">&nbsp;·&nbsp;</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import socialLinks from "@/assets/socialLinks.json";
import siteLinksRaw from "@/assets/siteLinks.json";

const siteLinks = computed(() => siteLinksRaw);
</script>

<style lang="scss" scoped>
.social-links-module {
  width: 100%;
  animation: fade 0.6s ease;

  .module-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: clamp(12px, 3vw, 24px);
    padding: 8px 0;

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 12px;

      .divider {
        width: 40px;
        height: 1px;
      }
    }
  }

  .social-icons {
    display: flex;
    align-items: center;
    gap: 16px;

    .social-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 160ms ease-out;
      animation: fade 0.5s ease both;

      &:active {
        transform: scale(0.9);
        transition: transform 100ms ease-out;
      }

      .icon-img {
        opacity: 0.5;
        transition: opacity 0.3s;
        filter: var(--text-primary-filter, none);

        @media (hover: hover) {
          &:hover {
            opacity: 0.9;
          }
        }
      }
    }
  }

  .divider {
    width: 1px;
    height: 24px;
    background: var(--divider);
    border-radius: 1px;
  }

  .site-links {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2px;

    .site-link {
      font-size: 0.88rem;
      color: var(--text-secondary);
      transition: color 0.3s, transform 160ms ease-out;
      white-space: nowrap;

      @media (hover: hover) {
        &:hover {
          color: var(--text-primary);
        }
      }

      &:active {
        transform: scale(0.97);
        transition: transform 100ms ease-out;
      }

      .dot {
        color: var(--text-muted);
        pointer-events: none;
      }

      &:last-child .dot {
        display: none;
      }
    }
  }
}
</style>
