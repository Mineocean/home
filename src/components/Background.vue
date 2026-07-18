<template>
  <div class="cover">
    <div class="bg-placeholder" />
    <img
      v-show="store.imgLoadStatus"
      :src="backgroundUrl"
      class="bg"
      alt="cover"
      @load="imgLoadComplete"
      @error.once="imgLoadError"
      @animationend="imgAnimationEnd"
    />
    <div class="overlay" />
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import { Error } from "@icon-park/vue-next";
import placeholders from "@/assets/placeholders.json";

const store = mainStore();
const backgroundUrl = ref(null);
const imgTimeout = ref(null);
const emit = defineEmits(["loadComplete"]);

const backgroundIndex = Math.floor(Math.random() * 10 + 1);
const bgKey = `background${backgroundIndex}`;
const placeholderData = placeholders[bgKey] || "";
const isWebP = ref(true);

const setBackgroundUrl = () => {
  const preloadLink = document.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "image";
  preloadLink.href = `/images/background${backgroundIndex}.webp`;
  preloadLink.type = "image/webp";
  document.head.appendChild(preloadLink);

  backgroundUrl.value = `/images/background${backgroundIndex}.webp`;
};

const imgLoadComplete = () => {
  imgTimeout.value = setTimeout(
    () => store.setImgLoadStatus(true),
    Math.floor(Math.random() * (600 - 300 + 1)) + 300,
  );
};

const imgAnimationEnd = () => {
  console.log("壁纸加载且动画完成");
  emit("loadComplete");
};

const imgLoadError = () => {
  if (isWebP.value) {
    console.warn("WebP 加载失败，回退到 JPG：", backgroundUrl.value);
    isWebP.value = false;
    backgroundUrl.value = `/images/background${backgroundIndex}.jpg`;
    return;
  }
  console.error("壁纸加载失败：", backgroundUrl.value);
  ElMessage({
    message: "壁纸加载失败",
    icon: h(Error, { theme: "filled", fill: "#888" }),
  });
};

onMounted(() => setBackgroundUrl());

onBeforeUnmount(() => clearTimeout(imgTimeout.value));
</script>

<style lang="scss" scoped>
.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  .bg-placeholder {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-image: v-bind("placeholderData ? `url('${placeholderData}')` : 'none'");
    filter: blur(40px) brightness(0.1);
    transform: scale(1.2);
  }

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    backface-visibility: hidden;
    filter: blur(20px) brightness(0.1);
    transition: opacity 0.8s ease;
    animation: fade-blur-in 0.8s ease forwards;
    animation-delay: 0.45s;
  }

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%),
      radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.4) 166%);
  }
}
</style>
