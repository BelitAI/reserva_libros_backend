import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Usuario = connection.define("Usuario", {
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

export default Usuario;