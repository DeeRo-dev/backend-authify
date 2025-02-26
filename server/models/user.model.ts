// models/user.model.ts
import client from "../db/connection.ts";

export const createUser = async (name: string, email:string, password: string) => {
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const result = await client.execute(query, [name, email, password]);
  return result;
};


export const findUserByUseremail = async (email: string) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const result = await client.query(query, [email]);
  return result[0];
};


export const getAllUsers = async () => {
    try {
      const query = "SELECT * FROM users";
      const result = await client.query(query);
      return result; // Devuelve solo los usuarios
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Error fetching users");
    }
  };
  