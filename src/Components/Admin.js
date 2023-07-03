import {Cloudinary} from "@cloudinary/url-gen";
import {Link} from "react-router-dom";

const Admin = () => {
    const cld = new Cloudinary({cloud: {cloudName: 'dmtss9gtm'}});


    return (
        <div className="adminPage">
            <h2>Espace administration</h2>


            <p>Vous êtes dans l'espace de gestion des bâtiments, des photos associées et des utilisateurs.</p>

            <Link to="/admin/buildings">Voir les bâtiments</Link>
            < br/>
            <Link to="/admin/users">Voir les utilisateurs</Link>




        </div>
    )

}

export default Admin;