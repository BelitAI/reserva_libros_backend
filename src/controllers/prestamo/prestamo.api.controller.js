import * as service from "../../services/prestamo.service.js";
import { PrestamoError } from "../../services/prestamo.service.js";

// Convierte los errores de negocio en respuestas JSON; el resto se propaga (500).
const responderError = (res, error) => {
    if (error instanceof PrestamoError) {
        return res.status(error.status).json({ error: error.message });
    }
    throw error;
};

// ------------------ CRUD de préstamo ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req, res) => {
    try {
        const prestamo = await service.crear(req.body);
        res.status(201).json({ data: prestamo });
    } catch (error) {
        responderError(res, error);
    }
};

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async (req, res) => {
    const prestamos = await service.listar();
    res.json({ data: prestamos });
};

// endpoint dato individual
const getById = async (req, res) => {
    try {
        const prestamo = await service.obtener(req.params.id);
        if (!prestamo) {
            return res.status(404).json({ error: "Préstamo no encontrado" });
        }
        res.json({ data: prestamo });
    } catch (error) {
        responderError(res, error);
    }
};

// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async (req, res) => {
    try {
        const { usuario, libro, fechaPrestamo } = req.body;
        if (usuario === undefined || libro === undefined || fechaPrestamo === undefined) {
            return res.status(400).json({ error: "PUT requiere usuario, libro y fechaPrestamo" });
        }
        const prestamo = await service.actualizar(req.params.id, {
            ...req.body,
            fechaDevolucion: req.body.fechaDevolucion ?? null
        });
        res.json({ data: prestamo });
    } catch (error) {
        responderError(res, error);
    }
};

// endpoint para cambiar parte del dato
const modify = async (req, res) => {
    try {
        const prestamo = await service.actualizar(req.params.id, req.body);
        res.json({ data: prestamo });
    } catch (error) {
        responderError(res, error);
    }
};

// ------------------------ D (Delete)------------

const remove = async (req, res) => {
    try {
        const prestamo = await service.eliminar(req.params.id);
        res.json({ data: prestamo });
    } catch (error) {
        responderError(res, error);
    }
};


export default {
    create,
    getAll,
    getById,
    update,
    modify,
    remove
}
