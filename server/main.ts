import { Hono } from "hono";
// main.ts
import authRoutes from "./routes/auth.routes.ts";
import users from "./routes/users.routes.ts"

const app = new Hono();
app.get("/", (c) => c.text("¡Hola, mundo!"));
app.route("/auth", authRoutes);
app.route("/", users);

Deno.serve({ port: 3000 }, app.fetch);