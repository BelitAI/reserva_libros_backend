import connection from "../config/db.js";
import Prestamo from "../models/prestamo.model.js";
import Libro from "../models/libro.model.js";
import Usuario from "../models/user.model.js";

// Lógica de negocio de préstamos, compartida por el controlador de vistas y el de API.

export class PrestamoError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}

const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const incluir = [
    { model: Usuario, as: "usuario", attributes: { exclude: ["contrasena"] } },
    { model: Libro, as: "libro" }
];

const aEntero = (valor, campo) => {
    const n = Number(valor);
    if (!Number.isInteger(n) || n <= 0) {
        throw new PrestamoError(`${campo} no es válido`);
    }
    return n;
};

const aFecha = (valor, campo) => {
    if (typeof valor !== "string" || !FECHA.test(valor) || isNaN(Date.parse(valor))) {
        throw new PrestamoError(`${campo} debe tener formato AAAA-MM-DD`);
    }
    return valor;
};

// `usuario` y `libro` llegan como id (1) o como objeto con id ({ id: 1 })
const idDe = (valor) => (valor !== null && typeof valor === "object" ? valor.id : valor);

// Valida y normaliza los datos. Los campos undefined se rellenan con `base` (para PATCH).
const normalizar = (datos, base = {}) => {
    const usuarioId = idDe(datos.usuario) ?? base.usuarioId;
    const libroId = idDe(datos.libro) ?? base.libroId;
    const fechaPrestamo = datos.fechaPrestamo ?? base.fechaPrestamo;
    const devolucion = datos.fechaDevolucion !== undefined ? datos.fechaDevolucion : base.fechaDevolucion;

    const resultado = {
        usuarioId: aEntero(usuarioId, "usuario"),
        libroId: aEntero(libroId, "libro"),
        fechaPrestamo: aFecha(fechaPrestamo, "fechaPrestamo"),
        fechaDevolucion: devolucion ? aFecha(devolucion, "fechaDevolucion") : null
    };
    if (resultado.fechaDevolucion && resultado.fechaDevolucion < resultado.fechaPrestamo) {
        throw new PrestamoError("La fecha de devolución no puede ser anterior a la de préstamo");
    }
    return resultado;
};

const cambiarEstado = (libro, estado, t) => libro.update({ estado }, { transaction: t });

// ------------------ Lecturas ----------------------------
export const listar = () => Prestamo.findAll({ include: incluir, order: [["id", "ASC"]] });

export const obtener = (id) => Prestamo.findByPk(aEntero(id, "id"), { include: incluir });

export const usuariosParaFormulario = () => Usuario.findAll({ order: [["id", "ASC"]] });

// Libros disponibles (+ el que ya tiene el préstamo que se está editando)
export const librosParaFormulario = async (libroActualId = null) => {
    const libros = await Libro.findAll({ order: [["id", "ASC"]] });
    return libros.filter(l => l.estado === "disponible" || l.id === libroActualId);
};

// ------------------ Escrituras ----------------------------
export const crear = async (datos) => {
    const d = normalizar(datos);
    return connection.transaction(async (t) => {
        if (!(await Usuario.findByPk(d.usuarioId, { transaction: t }))) {
            throw new PrestamoError("El usuario no existe", 404);
        }
        const libro = await Libro.findByPk(d.libroId, { transaction: t, lock: t.LOCK.UPDATE });
        if (!libro) throw new PrestamoError("El libro no existe", 404);
        if (libro.estado !== "disponible") throw new PrestamoError("El libro no está disponible", 409);

        const prestamo = await Prestamo.create(d, { transaction: t });
        if (!d.fechaDevolucion) await cambiarEstado(libro, "prestado", t);
        return prestamo;
    });
};

// Sirve para PUT (datos completos) y PATCH (datos parciales).
export const actualizar = async (id, datos) => {
    id = aEntero(id, "id");
    return connection.transaction(async (t) => {
        const prestamo = await Prestamo.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });
        if (!prestamo) throw new PrestamoError("Préstamo no encontrado", 404);

        const d = normalizar(datos, prestamo.get({ plain: true }));
        if (!(await Usuario.findByPk(d.usuarioId, { transaction: t }))) {
            throw new PrestamoError("El usuario no existe", 404);
        }

        const estabaActivo = !prestamo.fechaDevolucion;
        const libroAnterior = await Libro.findByPk(prestamo.libroId, { transaction: t, lock: t.LOCK.UPDATE });

        if (d.libroId !== prestamo.libroId) {
            const libroNuevo = await Libro.findByPk(d.libroId, { transaction: t, lock: t.LOCK.UPDATE });
            if (!libroNuevo) throw new PrestamoError("El libro no existe", 404);
            if (libroNuevo.estado !== "disponible") throw new PrestamoError("El libro no está disponible", 409);

            if (estabaActivo && libroAnterior) await cambiarEstado(libroAnterior, "disponible", t);
            if (!d.fechaDevolucion) await cambiarEstado(libroNuevo, "prestado", t);
        } else if (libroAnterior) {
            await cambiarEstado(libroAnterior, d.fechaDevolucion ? "disponible" : "prestado", t);
        }

        return prestamo.update(d, { transaction: t });
    });
};

export const eliminar = async (id) => {
    id = aEntero(id, "id");
    return connection.transaction(async (t) => {
        const prestamo = await Prestamo.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });
        if (!prestamo) throw new PrestamoError("Préstamo no encontrado", 404);

        if (!prestamo.fechaDevolucion) {
            const libro = await Libro.findByPk(prestamo.libroId, { transaction: t, lock: t.LOCK.UPDATE });
            if (libro) await cambiarEstado(libro, "disponible", t);
        }
        await prestamo.destroy({ transaction: t });
        return prestamo;
    });
};
