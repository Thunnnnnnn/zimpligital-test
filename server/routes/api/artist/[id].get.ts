import { db } from "../../../db";
import { artist } from "../../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  try {
    const result = await db
      .select()
      .from(artist)
      .where(eq(artist.id, Number(id)))
      .limit(1);

    if (result.length === 0) {
      event.node.res.statusCode = 404;
      return {
        data: null,
        code: 404,
        message: "Artist not found",
      };
    }

    return {
      data: result[0],
      code: 200,
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
