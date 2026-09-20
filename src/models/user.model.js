import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { PersonModel } from "./person.model.js";

// aca se define la estructura, todavía no se crea la tabla
export const UserModel = sequelize.define(
  "User",
  {
    // los atributos o propiedades del modelo se definen acá
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  },
  {
    // Other model options go here
    // createdAt: "created_at",
    // updatedAt: false,
    // timestamps: false,
  },
);

// para saber donde va la FK hay que pensar quien pertenece a, como un usuario pertenece a una persona, la FK va en user, por lo que las relaciones se hacen en user.model.js

// relaciones
// relacion 1:1

UserModel.belongsTo(PersonModel, {foreignKey: {
  name: "person_id",
  allowNull: false,
  unique: true

}, as: "person"});

PersonModel.hasOne(UserModel, {foreignKey: "person_id", as: "user"});
