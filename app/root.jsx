import { useState, useEffect } from "react";
import {
  Link,
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import styles from "~/styles/index.css"; //Con la virgulilla obtenemos la ruta relativa ~
import Header from "~/components/header";
import Footer from "~/components/footer";
export function meta() {
  const error = useRouteError();
  if (error?.status === 404) {
    return [
      {
        title: `GuitarLA - Hubo un error`,
      },
      {
        description: `Contenido no encontrado`,
      },
    ];
  }
  //Inyecta la información del meta al html
  return [
    {
      charset: "utf-8",
      title: "GuitarLA - Remix",
      viewport: "width=device-width,initial-scale=1",
    },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    {
      rel: "preconect",
      href: " https://fonts.googleapis.com",
    },
    {
      rel: "preconect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}
export default function App() {
  //En caso de que no haya nada se le pasara el arreglo vacio
  // const carritoLS =
  //   typeof window !== "undefined"
  //     ? JSON.parse(localStorage.getItem("carrito") ?? [])
  //     : null;
  let carritoLS = null;
if (typeof window !== "undefined") {
  const item = localStorage.getItem("carrito");
  carritoLS = item ? JSON.parse(item) : [];
}
  const [carrito, setCarrito] = useState(carritoLS);
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);
  const agregarCarrito = (guitarra) => {
    //some devuelve true o false segun la condicion que se le establezca
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      // Iterar sobre el arreglo, e identificar el elemento duplicado
      const carritoActualizado = carrito.map((guitarraState) => {
        if (guitarraState.id === guitarra.id) {
          //Reescribir la cantidad y que se coloque el numero del select
          guitarraState.cantidad = guitarra.cantidad;
          //Para que se sume la cantidad de guitarras en el carrito
          // guitarraState.cantidad += guitarra.cantidad;
        }
        return guitarraState;
      });
      //Añadir al carrito
      setCarrito(carritoActualizado);
    } else {
      //Registro nuevo. agregar al carrito
      setCarrito([...carrito, guitarra]);
    }
  };
  const actualizarCantidadSelect = (guitarra) => {
    const carritoActualizado = carrito.map((guitarraState) => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad;
      }
      return guitarraState;
    });
    setCarrito(carritoActualizado);
  };
  const eliminarGuitarra = (id) => {
    const carritoActualizado = carrito.filter(
      (guitarraState) => guitarraState.id !== id
    );
    setCarrito(carritoActualizado);
  };
  return (
    <Document>
      <Outlet
        //El context provider ahorra lo que son los props pero añade complejidad a la aplicacion
        //Cualquier dato que se necesite se puede enviar por el context provider
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidadSelect,
          eliminarGuitarra,
        }}
      />
    </Document>
  );
}
//Va renderizar todo lo que se le pase por aqui
function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />
        {/*Scripts evita ciertos bugs */}
        <LiveReload /> {/*Refresca la pantalla  */}
      </body>
    </html>
  );
}
/* Manejo de errores */

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <p className="error">
          {error.status} {error.statusText}
        </p>
        <Link className="error-enlace" to="/">
          Tal vez quieras volver a la pagina principal
        </Link>
      </Document>
    );
  }
}
