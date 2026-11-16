import { DataTypes } from "sequelize";
import connection from "../config/db.js";
import bcrypt from "bcrypt";

const Usuario = connection.define("usuarios", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING(254),
        allowNull: false,
        unique: true
    },
    contrasena: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    esAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: "usuarios",
    timestamps: false,
    underscored: true,
    schema: "public"
});

Usuario.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.contrasena,10);
  console.log("hash",hashedPassword,user.contrasena);
  user.contrasena = hashedPassword;
});

Usuario.beforeUpdate(async (user) => {
    if(user.changed("password")){
        const hashedPassword = await bcrypt.hash(user.contrasena,10);
        user.contrasena = hashedPassword;
    }
});

export default Usuario;