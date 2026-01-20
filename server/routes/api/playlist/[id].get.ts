import { db } from "../../../db";
import { playlists, musicTracks } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  try {
    return {
      data: await db
        .select()
        .from(playlists)
        .where(eq(playlists.id, Number(id)))
        .leftJoin(musicTracks, eq(playlists.id, playlists.musicTracksId)),
      code: event.node.res.statusCode,
      message: "success",
    };
  } catch (error) {
    console.error("Error fetching music track by ID:", error);
    return {
      data: null,
      code: 500,
      message: "Internal Server Error",
    };
  }
});
