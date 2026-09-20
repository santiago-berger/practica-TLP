import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";
import { RoleModel } from "./role.model.js";

// aca se define la estructura, todavía no se crea la tabla
export const UserRoleModel = sequelize.define(
  "User_Role",
  {
    // los atributos o propiedades del modelo se definen acá
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true
    }
  },
  {
    // Other model options go here
    // createdAt: "created_at",
    // updatedAt: false,
    // timestamps: false,
  },
);

// relaciones
// relacion N:M

UserModel.belongsToMany(RoleModel, {through: UserRoleModel, foreignKey: "user_id", as: "roles"});

RoleModel.belongsToMany(UserModel, {through: UserRoleModel, foreignKey: "role_id", as: "users"});