import { db } from "../../../db";
import { musicTracks, artist } from "../../../db/schema";
import { eq } from "drizzle-orm";

import { createReadStream, statSync, existsSync } from "fs";
import { join } from "path";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!id) {
    throw createError({ statusCode: 400, message: "Invalid id" });
  }

  const result = await db
    .select()
    .from(musicTracks)
    .where(eq(musicTracks.id, id))
    .leftJoin(artist, eq(musicTracks.artistId, artist.id))
    .limit(1);

  if (!result.length) {
    throw createError({ statusCode: 404, message: "Music not found" });
  }

  const filePath = join(process.cwd(), result[0].music_tracks.musicUrl);

  if (!existsSync(filePath)) {
    throw createError({ statusCode: 404, message: "File not found" });
  }

  const stat = statSync(filePath);
  const range = getHeader(event, "range");

  if (range) {
    const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : stat.size - 1;

    setResponseStatus(event, 206);
    setHeader(event, "Content-Range", `bytes ${start}-${end}/${stat.size}`);
    setHeader(event, "Accept-Ranges", "bytes");
    setHeader(event, "Content-Length", end - start + 1);
    setHeader(event, "Content-Type", "audio/mpeg");

    return createReadStream(filePath, { start, end });
  }

  setHeader(event, "Content-Type", "audio/mpeg");
  setHeader(event, "Accept-Ranges", "bytes");
  setHeader(event, "Content-Length", stat.size);

  return createReadStream(filePath);
});
