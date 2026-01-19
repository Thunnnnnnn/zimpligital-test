import { db } from "../../../db";
import { artist } from "../../../db/schema";

export default defineEventHandler(async () => {
  return {
    data: await db.select().from(artist),
  };
});
