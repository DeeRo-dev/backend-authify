// utils/jwt.ts
import { JWTPayload, jwtVerify, SignJWT } from "npm:jose";


// Clave secreta para firmar los tokens.
const secret = new TextEncoder().encode("tu_clave_secreta");

// Genera un JWT (access token).
export async function createAccessToken(payload: JWTPayload): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Algoritmo de firma.
    .setIssuedAt() // Fecha de emisión.
    .setExpirationTime("15m") // Expira en 15 minutos.
    .sign(secret); // Firma el token.

  return jwt;
}

// Genera un refresh token.
export async function createRefreshToken(payload: JWTPayload): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Expira en 7 días.
    .sign(secret);

  return jwt;
}

// Verifica un JWT.
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("Token inválido:", error);
    return null;
  }
}