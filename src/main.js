import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import "@/style/style.scss";

function bootstrap() {
  const app = createApp(App);

  const pinia = createPinia();
  app.use(pinia);

  app.mount("#app");

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      ElMessage("站点已更新，刷新后生效");
    });
  }
}

bootstrap();
