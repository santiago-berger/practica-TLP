import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// aca se define la estructura, todavía no se crea la tabla
export const PersonModel = sequelize.define(
  "Person",
  {
    // los atributos o propiedades del modelo se definen acá
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false
    },
  },
  {
    // Other model options go here
    // createdAt: "created_at",
    // updatedAt: false,
    // timestamps: false,
  },
);