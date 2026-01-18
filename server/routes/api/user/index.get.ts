import { db } from "../../../db";
import { users } from "../../../db/schema";

export default defineEventHandler(async () => {
  return {
    data: await db.select().from(users),
  };
});
