import { defineStore } from "pinia";
import { getAllCategoriesMusic } from "../infrastructure/MusicMainService";
import type { ICategoryMusic } from "../infrastructure/MusicMainModel";

interface IState {
  badges: ICategoryMusic[];
}

export const useMusicMainStore = defineStore("music-main", {
  state: (): IState => ({
    badges: [],
  }),
  actions: {
    async getAllCategoriesMusic() {
      const res = await getAllCategoriesMusic();

      if (res.status === 200) {
        this.badges = res.data.data;
      }
    },
  },
  getters: {},
});
