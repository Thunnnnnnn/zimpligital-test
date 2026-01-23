import { db } from "../../../db";
import { musicTracks, artist } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    let data: any = null;

    if (query.categoriesMusicId) {
      data = await db
        .select()
        .from(musicTracks)
        .leftJoin(artist, eq(musicTracks.artistId, artist.id))
        .where(
          query.categoriesMusicId
            ? eq(musicTracks.categoriesMusicId, Number(query.categoriesMusicId))
            : undefined,
        );
    } else {
      data = await db
        .select()
        .from(musicTracks)
        .leftJoin(artist, eq(musicTracks.artistId, artist.id));
    }
    return {
      data: data,
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
