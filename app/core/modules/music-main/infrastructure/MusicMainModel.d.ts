export interface IArtist {
  id: number;
  name: string;
}

export interface IMusicTrackResponse {
  id: number;
  title: string;
  artistId: number;
  album: string;
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
