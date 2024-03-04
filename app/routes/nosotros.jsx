import imagen from "../../public/img/nosotros.jpg";
import styles from "~/styles/nosotros.css";
import { useOutletContext } from "@remix-run/react";//Este es el hook para poder acceder al context que declaramos en el root 
export function meta() {
  //Inyecta la información del meta al html
  return [
    {
      title: "GuitarLA - Sobre Nosotros",
      description: "Centa de guitarras, blog de música",
    },
  ];
}
export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "preload",
      href: imagen,
      as: "image",
    },
  ];
}

const Nosotros = () => {
  // const data =useOutletContext(); 
  // console.log(data);
  return (
    <main className="contenedor nostros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="Imagen sobre nosotros" />
        <div>
          <p>
            Cras interdum vestibulum leo, quis tincidunt quam semper sit amet.
            Nulla a risus at lorem suscipit iaculis in ut ex. Praesent euismod
            interdum blandit. Maecenas nibh tellus, pulvinar sed commodo vitae,
            cursus ac nisi. Nam porttitor et justo vel gravida. Nullam bibendum
            purus nec fermentum elementum. Suspendisse vitae elit a enim congue
            consequat. Vestibulum luctus ligula ut ornare iaculis.
            </p>
          <p>
            Cras interdum vestibulum leo, quis tincidunt quam semper sit amet.
            Nulla a risus at lorem suscipit iaculis in ut ex. Praesent euismod
            interdum blandit. Maecenas nibh tellus, pulvinar sed commodo vitae,
            cursus ac nisi. Nam porttitor et justo vel gravida. Nullam bibendum
            purus nec fermentum elementum. Suspendisse vitae elit a enim congue
            consequat. Vestibulum luctus ligula ut ornare iaculis.
            </p>
        </div>
      </div>
    </main>
  );
};

export default Nosotros;
