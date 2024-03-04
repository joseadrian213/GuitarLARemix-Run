//Con el .server en el nombre le indicamos que solo se debe de ejeuctar en servidor
export async function getGuitarras() {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);
    const resultado = await respuesta.json();

    return resultado;
}
export async function getGuitarra(url) {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`);
    return await respuesta.json();
}