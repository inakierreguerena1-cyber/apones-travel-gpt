import { Link } from "react-router-dom";


function Navigation() {


    return (

        <nav className="navigation">


            <Link to="/">
                Inicio
            </Link>


            <Link to="/explore">
                Explorar
            </Link>


            <Link to="/favorites">
                Favoritos
            </Link>

            <Link to="/history">
                Mis viajes
            </Link>


        </nav>

    )

}


export default Navigation;