import { db } from "../../../db";
import { playlists, musicTracks } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    return {
      data: await db
        .select()
        .from(playlists)
        .leftJoin(musicTracks, eq(playlists.id, playlists.musicTracksId)),
      code: event.node.res.statusCode,
      message: "success",
    };
  } catch (error) {
    console.error("Error fetching music tracks:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
