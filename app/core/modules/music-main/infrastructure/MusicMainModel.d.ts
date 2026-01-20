export interface IArtist {
  id: Number;
  name: String;
}

export interface IMusicTrackResponse {
  id: Number;
  title: String;
  artistId: Number;
  album: String;
}

export interface IPlaylist {
  id: Number;
  name: String;
  musicTracksId: Number;
}

export interface IPlaylistTrack {
  id: Number;
  playlistId: Number;
  musicTrackId: Number;
}
