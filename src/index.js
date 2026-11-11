import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/routes.js";

dotenv.config();

const PORT = 3000;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", router);

app.listen(PORT, () => {
    console.log("Aplicación en marcha");
});