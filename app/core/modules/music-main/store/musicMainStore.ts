import { defineStore } from "pinia";

interface IState {

}

export const useMusicMainStore = defineStore("music-main", {
  state: (): IState => ({}),
  actions: {
    async getArtists() {
    },
  },
  getters: {},
});
