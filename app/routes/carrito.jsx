import { useEffect, useState } from "react";
import { useOutletContext } from "@remix-run/react";
 import { ClientOnly } from "remix-utils/client-only";
 //Con ClientOnly le indicamos que ciertas partes solo se van a ejecutar en la parte del cliente
import styles from "~/styles/carrito.css";
export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}
export function meta() {
  return [
    {
      title: "GuitarraLA - Carrito de Compras",
      description:
        "Venta de guitarras, musica, blog, carrito de compras, tienda",
    },
  ];
}
const Carrito = () => {
  const [total, setTotal] = useState(0);
  const { carrito, actualizarCantidadSelect, eliminarGuitarra } =
    useOutletContext();
  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]);
  return (
    <ClientOnly fallback={"cargando..."}>
       {/*asi es como indicamos que esta parte solo se va ejecutar en la parte del servidor*/}
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carritos de Compras</h1>
          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>
              {carrito?.length === 0
                ? "Carrito Vacio"
                : carrito?.map((producto) => (
                    <div key={producto.id} className="producto">
                      <div>
                        <img
                          src={producto.imagen}
                          alt={`Imagen del producto ${producto.nombre}`}
                        />
                      </div>
                      <div>
                        <p className="nombre">{producto.nombre}</p>
                        <p>Cantidad:</p>
                        <select
                          defaultValue={producto.cantidad}
                          className="select"
                          onChange={(e) =>
                            actualizarCantidadSelect({
                              cantidad: +e.target.value,
                              id: producto.id,
                            })
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <p className="precio">
                          $<span>{producto.precio}</span>
                        </p>
                        <p className="subtotal">
                          Subtotal: $
                          <span>{producto.cantidad * producto.precio}</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn-eliminar"
                        onClick={() => {
                          eliminarGuitarra(producto.id);
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
            </div>
            <aside className="resumen">
              <h3>Resumen del Pedido</h3>
              <p>Total a Pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
};

export default Carrito;