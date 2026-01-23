import { defineStore } from "pinia";
import {
  getAllCategoriesMusic,
  getMusicTrackById,
  getAllMusicTracks,
} from "../infrastructure/MusicMainService";
import type {
  ICategoryMusic,
  IMusicTrackResponse,
} from "../infrastructure/MusicMainModel";

interface IState {
  badges: ICategoryMusic[];
  volume: number;
  musicId: number;
  musicTrack: IMusicTrackResponse;
  musicTracks: IMusicTrackResponse[];
  currentTime: number;
  seeking: boolean;
  duration: number;
}

export const useMusicMainStore = defineStore("music-main", {
  state: (): IState => ({
    badges: [],
    volume: 50,
    musicId: 14,
    musicTrack: {
      music_tracks: {
        id: 0,
        title: "",
        artistId: 0,
        categoriesMusicId: 0,
        album: "",
        musicUrl: "",
        albumImgUrl: "",
      },
      artist: {
        id: 0,
        name: "",
      },
    } as IMusicTrackResponse,
    currentTime: 0,
    seeking: false,
    duration: 0,
    musicTracks: [],
  }),
  actions: {
    async getAllCategoriesMusic() {
      const res = await getAllCategoriesMusic();

      if (res.status === 200) {
        this.badges = res.data.data;
      }
    },

    async getMusicTrackById(id: number) {
      const res = await getMusicTrackById(id);

      if (res.status === 200) {
        this.musicTrack = res.data.data;
      }
    },

    async getAllMusicTracks() {
      const res = await getAllMusicTracks();

      if (res.status === 200) {
        this.musicTracks = res.data.data;
      }
    },

    async getMusicTrackByBadgeId(id: number) {
      const res = await getAllMusicTracks(id);
      if (res.status === 200) {
        this.musicTracks = res.data.data;
      }
    },
  },
});
