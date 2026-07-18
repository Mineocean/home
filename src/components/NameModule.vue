<template>
  <div class="name-module">
    <!-- 头像 + 分割线 + 时钟 -->
    <div class="header-row">
      <img class="avatar" :src="siteLogo" alt="logo" />
      <div class="divider" />
      <div class="clock-area">
        <div class="clock-date">{{ currentTime.year }}年{{ currentTime.month }}月{{ currentTime.day }}日 {{ currentTime.weekday }}</div>
        <div class="clock-time">{{ currentTime.hour }}:{{ currentTime.minute }}:{{ currentTime.second }}</div>
      </div>
    </div>

    <!-- 名称 -->
    <div class="name-wrapper">
      <span class="name">{{ displayName }}</span>
      <span class="cursor" :class="{ blink: isTyping }">|</span>
    </div>

    <!-- 一言 -->
    <div class="hitokoto-line" @click="updateHitokoto">
      <Transition name="quote-fade" mode="out-in">
        <span :key="hitokotoData.text" class="quote-text">{{ hitokotoData.text }}</span>
      </Transition>
      <span class="quote-from">—— {{ hitokotoData.from }}</span>
    </div>
  </div>
</template>

<script setup>
import { Error } from "@icon-park/vue-next";
import { getHitokoto } from "@/api";
import { getCurrentTime } from "@/utils/getTime";

const siteLogo = import.meta.env.VITE_SITE_MAIN_LOGO;
const siteName = import.meta.env.VITE_SITE_NAME || "清海の主页";

// 时钟
const currentTime = ref({});
let clockTimer;

// 打字机效果
const displayName = ref("");
const isTyping = ref(true);
const fullName = siteName;

const typeWriter = () => {
  let i = 0;
  displayName.value = "";
  isTyping.value = true;
  const timer = setInterval(() => {
    if (i < fullName.length) {
      displayName.value += fullName.charAt(i);
      i++;
    } else {
      isTyping.value = false;
      clearInterval(timer);
    }
  }, 120);
};

// 一言
const hitokotoData = reactive({
  text: "这里应该显示一句话",
  from: "清海",
});

const getHitokotoData = async () => {
  try {
    const result = await getHitokoto();
    hitokotoData.text = result.hitokoto;
    hitokotoData.from = result.from;
  } catch {
    ElMessage({
      message: "一言获取失败",
      icon: h(Error, { theme: "filled", fill: "#888" }),
    });
    hitokotoData.text = "这里应该显示一句话";
    hitokotoData.from = "清海";
  }
};

let debounceTimer;
const updateHitokoto = () => {
  if (debounceTimer) return;
  debounceTimer = setTimeout(() => {
    getHitokotoData();
    debounceTimer = null;
    typeWriter();
  }, 500);
};

onMounted(() => {
  currentTime.value = getCurrentTime();
  clockTimer = setInterval(() => { currentTime.value = getCurrentTime(); }, 1000);
  typeWriter();
  getHitokotoData();
});

onBeforeUnmount(() => {
  clearInterval(clockTimer);
});
</script>

<style lang="scss" scoped>
.name-module {
  text-align: center;
  animation: fade 0.6s ease;

  .header-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(16px, 3vw, 28px);
    margin-bottom: clamp(16px, 3vh, 28px);

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 12px;
    }
  }

  .avatar {
    width: clamp(80px, 12vw, 110px);
    height: clamp(80px, 12vw, 110px);
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--border-color);
    transition: border-color 0.3s;
    flex-shrink: 0;
  }

  .divider {
    width: 1px;
    height: clamp(60px, 10vw, 80px);
    background: var(--divider);
    border-radius: 1px;

    @media (max-width: 480px) {
      width: 40px;
      height: 1px;
    }
  }

  .clock-area {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (max-width: 480px) {
      align-items: center;
    }

    .clock-date {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .clock-time {
      font-size: clamp(1.4rem, 2.5vw, 1.9rem);
      font-family: "LXGW ZhenKai";
      letter-spacing: 2px;
    }
  }

  .name-wrapper {
    font-family: "LXGW ZhenKai";
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: clamp(8px, 1.5vh, 16px);

    .name {
      font-size: clamp(1.8rem, 5vw, 3.2rem);
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #fff;
    }

    .cursor {
      font-size: clamp(1.6rem, 4.5vw, 2.8rem);
      color: var(--text-primary);
      opacity: 0.6;
      font-weight: 300;
      margin-left: 2px;

      &.blink {
        animation: blink 0.8s step-end infinite;
      }
    }
  }

  .hitokoto-line {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    transition: background 0.3s, transform 160ms ease-out;

    @media (hover: hover) {
      &:hover {
        background: var(--hover-bg);
      }
    }

    &:active {
      transform: scale(0.97);
      transition: transform 100ms ease-out;
    }

    .quote-text {
      font-size: clamp(0.8rem, 1.8vw, 0.95rem);
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 600px;
    }

    .quote-from {
      font-size: 0.8rem;
      color: var(--text-muted);
      opacity: 0.7;
    }
  }
}

@keyframes blink {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0; }
}

.quote-fade-enter-active,
.quote-fade-leave-active {
  transition: opacity 0.25s ease;
}

.quote-fade-enter-from,
.quote-fade-leave-to {
  opacity: 0;
}
</style>
