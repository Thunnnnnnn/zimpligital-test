// seed.ts
import { db, pool } from "./";
import {
  artist,
  categoriesMusic,
  musicTracks,
  playlists,
  playlistTracks,
} from "./schema";

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
  await db.delete(categoriesMusic);

  // 👤 Artists
  const artists = await db
    .insert(artist)
    .values([
      {
        name: "NewJeans",
      },
      {
        name: "PUN",
      },
      {
        name: "Miki Matsubara",
      },
    ])
    .returning();
  // 📂 Categories Music
  const category = await db
    .insert(categoriesMusic)
    .values([
      {
        name: "K-POP",
      },
      {
        name: "J-POP",
      },
      {
        name: "T-POP",
      },
    ])
    .returning();

  // 🎵 Music Tracks
  const tracks = await db
    .insert(musicTracks)
    .values([
      {
        title: "Hype Boy",
        artistId: artists[0].id,
        album: "New Jeans",
        categoriesMusicId: category[0].id,
      },
      {
        title: "Super Shy",
        artistId: artists[0].id,
        album: "Get Up",
        categoriesMusicId: category[0].id,
      },
      {
        title: "Love Dive",
        artistId: artists[0].id,
        album: "Love Dive",
        categoriesMusicId: category[0].id,
      },
      {
        title: "Day One",
        artistId: artists[1].id,
        album: "PUN",
        categoriesMusicId: category[2].id,
      },
      {
        title: "Stay",
        artistId: artists[1].id,
        album: "PUN",
        categoriesMusicId: category[2].id,
      },
      {
        title: "Stay With Me",
        artistId: artists[2].id,
        album: 'First Album "Pocket Park"',
        categoriesMusicId: category[1].id,
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
