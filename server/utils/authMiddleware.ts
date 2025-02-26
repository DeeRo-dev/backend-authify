import { verifyToken } from "../utils/jwt.ts";
import { Context, Next } from "hono";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const token = authHeader.replace("Bearer ", "");
  const payload = await verifyToken(token);

  if (!payload) {
    return c.json({ message: "Invalid or expired token" }, 401);
  }

  c.set("user", payload);
  await next();
};
