// Sequelize es el ORM que traduce objetos de JS a consultas SQL
import { Sequelize } from "sequelize";

// conexion a la base de datos
// parametros (nombre de la base, usuario, contraseña, opciones)
export const sequelize = new Sequelize("bd_practica", "root", "", {
  host: "localhost", // donde esta corriendo el motor de la base de datos
  dialect: "mysql",  // tipo de base de datos que se usa (define el driver mysql2)
  logging: false,    // en true mostraria por consola cada consulta SQL que ejecuta
});

// testear la conexion
export const startDB = async () => {
  try {
    // authenticate() intenta conectarse: si las credenciales o el host estan mal, lanza error
    await sequelize.authenticate();
    // sync() crea las tablas a partir de los modelos definidos
    // force: true borra y vuelve a crear las tablas en cada arranque
    await sequelize.sync({ force: true });
    console.log("Conexion a la db esta lista");
  } catch (error) {
    // si algo falla no se corta la app, solo se informa el error por consola
    console.error("No se pudo conectar a la db:", error);
  }
};
