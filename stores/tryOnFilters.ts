import { defineStore } from "pinia";

interface Item {
  productId: number;
  image: string;
  useBleach: boolean;
}

export const useImageResultStore = defineStore("imageResult", {
  state: () => ({
    items: localStorage.getItem("imageResult")
      ? JSON.parse(localStorage.getItem("imageResult") as string)
      : ([] as Item[]),
  }),
  getters: {
    getItems(): Item[] {
      return this.items;
    },
    getLatestItem(): Item | null {
      return this.items.length > 0 ? this.items[this.items.length - 1] : null;
    },
  },
  actions: {
    setItems(items: Item[]) {
      this.items = items;
    },
    addItem(item: Item) {
      this.items.push(item);
    },
    reset() {
      this.items = [];
      localStorage.removeItem("imageResult");
    },
    actionGetLatestItem() {
      return this.items.length > 0 ? this.items[this.items.length - 1] : null;
    },
  },
});
