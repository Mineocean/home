<template>
  <Transition name="fade">
    <div v-if="!store.imgLoadStatus" class="loading-screen">
      <div class="pulse-ring" />
      <div class="content">
        <span class="name">{{ siteName }}</span>
        <div class="dots">
          <span class="dot" />
          <span class="dot" />
          <span class="dot" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { mainStore } from "@/store";

const store = mainStore();
const siteName = import.meta.env.VITE_SITE_NAME;
</script>

<style lang="scss" scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.pulse-ring {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid #222;
  animation: pulse 2s ease-out infinite;

  &::after {
    content: "";
    position: absolute;
    inset: 30px;
    border-radius: 50%;
    border: 1px solid #333;
    animation: pulse 2s ease-out 0.5s infinite;
  }
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.name {
  font-size: 20px;
  color: #fff;
  letter-spacing: 4px;
}

.dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #555;
  animation: blink 1.4s ease-out infinite;

  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.4s; }
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes blink {
  0%, 80%, 100% { opacity: 0.2; }
  40% { opacity: 1; }
}

.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
