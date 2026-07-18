/**
 * 防抖函数 - 延迟执行，高频触发时只执行最后一次
 * @param {Function} fn 目标函数
 * @param {number} delay 延迟毫秒数，默认 300
 * @returns {Function} 防抖后的函数
 */
export default function debounce(fn, delay = 300) {
  let timer = null;

  return function (...args) {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
