import { h } from "vue";
import { SpaCandle } from "@icon-park/vue-next";

// 时钟
export const getCurrentTime = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month =
    currentDate.getMonth() + 1 < 10 ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
  const day = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
  const hour = currentDate.getHours() < 10 ? "0" + currentDate.getHours() : currentDate.getHours();
  const minute =
    currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes();
  const second =
    currentDate.getSeconds() < 10 ? "0" + currentDate.getSeconds() : currentDate.getSeconds();
  const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  let currentTime = {
    year,
    month,
    day,
    hour,
    minute,
    second,
    weekday: weekdays[currentDate.getDay()],
  };
  return currentTime;
};

// 欢迎提示
export const helloInit = () => {
  const hour = new Date().getHours();
  let hello = null;
  if (hour < 6) {
    hello = "凌晨好";
  } else if (hour < 9) {
    hello = "早上好";
  } else if (hour < 12) {
    hello = "上午好";
  } else if (hour < 14) {
    hello = "中午好";
  } else if (hour < 17) {
    hello = "下午好";
  } else if (hour < 19) {
    hello = "傍晚好";
  } else if (hour < 22) {
    hello = "晚上好";
  } else {
    hello = "夜深了";
  }
  ElMessage({
    message: h("span", [h("strong", hello), " 欢迎来到我的主页"]),
  });
};

// 默哀模式
const anniversaries = {
  4.4: "清明节",
  5.12: "汶川大地震纪念日",
  7.7: "中国人民抗日战争纪念日",
  9.18: "九·一八事变纪念日",
  12.13: "南京大屠杀死难者国家公祭日",
};
export const checkDays = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const dayOfMonth = currentDate.getDate();
  const key = `${month}.${dayOfMonth}`;
  if (Object.prototype.hasOwnProperty.call(anniversaries, key)) {
    console.log(`今天是${anniversaries[key]}`);
    const gray = document.createElement("style");
    gray.innerHTML = "html{filter: grayscale(100%)}";
    document.head.appendChild(gray);
    ElMessage({
      message: `今天是${anniversaries[key]}`,
      duration: 14000,
      icon: h(SpaCandle, { theme: "filled", fill: "#efefef" }),
    });
  }
};
