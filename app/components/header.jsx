import { Link } from "@remix-run/react";
import logo from "../../public/img/logo.svg";
import Navegacion from "./navegacion";
const Header = () => {


  return (
    <header className="header">
      <div className="contenedor barra ">
        <Link to="/">
          <img src={logo} className="logo" alt="Imagen Logo" />
        </Link>
          <Navegacion/>
      </div>
    </header>
  );
};

export default Header;
