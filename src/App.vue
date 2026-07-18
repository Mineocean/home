<template>
  <Loading />
  <Background @loadComplete="loadComplete" />
  <Transition name="fade" mode="out-in">
    <main id="main" v-if="store.imgLoadStatus">
      <div class="container">
        <!-- 名称 + 一言 -->
        <NameModule />

        <!-- 社交链接 + 分割线 + 网站链接 -->
        <SocialLinksModule />

        <!-- 脚注（始终显示） -->
        <Footer />
      </div>
    </main>
  </Transition>
</template>

<script setup>
import { helloInit, checkDays } from "@/utils/getTime.js";
import { mainStore } from "@/store";
import Loading from "@/components/Loading.vue";
import Background from "@/components/Background.vue";
import Footer from "@/components/Footer.vue";
import NameModule from "@/components/NameModule.vue";
import SocialLinksModule from "@/components/SocialLinksModule.vue";
import config from "@/../package.json";

const store = mainStore();

const getWidth = () => {
  store.setInnerWidth(window.innerWidth);
};

const loadComplete = () => {
  nextTick(() => {
    helloInit();
    checkDays();
  });
};

onMounted(() => {
  document.oncontextmenu = () => {
    ElMessage({
      message: "为了浏览体验，本站禁用右键",
      grouping: true,
      duration: 2000,
    });
    return false;
  };

  getWidth();
  window.addEventListener("resize", getWidth);

  const styleTitle1 = "font-size: 20px;font-weight: 600;color: rgb(244,167,89);";
  const styleTitle2 = "font-size:12px;color: rgb(244,167,89);";
  const styleContent = "color: rgb(30,152,255);";
  const title1 = "清海の主页";
  const title2 = "";
  const content = `\n\n版本: ${config.version}\n主页: ${config.home}\nGithub: ${config.github}`;
  console.info(`%c${title1} %c${title2} %c${content}`, styleTitle1, styleTitle2, styleContent);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", getWidth);
});
</script>

<style lang="scss" scoped>
#main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: fade 0.6s ease forwards;

  .container {
    width: 100%;
    max-width: 960px;
    height: 100vh;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: clamp(16px, 3vh, 32px);
    position: relative;

    @media (max-width: 768px) {
      padding: 0 16px;
      gap: clamp(12px, 2vh, 20px);
    }
  }
}
</style>
