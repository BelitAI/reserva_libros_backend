// Convierte una fecha AAAA-MM-DD (como la devuelve DATEONLY) a DD/MM/AAAA.
// Se trabaja con el texto, sin crear un Date, para evitar desfases de zona horaria.
export const formatearFecha = (fecha, vacio = "-") => {
    if (!fecha) return vacio;
    const texto = fecha instanceof Date ? fecha.toISOString().slice(0, 10) : String(fecha);
    const partes = /^(\d{4})-(\d{2})-(\d{2})/.exec(texto);
    return partes ? `${partes[3]}/${partes[2]}/${partes[1]}` : texto;
};
