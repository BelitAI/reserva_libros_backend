import * as service from "../../services/prestamo.service.js";
import { PrestamoError } from "../../services/prestamo.service.js";

// ------------------ CRUD de préstamo ----------------------------

// ------------------ C (Create)
const createForm = async (req, res) => {
    const [usuarios, libros] = await Promise.all([
        service.usuariosParaFormulario(),
        service.librosParaFormulario()
    ]);
    res.render("prestamo/create", { usuarios, libros, error: null, datos: {} });
};

// endpoint para crear dato
const create = async (req, res) => {
    try {
        const prestamo = await service.crear(req.body);
        res.redirect("/prestamo/" + prestamo.id);
    } catch (error) {
        if (!(error instanceof PrestamoError)) throw error;
        const [usuarios, libros] = await Promise.all([
            service.usuariosParaFormulario(),
            service.librosParaFormulario()
        ]);
        res.status(error.status).render("prestamo/create", { usuarios, libros, error: error.message, datos: req.body });
    }
};

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async (req, res) => {
    const prestamos = await service.listar();
    res.render("prestamo/list", { prestamos });
};

// endpoint dato individual
const getById = async (req, res) => {
    let prestamo = null;
    try {
        prestamo = await service.obtener(req.params.id);
    } catch (error) {
        if (!(error instanceof PrestamoError)) throw error; // id no numérico -> "No existe"
    }
    res.status(prestamo ? 200 : 404).render("prestamo/show", { prestamo });
};

// ---------------- U (Update) -----------------------------------
const updateForm = async (req, res) => {
    let prestamo = null;
    try {
        prestamo = await service.obtener(req.params.id);
    } catch (error) {
        if (!(error instanceof PrestamoError)) throw error;
    }
    if (!prestamo) {
        return res.redirect("/prestamo");
    }
    const [usuarios, libros] = await Promise.all([
        service.usuariosParaFormulario(),
        service.librosParaFormulario(prestamo.libroId)
    ]);
    res.render("prestamo/edit", { prestamo, usuarios, libros, error: null });
};

// endpoint para cambiar dato por completo
const update = async (req, res) => {
    try {
        const prestamo = await service.actualizar(req.params.id, {
            ...req.body,
            fechaDevolucion: req.body.fechaDevolucion || null
        });
        res.redirect("/prestamo/" + prestamo.id);
    } catch (error) {
        if (!(error instanceof PrestamoError)) throw error;
        if (error.status === 404 && error.message === "Préstamo no encontrado") {
            return res.redirect("/prestamo");
        }
        const prestamo = await service.obtener(req.params.id);
        const [usuarios, libros] = await Promise.all([
            service.usuariosParaFormulario(),
            service.librosParaFormulario(prestamo.libroId)
        ]);
        // se conservan los valores que el usuario acababa de escribir
        prestamo.set({
            usuarioId: Number(req.body.usuario) || prestamo.usuarioId,
            libroId: Number(req.body.libro) || prestamo.libroId,
            fechaPrestamo: req.body.fechaPrestamo || prestamo.fechaPrestamo,
            fechaDevolucion: req.body.fechaDevolucion || null
        });
        res.status(error.status).render("prestamo/edit", { prestamo, usuarios, libros, error: error.message });
    }
};

// ------------------------ D (Delete)------------
const remove = async (req, res) => {
    try {
        await service.eliminar(req.params.id);
    } catch (error) {
        if (!(error instanceof PrestamoError)) throw error;
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
