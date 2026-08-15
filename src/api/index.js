// 获取一言数据
const HITOKOTO_URL = "https://v1.hitokoto.cn";
const HITOKOTO_TIMEOUT = 5000;

export const getHitokoto = async () => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HITOKOTO_TIMEOUT);

  try {
    const res = await fetch(HITOKOTO_URL, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`一言接口响应异常：${res.status}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
};
