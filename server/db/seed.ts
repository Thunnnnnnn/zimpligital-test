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
        albumImgUrl:
          "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
        musicUrl:
          "public/music/NewJeans (뉴진스) 'Hype Boy' Official MV (Performance ver.1).mp3",
      },
      {
        title: "Super Shy",
        artistId: artists[0].id,
        album: "Get Up",
        categoriesMusicId: category[0].id,
        albumImgUrl:
          "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
        musicUrl: "public/music/Super Shy.mp3",
      },
      {
        title: "Ditto",
        artistId: artists[0].id,
        album: "Ditto",
        categoriesMusicId: category[0].id,
        albumImgUrl:
          "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
        musicUrl:
          "public/music/NewJeans (뉴진스) 'Ditto' Performance Video.mp3",
      },
      {
        title: "Day One",
        artistId: artists[1].id,
        album: "PUN",
        categoriesMusicId: category[2].id,
        musicUrl: "public/music/PUN - DAY ONE.mp3",
        albumImgUrl:
          "https://yt3.googleusercontent.com/J4vWqp6OYweGv7Q8F0y0Wxp5JZhRjlMCFwb1WBnBcTs9vcZiBHoOGKffboBxuGluMX_ICuSwHw=s900-c-k-c0x00ffffff-no-rj",
      },
      {
        title: "Stay",
        artistId: artists[1].id,
        album: "PUN",
        categoriesMusicId: category[2].id,
        musicUrl: "public/music/PUN - STAY.mp3",
        albumImgUrl:
          "https://yt3.googleusercontent.com/J4vWqp6OYweGv7Q8F0y0Wxp5JZhRjlMCFwb1WBnBcTs9vcZiBHoOGKffboBxuGluMX_ICuSwHw=s900-c-k-c0x00ffffff-no-rj",
      },
      {
        title: "BF",
        artistId: artists[1].id,
        album: "PUN",
        categoriesMusicId: category[2].id,
        musicUrl: "public/music/PUN - BF (feat. URBOYTJ).mp3",
        albumImgUrl:
          "https://yt3.googleusercontent.com/J4vWqp6OYweGv7Q8F0y0Wxp5JZhRjlMCFwb1WBnBcTs9vcZiBHoOGKffboBxuGluMX_ICuSwHw=s900-c-k-c0x00ffffff-no-rj",
      },
      {
        title: "Stay With Me",
        artistId: artists[2].id,
        album: 'First Album "Pocket Park"',
        categoriesMusicId: category[1].id,
        musicUrl:
          "public/music/Miki Matsubara - Stay With Me HD (Club Mix).mp3",
        albumImgUrl:
          "https://i.scdn.co/image/ab67616d0000b27381052badd62d5e14c3377786",
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
