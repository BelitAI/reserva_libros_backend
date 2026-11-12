
import { prestamos } from "../../models/index.js";


// ------------------ CRUD de préstamo ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = (req, res) => {
    const id = prestamos.length > 0 ? prestamos[prestamos.length - 1].id + 1 : 1;
    const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion } = req.body;
    const prestamo = {
        id,
        usuario_id,
        libro_id,
        fecha_prestamo,
        fecha_devolucion: fecha_devolucion || null
    };
    prestamos.push(prestamo);
    res.status(201).json({ data: prestamo });
};

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = (req, res) => {
    res.json({ data: prestamos });
};

// endpoint dato individual
const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const prestamo = prestamos.find(p => p.id === id);
    if (!prestamo) {
        return res.status(404).json({ error: "Préstamo no encontrado" });
    }
    res.json({ data: prestamo });
};

// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const prestamo = prestamos.find(p => p.id === id);
    if (!prestamo) {
        return res.status(404).json({ error: "Préstamo no encontrado" });
    }
    const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion } = req.body;
    prestamo.usuario_id = usuario_id;
    prestamo.libro_id = libro_id;
    prestamo.fecha_prestamo = fecha_prestamo;
    prestamo.fecha_devolucion = fecha_devolucion || null;
    res.json({ data: prestamo });
};

// endpoint para cambiar parte del dato
const modify = (req, res) => {
    const id = parseInt(req.params.id);
    const prestamo = prestamos.find(p => p.id === id);
    if (!prestamo) {
        return res.status(404).json({ error: "Préstamo no encontrado" });
    }
    const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion } = req.body;
    prestamo.usuario_id = usuario_id ?? prestamo.usuario_id;
    prestamo.libro_id = libro_id ?? prestamo.libro_id;
    prestamo.fecha_prestamo = fecha_prestamo ?? prestamo.fecha_prestamo;
    prestamo.fecha_devolucion = fecha_devolucion ?? prestamo.fecha_devolucion;
    res.json({ data: prestamo });
};

// ------------------------ D (Delete)------------

const remove = (req, res) => {
    const id = parseInt(req.params.id);
    const index = prestamos.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Préstamo no encontrado" });
    }
    const [prestamo] = prestamos.splice(index, 1);
    res.json({ data: prestamo });
};


export default {
    create,
    getAll,
    getById,
    update,
    modify,
    remove
}