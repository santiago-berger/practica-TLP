// DataTypes contiene los tipos de dato que soporta la base (STRING, INTEGER, BOOLEAN, etc.)
import { DataTypes } from "sequelize";
// se importa la conexion para poder registrar el modelo dentro de ella
import { sequelize } from "../config/database.js";

// aca se define la estructura, todavía no se crea la tabla
// modelo de roles (admin, user, etc.), se relaciona con User en user_role.model.js
export const RoleModel = sequelize.define(
  "Role",
  {
    // los atributos o propiedades del modelo se definen acá
    role_name: {
      type: DataTypes.STRING(100),
      allowNull: false             // es obligatorio
    },
  },
  {
    // Other model options go here
    // createdAt: "created_at",
    // updatedAt: false,
    // timestamps: false,
  },
);
