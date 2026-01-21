import { db } from "../../../db";
import { categoriesMusic } from "../../../db/schema";

export default defineEventHandler(async (event) => {
  try {
    return {
      data: await db.select().from(categoriesMusic),
      code: event.node.res.statusCode,
      message: "success",
    };
  } catch (error) {
    console.error("Error fetching artists:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
