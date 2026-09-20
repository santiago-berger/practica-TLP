import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

// aca se define la estructura, todavía no se crea la tabla
export const TaskModel = sequelize.define(
  "Task",
  {
    // los atributos o propiedades del modelo se definen acá
    title: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    is_complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // opcional mientras se controle que siempre se mande el id por medio de validaciones
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            // el nombre en model es el nombre de como esta en la tabla
            model: "Users",
            key: "id"
        }
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

TaskModel.belongsTo(UserModel, {foreignKey: "user_id", as: "user"});

UserModel.hasMany(TaskModel, {foreignKey: "user_id", as: "tasks"})