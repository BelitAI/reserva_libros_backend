import express from "express";
import { libros } from "./models/index.js";

const app = express();

app.set("views", "./src/views");
app.set("view engine", "ejs");

// Muestra todos los libros del listado.
app.get("/libro", (req, res) => {
    res.render("libro/list", { libros });
});

// Muestra el formulario para crear un libro.
app.get("/libro/new", (req, res) => {
    res.render("libro/create");
});

// Busca el libro elegido y muestra el formulario de edición.
app.get("/libro/:id/edit", (req, res) => {
    const libro = libros.find(
        libro => libro.id === Number(req.params.id)
    );

    res.render("libro/update", { libro });
});

// Busca el libro elegido y muestra su detalle.
app.get("/libro/:id", (req, res) => {
    const libro = libros.find(
        libro => libro.id === Number(req.params.id)
    );

    res.render("libro/show", { libro });
});

app.listen(3001, () => {
    console.log("Abre http://localhost:3001/libro");
});