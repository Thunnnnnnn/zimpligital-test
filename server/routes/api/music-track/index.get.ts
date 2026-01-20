import { db } from "../../../db";
import { musicTracks, artist } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    return {
      data: await db
        .select()
        .from(musicTracks)
        .leftJoin(artist, eq(musicTracks.artistId, artist.id)),
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
