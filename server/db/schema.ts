import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const artist = pgTable("artist", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name"),
});

export const musicTracks = pgTable("music_tracks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  artistId: integer("artistId").references(() => artist.id),
  categoriesMusicId: integer("categories_music_id").references(
    () => categoriesMusic.id,
  ),
  album: text("album"),
  musicUrl: text("music_url").notNull().default(""),
  albumImgUrl: text("album_img_url").notNull().default(""),
});

export const playlists = pgTable("playlists", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  // musicTracksId: integer("music_tracks_id").references(() => musicTracks.id),
});

export const playlistTracks = pgTable("playlist_tracks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  playlistId: integer("playlist_id").references(() => playlists.id),
  musicTrackId: integer("music_track_id").references(() => musicTracks.id),
});

export const categoriesMusic = pgTable("catagories_music", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
});
