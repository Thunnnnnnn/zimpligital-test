import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const artist = pgTable("artist", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const musicTracks = pgTable("music_tracks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artistId: serial("artistId").references(() => artist.id),
  album: text("album"),
});

export const playlists = pgTable("playlists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  musicTracksId: serial("music_tracks_id").references(() => musicTracks.id),
});

export const playlistTracks = pgTable("playlist_tracks", {
  id: serial("id").primaryKey(),
  playlistId: serial("playlist_id").references(() => playlists.id),
  musicTrackId: serial("music_track_id").references(() => musicTracks.id),
});
