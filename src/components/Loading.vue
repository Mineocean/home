<template>
  <div id="loader-wrapper" :class="store.imgLoadStatus ? 'loaded' : null">
    <div class="loader">
      <div class="loader-circle" />
      <div class="loader-text">
        <span class="name">
          {{ siteName }}
        </span>
        <span class="tip"> 加载中 </span>
      </div>
    </div>
    <div class="loader-section section-left" />
    <div class="loader-section section-right" />
  </div>
</template>

<script setup>
import { mainStore } from "@/store";

const store = mainStore();

const siteName = import.meta.env.VITE_SITE_NAME;
</script>

<style lang="scss" scoped>
#loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: hidden;
  .loader {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    .loader-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 2px solid #222;
      border-top-color: #fff;
      animation: spin 1.5s linear infinite;

      &:before {
        content: "";
        position: absolute;
        top: 4px;
        left: 4px;
        right: 4px;
        bottom: 4px;
        border-radius: 50%;
        border: 2px solid transparent;
        border-top-color: #555;
        animation: spin-reverse 0.5s linear infinite;
      }

      &:after {
        content: "";
        position: absolute;
        top: 12px;
        left: 12px;
        right: 12px;
        bottom: 12px;
        border-radius: 50%;
        border: 2px solid transparent;
        border-top-color: #888;
        animation: spin 0.8s linear infinite;
      }
    }
    .loader-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      margin-top: 36px;
      font-size: 22px;
      .tip {
        margin-top: 6px;
        font-size: 14px;
        opacity: 0.4;
        letter-spacing: 2px;
      }
    }
  }
  .loader-section {
    position: fixed;
    top: 0;
    width: 51%;
    height: 100%;
    background: #000;
    z-index: 1;
    &.section-left {
      left: 0;
    }
    &.section-right {
      right: 0;
    }
  }
  &.loaded {
    visibility: hidden;
    transform: translateY(-100%);
    transition:
      transform 0.3s 1s ease-out,
      visibility 0.3s 1s ease-out;
    .loader {
      .loader-circle,
      .loader-text {
        opacity: 0;
        transition: opacity 0.3s ease-out;
      }
    }
    .loader-section {
      &.section-left {
        transform: translateX(-100%);
        transition: transform 0.5s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      &.section-right {
        transform: translateX(100%);
        transition: transform 0.5s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}
</style>
