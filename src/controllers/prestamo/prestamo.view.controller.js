
import { prestamos, usuarios, libros } from "../../models/index.js";

// Añade el usuario y el libro completos a cada préstamo (para mostrarlos en la vista)
const conDatos = (prestamo) => ({
    ...prestamo,
    usuario: usuarios.find(u => u.id === prestamo.usuario_id),
    libro: libros.find(l => l.id === prestamo.libro_id)
});

// ------------------ CRUD de préstamo ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = (req, res) => {
    const id = prestamos.length > 0 ? prestamos[prestamos.length - 1].id + 1 : 1;
    const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion } = req.body;
    const prestamo = {
        id,
        usuario_id: parseInt(usuario_id),
        libro_id: parseInt(libro_id),
        fecha_prestamo,
        fecha_devolucion: fecha_devolucion || null
    };
    prestamos.push(prestamo);

    // el libro pasa a estar prestado si no se ha devuelto
    const libro = libros.find(l => l.id === prestamo.libro_id);
    if (libro && !prestamo.fecha_devolucion) {
        libro.estado = "prestado";
    }

    res.redirect("/prestamo/" + id);
};

const createForm = (req, res) => {
    const librosDisponibles = libros.filter(l => l.estado === "disponible");
    res.render("prestamo/create", { usuarios, libros: librosDisponibles });
};

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = (req, res) => {
    res.render("prestamo/list", { prestamos });
};

// endpoint dato individual
const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const prestamo = prestamos.find(p => p.id === id);
    res.render("prestamo/show", { prestamo: prestamo ? conDatos(prestamo) : null });
};

// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = (req, res) => {
    const id = parseInt(req.params.id);
    const prestamo = prestamos.find(p => p.id === id);
    if (!prestamo) {
        return res.redirect("/prestamo");
    }
    const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion } = req.body;
    prestamo.usuario_id = parseInt(usuario_id);
    prestamo.libro_id = parseInt(libro_id);
    prestamo.fecha_prestamo = fecha_prestamo;
    prestamo.fecha_devolucion = fecha_devolucion || null;

    // si tiene fecha de devolución, el libro vuelve a estar disponible
    const libro = libros.find(l => l.id === prestamo.libro_id);
    if (libro) {
        libro.estado = prestamo.fecha_devolucion ? "disponible" : "prestado";
    }

    res.redirect("/prestamo/" + prestamo.id);
};

const updateForm = (req, res) => {
    const id = parseInt(req.params.id);
    const prestamo = prestamos.find(p => p.id === id);
    if (!prestamo) {
        return res.redirect("/prestamo");
    }
    res.render("prestamo/edit", { prestamo, usuarios, libros });
};

// ------------------------ D (Delete)------------

const remove = (req, res) => {
    const id = parseInt(req.params.id);
    const index = prestamos.findIndex(p => p.id === id);
    if (index > -1) {
        prestamos.splice(index, 1);
    }
    res.redirect("/prestamo");
};


export default {
    create,
    getAll,
    getById,
    update,
    createForm,
    updateForm,
    remove
}