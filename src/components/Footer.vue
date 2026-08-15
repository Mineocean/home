<template>
  <footer id="footer">
    <div class="footer-content">
      <span>
        &copy; {{ fullYear }} {{ siteAuthor }}
      </span>
      <span v-if="siteIcp">
        &nbsp;|&nbsp;
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">{{ siteIcp }}</a>
      </span>
      <span class="made-by">&nbsp;|&nbsp;Made by
        <a :href="config.github" target="_blank" rel="noopener noreferrer">{{ config.author }}</a>
      </span>
    </div>
  </footer>
</template>

<script setup>
import config from "@/../package.json";

const fullYear = new Date().getFullYear();
const siteIcp = ref(import.meta.env.VITE_SITE_ICP);
const siteAuthor = ref(import.meta.env.VITE_SITE_AUTHOR);
</script>

<style lang="scss" scoped>
#footer {
  width: 100%;
  text-align: center;
  padding: 8px 0;
  animation: fade 0.4s ease;

  .footer-content {
    font-size: 0.8rem;
    color: var(--text-muted);

    a {
      color: var(--text-muted);
      &:hover { color: var(--text-secondary); }
    }

    @media (max-width: 480px) {
      font-size: 0.7rem;
      .made-by { display: none; }
    }
  }
}
</style>
