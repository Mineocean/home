import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    ignores: [
      "node_modules",
      "dist",
      ".gitignore",
      "auto-imports.d.ts",
      "components.d.ts",
    ],
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.{js,jsx,cjs,mjs,ts,tsx,cts,mts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        defineProps: "readonly",
        defineEmits: "readonly",
        withDefaults: "readonly",
        h: "readonly",
        vue: "readonly",
        ref: "readonly",
        reactive: "readonly",
        computed: "readonly",
        watch: "readonly",
        provide: "readonly",
        inject: "readonly",
        defineComponent: "readonly",
        onBeforeMount: "readonly",
        onMounted: "readonly",
        onBeforeUnmount: "readonly",
        nextTick: "readonly",
        ElMessage: "readonly",
        $openList: "readonly",
      },
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
];
