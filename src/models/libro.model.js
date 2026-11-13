import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Libro = connection.define("Libro", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    autorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING(100)
    },
    estado: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: "disponible"
    }
}, {
    tableName: "libros",
    timestamps: false,
    underscored: true,
    schema: "public"
});

export default Libro;
