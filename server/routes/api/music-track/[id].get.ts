import { db } from "../../../db";
import { musicTracks, artist } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  try {
    return {
      data: await db
        .select()
        .from(musicTracks)
        .where(eq(musicTracks.id, Number(id)))
        .leftJoin(artist, eq(musicTracks.artistId, artist.id)),
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
