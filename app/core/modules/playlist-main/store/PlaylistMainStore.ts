import type { IPlaylist } from "../infrastructure/PlaylistMainModel";
import {
  getAllPlaylists,
  deletePlaylistById,
  getMusicPlaylistById,
  postMusicPlaylist,
} from "../infrastructure/PlaylistMainService";
import { useMusicMainStore } from "../../music-main/store/musicMainStore";

interface IState {
  playlists: IPlaylist[];
}

export const usePlaylistMainStore = defineStore("playlists-main", {
  state: (): IState => ({
    playlists: [],
  }),
  actions: {
    async getAllPlaylists() {
      const res = await getAllPlaylists();
      if (res.status === 200) {
        this.playlists = res.data.data;
      }
    },

    async deletePlaylist(id: number) {
      const res = await deletePlaylistById(id);
      if (res.status === 200) {
        await this.getAllPlaylists();
      }

      return res;
    },

    async getMusicPlaylistById(id: number) {
      const res = await getMusicPlaylistById(id);
      const musicMainStore = useMusicMainStore();
      if (res.status === 200) {
        musicMainStore.musicTracks = res.data.data.map((item: any) => ({
          music_tracks: item.music_tracks,
          artist: item.artist,
        }));

        if (musicMainStore.musicTracks.length > 0) {
          if (
            musicMainStore.musicId ===
            musicMainStore.musicTracks[0]!.music_tracks.id
          ) {
            musicMainStore.musicId = 0;
          }
          setTimeout(() => {
            musicMainStore.musicId =
              musicMainStore.musicTracks[0]!.music_tracks.id;

            musicMainStore.musicTrack = musicMainStore.musicTracks[0]!;
          }, 100);
        }
      }

      return res;
    },

    async postPlaylist(playListName: string) {
      const res = await postMusicPlaylist(playListName);

      if (res.status === 200) {
        await this.getAllPlaylists();
      }

      return res;
    },

    async getAllMusicTracks() {},
  },
  getters: {},
});
