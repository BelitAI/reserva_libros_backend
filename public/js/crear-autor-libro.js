const modalAutor = document.querySelector("#modal-autor");
const abrirAutor = document.querySelector("#abrir-autor");
const cancelarAutor = document.querySelector("#cancelar-autor");
const formularioAutor = document.querySelector("#form-nuevo-autor");
const errorAutor = document.querySelector("#error-nuevo-autor");
const selectorAutor = document.querySelector("#autor_id");

abrirAutor.addEventListener("click", () => {
    errorAutor.hidden = true;
    modalAutor.showModal();
});

cancelarAutor.addEventListener("click", () => {
    modalAutor.close();
});

formularioAutor.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    errorAutor.hidden = true;

    const botonGuardar = formularioAutor.querySelector(
        'button[type="submit"]'
    );
    botonGuardar.disabled = true;

    try {
        const datos = new URLSearchParams(new FormData(formularioAutor));

        const respuesta = await fetch("/autores/crear-desde-libro", {
            method: "POST",
            body: datos
        });

        if (!respuesta.ok) {
            throw new Error("No se ha podido guardar el autor.");
        }

        const autor = await respuesta.json();

        // Añadir el nuevo autor y dejarlo seleccionado.
        const opcion = new Option(autor.nombre, autor.id, true, true);
        selectorAutor.add(opcion);

        formularioAutor.reset();
        modalAutor.close();
        selectorAutor.focus();
    } catch (error) {
        errorAutor.textContent =
            "No se ha podido guardar el autor. Comprueba tu sesión y vuelve a intentarlo.";
        errorAutor.hidden = false;
    } finally {
        botonGuardar.disabled = false;
    }
});