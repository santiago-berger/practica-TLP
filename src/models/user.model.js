// DataTypes contiene los tipos de dato que soporta la base (STRING, INTEGER, BOOLEAN, etc.)
import { DataTypes } from "sequelize";
// se importa la conexion para poder registrar el modelo dentro de ella
import { sequelize } from "../config/database.js";
// se importa Person porque abajo se define la relacion entre ambos modelos
import { PersonModel } from "./person.model.js";

// aca se define la estructura, todavía no se crea la tabla
// define(nombreDelModelo, atributos, opciones) genera la tabla "Users"
export const UserModel = sequelize.define(
  "User",
  {
    // los atributos o propiedades del modelo se definen acá
    name: {
      type: DataTypes.STRING(100),
      allowNull: false // obligatorio
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true // no puede haber dos usuarios con el mismo email
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
      // en un caso real habria que hashearla (bcrypt)
    },
  },
  {
    // Other model options go here
    // createdAt: "created_at",
    // updatedAt: false,
    // timestamps: false,
  },
);

// para saber donde va la FK hay que pensar:
// quien pertenece a, como un usuario pertenece a una persona, la FK va en user
// por lo que las relaciones se hacen en user.model.js

// relaciones
// relacion 1:1

// belongsTo crea la columna person_id (FK) dentro de la tabla Users
UserModel.belongsTo(PersonModel, {
  foreignKey: {
    name: "person_id",  // nombre de la columna de la clave foranea
    allowNull: false,   // todo usuario debe estar asociado a una persona
    unique: true        // al ser unica, una persona solo puede tener un usuario
  }, 
  as: "person", 
  // onDelete: "CASCADE"
}); // alias que se usa despues en los include de las consultas

// no crea columna nueva, solo permite consultar
// la persona junto con su usuario (include: {model: UserModel, as: "user"})
PersonModel.hasOne(UserModel, {foreignKey: "person_id", as: "user"});
