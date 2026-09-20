import express from "express";
import { startDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";

const app = express();
const PORT = 3000;

// para que entienda el formato json

app.use(express.json());

// configuracion de las rutas

app.use("/api", userRouter);

app.listen(PORT, async () => {
    await startDB();
    console.log(`Servidor corriendo en el puerto ${PORT}`); 
});