// DataTypes contiene los tipos de dato que soporta la base (STRING, INTEGER, BOOLEAN, etc.)
import { DataTypes } from "sequelize";
// se importa la conexion para poder registrar el modelo dentro de ella
import { sequelize } from "../config/database.js";
// se importan los dos modelos que esta tabla intermedia va a vincular
import { UserModel } from "./user.model.js";
import { RoleModel } from "./role.model.js";

// aca se define la estructura, todavía no se crea la tabla
// esta es la tabla intermedia que resuelve la relacion muchos a muchos
export const UserRoleModel = sequelize.define(
  "User_Role",
  {
    // los atributos o propiedades del modelo se definen acá
    // se define el id manualmente para que la PK sea simple y no compuesta (user_id + role_id)
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,  // clave primaria de la tabla
      unique: true,      // no se puede repetir
      allowNull: false,  // nunca puede ser nulo
      autoIncrement: true // la base asigna el valor sola, sumando 1 cada vez
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

// belongsToMany con through
// las FK no van en Users ni en Roles, van en la tabla intermedia
// un usuario puede tener muchos roles, se consulta con el alias "roles"
UserModel.belongsToMany(RoleModel, {through: UserRoleModel, foreignKey: "user_id", as: "roles"});

// un rol puede pertenecer a muchos usuarios, se consulta con el alias "users"
RoleModel.belongsToMany(UserModel, {through: UserRoleModel, foreignKey: "role_id", as: "users"});
