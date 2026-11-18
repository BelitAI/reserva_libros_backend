# reserva_libros_backend

Aplicación web para gestionar una biblioteca y los préstamos de sus libros.

El proyecto permite consultar y gestionar libros, autores, usuarios y préstamos. Está desarrollado con Node.js y Express, utiliza PostgreSQL como base de datos y EJS para generar las vistas.

## Tecnologías utilizadas

- **Node.js:** entorno para ejecutar JavaScript en el servidor.
- **Express:** creación de rutas y gestión de peticiones.
- **PostgreSQL:** base de datos relacional.
- **Sequelize:** herramienta para trabajar con la base de datos desde JavaScript.
- **EJS:** creación de las páginas que se muestran en el navegador.
- **Docker y Docker Compose:** ejecución de la aplicación, PostgreSQL y pgAdmin en contenedores.
- **pgAdmin:** herramienta para administrar PostgreSQL.

## Requisitos previos

Para ejecutar el proyecto necesitas:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) con Docker Compose

## Instalación y arranque

1. Clona el repositorio:

   ```bash
   git clone https://github.com/BelitAI/reserva_libros_backend.git
   ```

2. Entra en la carpeta del proyecto:

   ```bash
   cd reserva_libros_backend
   ```

3. Crea un archivo `.env` a partir de `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Abre `.env` y completa las variables de configuración para la aplicación, PostgreSQL y pgAdmin.

   Por ejemplo, si configuras `APP_PORT=3000` y `PGADMIN_PORT=5051`:

   - Aplicación: http://localhost:3000
   - pgAdmin: http://localhost:5051

5. Arranca los servicios:

   ```bash
   docker compose up -d --build
   ```

6. Abre la aplicación y pgAdmin en el navegador utilizando los puertos que hayas configurado en `.env`.

Para consultar el estado de los servicios:

```bash
docker compose ps
```

Para detenerlos:

```bash
docker compose stop
```

## Páginas principales

Estas direcciones utilizan el puerto `3000` como ejemplo. Si has configurado otro `APP_PORT`, sustitúyelo en las direcciones.

| Página | Dirección |
|---|---|
| Libros | http://localhost:3000/libro |
| Autores | http://localhost:3000/autores |
| Usuarios | http://localhost:3000/user |
| Préstamos | http://localhost:3000/prestamo |
| Iniciar sesión | http://localhost:3000/user/login |

## API de préstamos

La ruta base de la API de préstamos es `/api/prestamo`.

| Método | Ruta | Función |
|---|---|---|
| GET | `/api/prestamo` | Consultar todos los préstamos. |
| GET | `/api/prestamo/:id` | Consultar un préstamo por su identificador. |
| POST | `/api/prestamo` | Crear un préstamo. |
| PUT | `/api/prestamo/:id` | Actualizar un préstamo. |
| PATCH | `/api/prestamo/:id` | Modificar parcialmente un préstamo. |
| PATCH | `/api/prestamo/:id/return` | Registrar la devolución. |
| DELETE | `/api/prestamo/:id` | Eliminar un préstamo. |

Para las rutas que incluyen `:id`, sustituye `:id` por el identificador del préstamo.

## Estructura del proyecto

```text
reserva_libros_backend/
├── docs/              # Documentación del proyecto
├── public/            # Archivos estáticos: CSS, JavaScript e imágenes
├── sql/               # Estructura y datos iniciales de la base de datos
├── src/
│   ├── config/        # Configuración de la base de datos
│   ├── controllers/   # Funciones que atienden las peticiones
│   ├── models/        # Modelos de Sequelize
│   ├── repositories/  # Consultas y operaciones con los datos
│   ├── routes/        # Rutas de las vistas y de la API
│   ├── views/         # Plantillas EJS
│   └── index.js       # Punto de entrada de la aplicación
├── docker-compose.yml
├── Dockerfile
└── package.json
```