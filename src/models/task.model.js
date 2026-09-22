// DataTypes contiene los tipos de dato que soporta la base (STRING, INTEGER, BOOLEAN, etc.)
import { DataTypes } from "sequelize";
// se importa la conexion para poder registrar el modelo dentro de ella
import { sequelize } from "../config/database.js";
// se importa User porque abajo se define la relacion entre ambos modelos
import { UserModel } from "./user.model.js";

// aca se define la estructura, todavía no se crea la tabla
// define(nombreDelModelo, atributos, opciones)
// genera la tabla "Tasks"
export const TaskModel = sequelize.define(
  "Task",
  {
    // los atributos o propiedades del modelo se definen acá
    title: {
      type: DataTypes.STRING(100),
      unique: true,    // no se permiten dos tareas con el mismo titulo
      allowNull: false // obligatorio
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    is_complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false       // si no se manda, la tarea se crea como no completada
    },
    // opcional mientras se controle que siempre se mande el id por medio de validaciones
    // definir la FK a mano es opcional porque belongsTo ya la crearia,
    // pero declararla aca permite controlar el tipo y las restricciones
    user_id: {
        type: DataTypes.INTEGER, // debe coincidir con el tipo del id al que apunta
        allowNull: false,        // toda tarea tiene que pertenecer a un usuario
        references: {
            // el nombre en model es el nombre de como esta en la tabla
            model: "Users", // tabla referenciada en plural, como la nombra Sequelize
            key: "id"       // columna referenciada de esa tabla
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

// relacion 1:N: la FK va del lado muchos, el cual es Task, porque una tarea pertenece a un usuario
TaskModel.belongsTo(UserModel, {foreignKey: "user_id", as: "user"});

// un usuario tiene muchas tareas, habilita include con el alias "tasks"
UserModel.hasMany(TaskModel, {foreignKey: "user_id", as: "tasks"})
