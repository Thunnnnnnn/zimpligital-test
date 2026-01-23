import { db } from "../../../db";
import { playlists, musicTracks } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const [id] = await db
    .insert(playlists)
    .values({ ...body })
    .returning({ id: playlists.id });

  try {
    return {
      data: id,
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
