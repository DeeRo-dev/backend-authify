import { load } from "deno-env";
import { Client } from "mysql";

// Cargar variables desde el archivo .env
const env = await load();

const DB_USER = env["DB_USER"];
const DB_PASSWORD = env["DB_PASSWORD"];
const DB_NAME = env["DB_NAME"];
const HOST_NAME = env["HOST_NAME"];
const PORT = Number(env["PORT"]);

console.log(DB_USER, DB_PASSWORD, DB_NAME, HOST_NAME, PORT);

// Configuración de la conexión a MySQL
const client = await new Client().connect({
  hostname: HOST_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  db: DB_NAME,
  port: PORT,
});

export default client;
