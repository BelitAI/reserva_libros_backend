//Este acrchivo se va a encargar del comportamiento de la ventana de confirmacion


// Seleccionamos los elementos del modal HTML
const modal = document.getElementById("modal-eliminar");
const botonCancelar = document.getElementById("cancelar-eliminar");
const botonConfirmar = document.getElementById("confirmar-eliminar");

// Guardamos la dirección del autor que queremos eliminar
let urlEliminar = "";

// Seleccionamos todos los botones de eliminar
const botonesEliminar = document.querySelectorAll(".btn-eliminar");

// Abrimos el modal al pulsar Eliminar
botonesEliminar.forEach(boton => {
    boton.addEventListener("click", () => {
        urlEliminar = boton.dataset.url;
        modal.classList.add("modal-visible");
    });
});

// Cerramos el modal al pulsar Cancelar
botonCancelar.addEventListener("click", () => {
    modal.classList.remove("modal-visible");
});

// Eliminamos el autor al confirmar
botonConfirmar.addEventListener("click", () => {
    if (urlEliminar) {
        window.location.href = urlEliminar;
    }
});