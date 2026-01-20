import { db } from "../../../db";
import { playlistTracks, playlists, musicTracks } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  try {
    return {
      data: await db
        .select()
        .from(playlistTracks)
        .where(eq(playlists.id, Number(id)))
        .leftJoin(playlists, eq(playlistTracks.playlistId, playlists.id))
        .rightJoin(
          musicTracks,
          eq(playlistTracks.musicTrackId, musicTracks.id),
        ),
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
