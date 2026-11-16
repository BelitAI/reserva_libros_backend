import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/router.js";
import connection from "./config/db.js";
import session from "express-session";


dotenv.config();

const PORT = 3000;

const app = express();

// Middlewares 
app.use(cors())
app.use(express.json()) // permite leer el body de los POST en json
app.use(express.urlencoded({ extends: true })) // permite leer el body de los POST en formularios

app.use(session({ // solo para cuando tenemos vistas
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use((req,res,next)=>{
    res.locals.query = req.query;
    res.locals.user = req.session?.user;
    next();
});

app.use(express.static("public"));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", router);

async function startServer(params) {
    const maxAttempts = 5;
    let attempts = maxAttempts;
    while (attempts) {
        try {
            await connection.authenticate();
            console.log("Conexión establecida con la base de datos");
            app.listen(PORT, () => {
                console.log("Aplicación en marcha")
            });
            break;
        } catch (error) {
            console.error(`Intento ${maxAttempts - attempts} No se ha podido conectar a la base de datos`, error);
        }
        attempts--;
        await new Promise((resolve, reject) => setTimeout(() => { resolve() }, 5000));
    }
    if (attempts === 0) {
        console.error(`no se ha podido conectar a la base de datos en ${maxAttempts} intentos`);
        process.exit(1);
    }
}

startServer();


