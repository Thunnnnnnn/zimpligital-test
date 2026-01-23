export interface IMusicTrack {
  id: number;
  title: string;
  artistId: number;
  categoriesMusicId: number;
  album: string;
  musicUrl: string;
  albumImgUrl: string;
}

export interface IPlaylist {
  id: number;
  name: string;
  musicTracksId: number;
  musicTracks: IMusicTrack;
}
