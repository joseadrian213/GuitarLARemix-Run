import React from "react";
import { extraerContenido } from "../utils/helpers";
export default function Curso({ curso }) {
  const { contenido, imagen, titulo } = curso;
  const contenidoCurso = extraerContenido(contenido);
  return (
    <section className="curso">
      <style jsx="true">{`
        .curso{
            background-image: linear-gradient(to right, rgb(0 0 0/ .65),rgb(0 0 0/.7)),url(${imagen.data.attributes.url})
        }
      `}</style>
      <div className=" contenedor curso-grid">
        <div className="contenido">
          <h2 className="heading">{titulo}</h2>
          {contenidoCurso.map((item, index) => (
            <p className="texto" key={index}>
              {item.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
