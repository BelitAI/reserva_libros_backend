import prestamoRepository, { PrestamoError } from "../../repositories/prestamo.repository.js";

// ------------------ CRUD de préstamo ----------------------------

// ------------------ C (Create)
// Datos del formulario de alta: usuarios permitidos, libros y fecha de hoy (AAAA-MM-DD, hora local)
const datosFormularioCrear = async (sessionUser) => {
    const [usuarios, libros] = await Promise.all([
        prestamoRepository.usuariosParaFormulario(sessionUser),
        prestamoRepository.librosParaFormulario()
    ]);
    const usuario = usuarios.find(u => u.id === sessionUser.userId);
    const hoy = new Date().toLocaleDateString("en-CA");
    return { usuarios, usuario, libros, hoy, esAdmin: sessionUser.role === true };
};

const createForm = async (req, res) => {
    const fijos = await datosFormularioCrear(req.session.user);
    res.render("prestamo/create", { ...fijos, error: null, datos: {} });
};

// endpoint para crear dato
const create = async (req, res) => {
    const sessionUser = req.session.user;
    const hoy = new Date().toLocaleDateString("en-CA");
    try {
        let datos;
        if (sessionUser.role === true) {
            // el admin elige usuario y fecha de préstamo (puede ser pasada, nunca futura)
            datos = { ...req.body, fechaPrestamo: req.body.fechaPrestamo || hoy };
            if (datos.fechaPrestamo > hoy) {
                throw new PrestamoError("La fecha de préstamo no puede ser futura");
            }
        } else {
            // usuario normal: usuario y fecha de préstamo los fija el servidor
            datos = { ...req.body, usuario: sessionUser.userId, fechaPrestamo: hoy };
            if (datos.fechaDevolucion && datos.fechaDevolucion < hoy) {
                throw new PrestamoError("La fecha de devolución no puede ser anterior a hoy");
            }
        }
        const prestamo = await prestamoRepository.crear(datos);
        res.redirect("/prestamo/" + prestamo.id);
    } catch (error) {
        if (!(error instanceof PrestamoError)) throw error;
        const fijos = await datosFormularioCrear(sessionUser);
        res.status(error.status).render("prestamo/create", { ...fijos, error: error.message, datos: req.body });
    }
};

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async (req, res) => {

    const prestamos = await prestamoRepository.listar(req.session.user);

    res.render("prestamo/list", { prestamos });
};

// endpoint dato individual
const getById = async (req, res) => {
    let prestamo = null;
    try {
        prestamo = await prestamoRepository.obtener(req.params.id);
    } catch (error) {
        if (!(error instanceof PrestamoError)) throw error; // id no numérico -> "No existe"
    }
    res.status(prestamo ? 200 : 404).render("prestamo/show", { prestamo });
};

// ---------------- U (Update) -----------------------------------
const updateForm = async (req, res) => {
    let prestamo = null;
    try {
        prestamo = await prestamoRepository.obtener(req.params.id);
    } catch (error) {
        if (!(error instanceof PrestamoError)) throw error;
    }
    if (!prestamo) {
        return res.redirect("/prestamo");
    }
    const [usuarios, libros] = await Promise.all([
        prestamoRepository.usuariosParaFormulario(req.session.user),
        prestamoRepository.librosParaFormulario(prestamo.libroId)
    ]);
    console.log("usuarios", usuarios);
    
    res.render("prestamo/edit", { prestamo, usuarios, libros, error: null });
};

// endpoint para cambiar dato por completo
const update = async (req, res) => {
    try {
        const prestamo = await prestamoRepository.actualizar(req.params.id, {
            ...req.body,
            fechaDevolucion: req.body.fechaDevolucion || null
        });
        res.redirect("/prestamo/" + prestamo.id);
    } catch (error) {
        if (!(error instanceof PrestamoError)) throw error;
        if (error.status === 404 && error.message === "Préstamo no encontrado") {
            return res.redirect("/prestamo");
        }
        const prestamo = await prestamoRepository.obtener(req.params.id);
        const [usuarios, libros] = await Promise.all([
            prestamoRepository.usuariosParaFormulario(),
            prestamoRepository.librosParaFormulario(prestamo.libroId)
        ]);
        console.log("fewefwenfowenfwioenfwioenfwioenfwioef", usuarios);
        
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
        await prestamoRepository.eliminar(req.params.id);
    } catch (error) {
        if (!(error instanceof PrestamoError)) throw error;
    }
    res.redirect("/prestamo");
};

const devolver = async (req, res) => {
    try {
        await prestamoRepository.devolver(req.params.id);
    } catch (error) {
        if (!(error instanceof PrestamoError)) throw error;
    }
    res.redirect("/prestamo/" + req.params.id);
};


export default {
    create,
    getAll,
    getById,
    update,
    createForm,
    updateForm,
    remove,
    devolver
}

