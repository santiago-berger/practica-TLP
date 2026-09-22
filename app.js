// se importa express, el framework que permite crear el servidor y manejar rutas HTTP
import express from "express";
// se importa la funcion que conecta y sincroniza la base de datos
import { startDB } from "./src/config/database.js";
// se importan los routers, cada uno agrupa las rutas de una entidad
import { userRouter } from "./src/routes/user.routes.js";
import { taskRouter } from "./src/routes/task.routes.js";
import { personRouter } from "./src/routes/person.routes.js";

// se crea la instancia de la aplicacion de express (el servidor)
const app = express();
// puerto en el que va a escuchar el servidor
const PORT = 3000;

// para que entienda el formato json

// middleware global: parsea el body de las peticiones con Content-Type json y lo deja en req.body
app.use(express.json());

// configuracion de las rutas

// se monta cada router bajo el prefijo /api, por ej: POST /api/users
app.use("/api", userRouter);
app.use("/api", taskRouter);
app.use("/api", personRouter);

// levanta el servidor y queda escuchando peticiones en el puerto indicado
app.listen(PORT, async () => {
    // antes de atender peticiones se espera a que la conexion a la db este lista
    await startDB();
    console.log(`Servidor corriendo en el puerto ${PORT}`); 
});
