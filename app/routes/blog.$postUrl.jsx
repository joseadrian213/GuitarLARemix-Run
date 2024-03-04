import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/posts.server";
import { formatearFecha } from "~/utils/helpers";
import { extraerContenido } from "../utils/helpers";
export function meta({ data }) {

    if (data.data[0].attributes.nombre === null) {
      return [
        {
          title: "Entrada no encontrada",
          description: "Guitarras, venta de guitarras, entrada no encontrada",
        },
      ];
    }
    // console.log(data.data);//Un data es de remix y el otro proviene de strapi
    return [
      {
        title: `GuitarLA - ${data.data[0].attributes.titulo}`,
        description: `Guitarras, venta de guitarras, entrada ${data.data[0].attributes.titulo}`,
      },
    ];
  }


export async function loader({ params }) {
  //obtenemos parametros de la url

  const { postUrl } = params;
  const post = await getPost(postUrl);
  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Entrada no encontrada",
    });
  }
  return post;
}
export default function Post() {
  const post = useLoaderData(); //obtenemos la informacion del loader
  const { titulo, contenido, imagen, publishedAt } = post?.data[0]?.attributes;
  const contenidoPost=extraerContenido(contenido)

  return (
    <article className="post mt-3">
      <img
        className="imagen"
        src={imagen?.data?.attributes?.url}
        alt={`imagen blog ${titulo}`}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        {contenidoPost.map((item, index) => (
            <p key={index}>{item.text}</p>
          ))}
        {/* {contenidoPost.map((item) => (<p className="texto">{item.text}</p>))} */}
      </div>
    </article>
  );
}
