// DataTypes contiene los tipos de dato que soporta la base (STRING, INTEGER, BOOLEAN, etc.)
import { DataTypes } from "sequelize";
// se importa la conexion para poder registrar el modelo dentro de ella
import { sequelize } from "../config/database.js";

// aca se define la estructura, todavía no se crea la tabla
// define(nombreDelModelo, atributos, opciones)
// Sequelize pone en plural el nombre, cambiandolo a tabla "People"s
export const PersonModel = sequelize.define(
  "Person",
  {
    // los atributos o propiedades del modelo se definen acá
    // ademas de estos campos, Sequelize agrega solo: id (PK autoincremental), createdAt y updatedAt
    name: {
      type: DataTypes.STRING(100),
      allowNull: false             // el campo es obligatorio
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false // se permite que dos personas tengan el mismo apellido
    },
  },
  {
    // Other model options go here
    // createdAt: "created_at",   // renombrar la columna de fecha de creacion
    // updatedAt: false,          // no generar la columna de fecha de actualizacion
    // timestamps: true, // no generar ninguna de las columnas de fecha
    paranoid: true
  },
);
