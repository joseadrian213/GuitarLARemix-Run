import { useState } from "react";
import { getGuitarra } from "~/models/guitarras.server";
import { useLoaderData,useOutletContext } from "@remix-run/react";
import { extraerContenido } from "../utils/helpers";
//Como ya cargamos el loader el data ya esta disponible para usar
export async function loader({ params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);

  if (guitarra.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Guitarra no encontrada",
    });
  }
  // const {}=params;
  return guitarra;
}
export function meta({ data }) {
  if (data.data[0].attributes.nombre === null) {
    return [
      {
        title: "Guitarra no encontrada",
        description: "Guitarras, venta de guitarras, guitarra no encontrada",
      },
    ];
  }
  // console.log(data.data);//Un data es de remix y el otro proviene de strapi
  return [
    {
      title: `GuitarLA - ${data.data[0].attributes.nombre}`,
      description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`,
    },
  ];
}

//El nombre de este archivo debe llevar la sintaxis con el signo para que se reconozca que sera una url dinámica
const Guitarra = () => {
  const {agregarCarrito}=useOutletContext(); 
  const [cantidad,setCantidad]=useState(0)
  const guitarra = useLoaderData();
  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;
  const descripcionGuitarra = extraerContenido(descripcion);
 

  const handleSubmit=e=>{
    e.preventDefault(); 
    if (cantidad < 1) {
      alert('Debes seleccionar una cantidad'); 
      return ; 
    }
    const guitarraSeleccionada={
      id:guitarra.data[0].id,
      imagen:imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
            }
      agregarCarrito(guitarraSeleccionada)      

  }

  return (
    <div className=" guitarra">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt={`Imagen de la guitarra ${nombre}`}
      />
      <div className="contenido">
        <h3>{nombre}</h3>
        {/* <p className="texto">{descripcion[0].children[0].text}</p> */}
        {descripcionGuitarra.map((item, index) => (
          <p className="texto" key={index}>
            {item.text}
          </p>
        ))}
        <p className="texto"></p>
        <p className="precio">${precio}</p>

        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">Cantidad</label>
          {/* Esta es la forma comun <select  onChange={e=>setCantidad(parseInt(e.target.value))} id="cantidad"> */}
          <select  onChange={e=>setCantidad(+e.target.value)} id="cantidad">
         
            <option value="">--Seleccione--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>

          </select>
          <input type="submit" value="Agregar al carrito" />
        </form>
      </div>
    </div>
  );
};

export default Guitarra;
