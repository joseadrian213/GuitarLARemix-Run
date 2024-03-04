import { Outlet,useOutletContext } from "@remix-run/react";
import styles from '~/styles/guitarras.css'

export function links() {
  return[{
    rel:'stylesheet',
    href:styles
  }]
}

const Tienda = () => {
 

  return (
    <main className="contenedor">
    {/* Para poder usar el context dentro de archivos que estan anidados 
        debemos pasar el context por el outlet que contiene el archivo padre   
  */}
        <Outlet
        context={useOutletContext()}
        />
    </main>
  )
}

export default Tienda
