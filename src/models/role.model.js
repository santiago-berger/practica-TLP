import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// aca se define la estructura, todavía no se crea la tabla
export const RoleModel = sequelize.define(
  "Role",
  {
    // los atributos o propiedades del modelo se definen acá
    role_name: {
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