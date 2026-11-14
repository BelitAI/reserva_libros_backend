import { DataTypes } from "sequelize";
import connection from "../config/db.js";

const Autor = connection.define("autor", {
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
    nacionalidad: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    tableName: "autor",
    timestamps: false,
    underscored: true,
    schema: "public"
});

export default Autor;