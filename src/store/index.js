import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => ({
    imgLoadStatus: false,
  }),
  actions: {
    setImgLoadStatus(value) {
      this.imgLoadStatus = value;
    },
  },
});
