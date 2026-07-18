/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import viteCompression from "vite-plugin-compression";

const defaultEnv = {
  VITE_SITE_NAME: "清海の主页",
  VITE_SITE_AUTHOR: "清海",
  VITE_SITE_KEYWORDS: "清海,个人主页",
  VITE_SITE_DES: "一个默默无闻的主页",
  VITE_SITE_URL: "misakaoi.top",
  VITE_SITE_LOGO: "/images/icon/favicon.ico",
  VITE_SITE_MAIN_LOGO: "/images/icon/logo.png",
  VITE_SITE_START: "2020-10-24",
  VITE_SITE_ICP: "豫ICP备2022018134号-1",
};

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = {
    ...defaultEnv,
    ...loadEnv(mode, process.cwd(), ""),
  };

  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue"],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      {
        name: "html-env-defaults",
        transformIndexHtml: (html) =>
          Object.entries(env).reduce(
            (acc, [key, value]) => acc.replaceAll(`%${key}%`, value ?? ""),
            html
          ),
      },
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          skipWaiting: true,
          clientsClaim: true,
          runtimeCaching: [
            {
              urlPattern: /(.*?)\.(js|css|woff2|woff|ttf)/,
              handler: "CacheFirst",
              options: {
                cacheName: "js-css-cache",
              },
            },
            {
              urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps|webp)/,
              handler: "CacheFirst",
              options: {
                cacheName: "image-cache",
              },
            },
          ],
        },
        manifest: {
          name: env.VITE_SITE_NAME,
          short_name: env.VITE_SITE_NAME,
          description: env.VITE_SITE_DES,
          display: "standalone",
          start_url: "/",
          theme_color: "#000000",
          background_color: "#000000",
          icons: [
            { src: "/images/icon/48.png", sizes: "48x48", type: "image/png" },
            { src: "/images/icon/72.png", sizes: "72x72", type: "image/png" },
            { src: "/images/icon/96.png", sizes: "96x96", type: "image/png" },
            { src: "/images/icon/128.png", sizes: "128x128", type: "image/png" },
            { src: "/images/icon/144.png", sizes: "144x144", type: "image/png" },
            { src: "/images/icon/192.png", sizes: "192x192", type: "image/png" },
            { src: "/images/icon/512.png", sizes: "512x512", type: "image/png" },
          ],
        },
      }),
      viteCompression(),
    ],
    server: {
      port: "3000",
      open: true,
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: `@use "@/style/global.scss" as *;`,
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          pure_funcs: ["console.log"],
        },
      },
    },
  });
};
