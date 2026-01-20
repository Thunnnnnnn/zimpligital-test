import { db } from "../../../db";
import { artist } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  try {
    return {
      data: await db
        .select()
        .from(artist)
        .where(eq(artist.id, Number(id))),
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
