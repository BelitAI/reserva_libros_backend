// Seleccionamos la ventana y sus botones
const modal = document.getElementById("modal-eliminar");
const botonCancelar = document.getElementById("cancelar-eliminar");
const botonConfirmar = document.getElementById("confirmar-eliminar");

// Aquí guardaremos el formulario del libro seleccionado
let formularioEliminar = null;

// Abrimos la ventana al intentar eliminar un libro
document.querySelectorAll(".libros-eliminar").forEach((boton) => {
    boton.addEventListener("click", (evento) => {
        evento.preventDefault();
        formularioEliminar = boton.closest("form");
        modal.classList.add("modal-visible");
    });
});

// Cerramos la ventana sin eliminar
botonCancelar.addEventListener("click", () => {
    modal.classList.remove("modal-visible");
    formularioEliminar = null;
});

// Enviamos el formulario solo si se confirma
botonConfirmar.addEventListener("click", () => {
    if (formularioEliminar) {
        formularioEliminar.submit();
    }
});