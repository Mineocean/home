import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => ({
    imgLoadStatus: false,
    innerWidth: null,
    coverType: "0",
  }),
  getters: {
    getInnerWidth(state) {
      return state.innerWidth;
    },
  },
  actions: {
    setInnerWidth(value) {
      this.innerWidth = value;
    },
    setImgLoadStatus(value) {
      this.imgLoadStatus = value;
    },
  },
  persist: {
    key: "data",
    storage: window.localStorage,
    paths: ["coverType"],
  },
});
