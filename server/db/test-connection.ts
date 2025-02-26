// db/test-connection.ts
import client from "./connection.ts";

const testConnection = async () => {
  try {
    const result = await client.query("SELECT 1 + 1 AS result");
    console.log("Conexión exitosa:", result);
  } catch (error) {
    console.error("Error de conexión:", error);
  } finally {
    await client.close(); // Cierra la conexión después de la prueba
  }
};

testConnection();