export const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha);
    const opciones = {
        year: "numeric",
        month: "long",
        day: "2-digit",
    };
    return fechaNueva.toLocaleDateString("es-ES", opciones);
};
export const extraerContenido = data => {
    return Object.keys(data).map(dataContenidoKey => {
        const dataContenido = data[dataContenidoKey];
        if (dataContenido.children && dataContenido.children.length > 0) {
            return dataContenido.children[0];
        }
        return null; // Si no hay children, se puede decidir qué devolver en caso contrario
    })
}