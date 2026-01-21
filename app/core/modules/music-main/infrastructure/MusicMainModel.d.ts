export interface IArtist {
  id: number;
  name: string;
}

export interface IMusicTrackResponse {
  music_tracks: IMusicTrack;
  artist: IArtist;
}

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
}

export interface IPlaylistTrack {
  id: number;
  playlistId: number;
  musicTrackId: number;
}

export interface ICategoryMusic {
  id: number;
  name: string;
}
