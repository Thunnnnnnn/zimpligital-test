import { db } from "../../../db";
import { musicTracks } from "../../../db/schema";

export default defineEventHandler(async () => {
  try {
    const tracks = await db.select().from(musicTracks);

    return {
      data: tracks,
      status: 200,
      
    };
  } catch (error) {
    console.error("Error fetching music tracks:", error);
  }
});
