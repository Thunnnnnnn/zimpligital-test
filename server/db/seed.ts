// seed.ts
import { db, pool } from "./";
import { artist, musicTracks, playlists, playlistTracks } from "./schema";

async function seed() {
  console.log("🌱 Start seeding...");

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  // 🧹 ล้างข้อมูลเก่า (เรียงลำดับให้ถูก FK)
  await db.delete(playlistTracks);
  await db.delete(playlists);
  await db.delete(musicTracks);
  await db.delete(artist);

  // 👤 Artists
  const [artist1] = await db
    .insert(artist)
    .values({
      name: "NewJeans",
    })
    .returning();

  // 🎵 Music Tracks
  const tracks = await db
    .insert(musicTracks)
    .values([
      {
        title: "Hype Boy",
        artistId: artist1.id,
        album: "New Jeans",
      },
      {
        title: "Super Shy",
        artistId: artist1.id,
        album: "Get Up",
      },
      {
        title: "Love Dive",
        artistId: artist1.id,
        album: "Love Dive",
      },
    ])
    .returning();

  // 📂 Playlist
  const [playlist] = await db
    .insert(playlists)
    .values({
      name: "My Favorite K-Pop",
      musicTracksId: tracks[0].id,
    })
    .returning();

  // 🔗 Playlist ↔ Tracks
  await db.insert(playlistTracks).values([
    {
      playlistId: playlist.id,
      musicTrackId: tracks[0].id,
    },
    {
      playlistId: playlist.id,
      musicTrackId: tracks[1].id,
    },
  ]);

  console.log("✅ Seeding completed!");
  await pool.end();
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  pool.end();
});
