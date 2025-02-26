import { Context } from "hono";
import { createUser, findUserByUseremail } from "../models/user.model.ts";
import { hashPassword, verifyPassword } from "../utils/hash.ts";
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from "../utils/jwt.ts";

export const register = async (c: Context) => {
  const { name, email, password } = await c.req.json();
  try {
    const existingUser = await findUserByUseremail(email);
    if (existingUser) {
      return c.json({ message: "Email already in use" }, 400);
    }
    const hashedPassword = await hashPassword(password);
    await createUser(name, email, hashedPassword);
    return c.json({ message: "User registered successfully" }, 201);
  } catch (error) {
    return c.json({ message: `User not registered: ${error}` }, 401);
  }

};

export const login = async (c: Context) => {
  const { email, password } = await c.req.json();

  try {
    const emailUser = await findUserByUseremail(email);
    console.log(emailUser, "emailUser");
    if (!emailUser) {
      return c.json({ message: "Email incorrect" }, 401);
    }
    console.log(password, emailUser.password, "datos del email");

    if (!(await verifyPassword(password, emailUser.password))) {
      return c.json({ message: "Invalid credentials" }, 401);
    }
    // Genera tokens.
    const accessToken = await createAccessToken({
      userId: emailUser.id,
      username: emailUser.name,
    });
    const refreshToken = await createRefreshToken({ userId: emailUser.id });

    return c.json(
      { accessToken, refreshToken, message: "Login successful" },
      201,
    );
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ message: "Ups, something went wrong" }, 500);
  }
};

// Refresh token.
export async function refreshToken(refreshToken: string) {
  const payload = await verifyToken(refreshToken);

  if (!payload) {
    throw new Error("Refresh token inválido o expirado");
  }

  // Genera un nuevo access token.
  const accessToken = await createAccessToken({
    userId: payload.userId,
    username: payload.username,
  });

  return { accessToken };
}
