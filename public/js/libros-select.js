document.querySelectorAll(".select-scroll").forEach((select) => {

    // Crear el contenedor del desplegable
    const contenedor = document.createElement("div");
    contenedor.className = "select-personalizado";

    // Crear el botón que mostrará la selección
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "select-boton";
    boton.textContent = select.options[select.selectedIndex].text;

    // Crear la lista de opciones
    const lista = document.createElement("div");
    lista.className = "select-opciones";
    lista.hidden = true;

    // Crear cada opción
    Array.from(select.options).forEach((opcion) => {

        if (opcion.value === "") return;

        const elemento = document.createElement("button");
        elemento.type = "button";
        elemento.className = "select-opcion";
        elemento.textContent = opcion.text;

        elemento.addEventListener("click", () => {

            // Guardar el valor en el select original
            select.value = opcion.value;

            // Mostrar el texto seleccionado
            boton.textContent = opcion.text;

            // Cerrar el menú
            lista.hidden = true;
            boton.setAttribute("aria-expanded", "false");

            select.dispatchEvent(new Event("change", { bubbles: true }));
            boton.focus();
        });

        lista.appendChild(elemento);
    });

    // Abrir y cerrar el desplegable
    boton.addEventListener("click", () => {
        lista.hidden = !lista.hidden;
        boton.setAttribute("aria-expanded", String(!lista.hidden));
    });

    // Cerrar al pulsar Escape
    contenedor.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            lista.hidden = true;
            boton.setAttribute("aria-expanded", "false");
            boton.focus();
        }
    });

    // Cerrar al hacer clic fuera
    document.addEventListener("click", (event) => {
        if (!contenedor.contains(event.target)) {
            lista.hidden = true;
            boton.setAttribute("aria-expanded", "false");
        }
    });

    // Insertar los elementos
    select.parentNode.insertBefore(contenedor, select);

    contenedor.appendChild(boton);
    contenedor.appendChild(lista);

    // Ocultar visualmente el select original
    select.classList.add("select-original-oculto");

    boton.setAttribute("aria-expanded", "false");
});