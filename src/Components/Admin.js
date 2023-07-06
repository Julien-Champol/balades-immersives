import { Link, useLocation } from "react-router-dom";

/**
 * Composant qui donne accès à la gestion des utilisateurs et des bâtiments
 * @returns 
 */
const Admin = () => {

    const location = useLocation();
    let firstConnexion = true;
    let user = null;
    if (location.state != null) {

        user = location.state.u;
    }

    if(location.state.firstConnexion !== undefined) {
        firstConnexion = location.state.firstConnexion
    }

    console.log(firstConnexion);

    if (user !== null) {
        return (
            <div className="adminPage">
                <h2>Espace administration</h2>
                {firstConnexion && <div className    ="alert alert-primary" role="alert">
                    Bienvenue {user.name}
                </div>}
                

                <p>Vous êtes dans l'espace de gestion des bâtiments, des photos associées et des utilisateurs.</p>


                <Link className="btn btn-primary" to={'/admin/buildings'} state={{ user }}>
                    <span>Voir les bâtiments</span>
                </Link>
                <Link className="btn btn-primary mx-1" to={'/admin/users'} state={{ user }}>
                    <span>Voir les utilisateurs</span>
                </Link>
                <Link className="btn btn-primary" to="/"> Retour à la page d'acceuil</Link>

            </div>
        )
    } else {
        return (
            <div>
                <p>Vous devez être connecté pour accéder à l'espace administration.</p>
                <Link className="btn btn-primary" to="/">Retour à la page d'acceuil</Link>
            </div>
        );
    }
}

export default Admin;