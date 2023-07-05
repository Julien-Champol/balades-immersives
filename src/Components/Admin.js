import {Cloudinary} from "@cloudinary/url-gen";
import {Link,useLocation,useNavigate} from "react-router-dom";

const Admin = ({route,navigation}) => {
    const cld = new Cloudinary({cloud: {cloudName: 'dmtss9gtm'}});
    const navigate = useNavigate();

 
    const location = useLocation();
    console.log(location.state);
    let user;
    if(location.state != null){
        user= location.state.u;
    }
    console.log(user);
    const handleRetourAcceuil = () => {
        navigate("/");
      };
    if(user){
        return (
       
            <div className="adminPage">
                <h2>Espace administration</h2>
    
    
                <p>Vous êtes dans l'espace de gestion des bâtiments, des photos associées et des utilisateurs.</p>
    
                <Link to="/admin/buildings">Voir les bâtiments</Link>
                < br/>
                <Link to="/admin/users">Voir les utilisateurs</Link>
    
            </div>
        )
    }else{
        return (
            <div>
              <p>Vous devez être connecté pour accéder à l'espace administration.</p>
              <button onClick={handleRetourAcceuil}>Retour a la page d'acceuil</button>
            </div>
          );
    }
    

}

export default Admin;