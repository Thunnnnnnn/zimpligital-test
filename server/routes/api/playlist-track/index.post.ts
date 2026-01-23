import { db } from "../../../db";
import { playlistTracks } from "../../../db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await db.insert(playlistTracks).values({ ...body });

  try {
    return {
      data: null,
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
