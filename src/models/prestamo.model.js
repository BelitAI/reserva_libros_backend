import { DataTypes } from "sequelize";
import connection from "../config/db.js";
import Usuario from "./user.model.js";
import Libro from "./libro.model.js";

const Prestamo = connection.define("Prestamo", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    libroId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaPrestamo: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fechaDevolucion: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    tableName: "prestamos",
    timestamps: false,
    underscored: true,
    schema: "public"
});

// ------------------ Asociaciones ----------------------------
Prestamo.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });
Usuario.hasMany(Prestamo, { foreignKey: "usuarioId", as: "prestamos" });

Prestamo.belongsTo(Libro, { foreignKey: "libroId", as: "libro" });
Libro.hasMany(Prestamo, { foreignKey: "libroId", as: "prestamos" });

export default Prestamo;
