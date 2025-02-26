import { Hono } from "hono";
import { getAllUsers } from "../models/user.model.ts";
import { authMiddleware } from "../utils/authMiddleware.ts";


const users = new Hono();

users.get("/users", authMiddleware,  async (c) => {
    try {
      const users = await getAllUsers();
      console.log("Users retrieved:", users); // 👀 Log para depuración
      return c.json(users);
    } catch (error) {
      return c.json({ error: `Error fetching users ${error}` }, 500);
    }
  });

  
export default users;