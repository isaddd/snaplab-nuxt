import { defineStore } from "pinia";

interface Spg {
  id: number;
  name: string;
  spg_id: string;
}

interface Store {
  id: number;
  name: string;
}

export const useSpgStore = defineStore("spg", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    spg: localStorage.getItem("spg")
      ? JSON.parse(localStorage.getItem("spg")!)
      : ({} as Spg),
    store: localStorage.getItem("store")
      ? JSON.parse(localStorage.getItem("store")!)
      : ({} as Store),
    isNewLogin: false,
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getSpg(): Spg {
      return this.spg;
    },
    getStore(): Store {
      return this.store;
    },
    getIsNewLogin(): boolean {
      return this.isNewLogin;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setSpg(spg: Spg) {
      this.spg = spg;
    },
    setStore(store: Store) {
      this.store = store;
    },
    reset() {
      this.token = "";
      this.spg = {} as Spg;
      this.store = {} as Store;
      localStorage.removeItem("token");
      localStorage.removeItem("spg");
      localStorage.removeItem("store");
    },
    isAuthenticated() {
      return this.token !== "";
    },
    setIsNewLogin(isNewLogin: boolean) {
      this.isNewLogin = isNewLogin;
    },
  },
});
