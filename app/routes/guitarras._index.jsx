import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/models/guitarras.server";
import ListadoGuitarras from "~/components/listado-guitarras";
export function meta() {
  return [
    {
      title: "GuitarLA - Tienda de Guitarras",
      description: "GuitarLA - Nuestra colección de guitarras",
    },
  ];
}

export async function loader() {
  ///Cada vez que se manda a llamar un función asíncrona se debe colo0car el await
  const guitarras = await getGuitarras();

  return guitarras.data;
}
const Tienda = () => {
  const guitarras = useLoaderData();

  return <ListadoGuitarras guitarras={guitarras} />;
};

export default Tienda;
