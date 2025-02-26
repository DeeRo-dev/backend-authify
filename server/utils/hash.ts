
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  console.log(password, hash, 'datos de la contraseña')
  const hashedPassword = await hashPassword(password);
  return hashedPassword === hash;
};
