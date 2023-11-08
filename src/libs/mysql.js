import mysql from "serverless-mysql";
export const conn = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "propiedades_bd",
    timezone: "America/Lima",
  },
});
