import {Link,useLocation} from "react-router-dom";

const Admin = ({route,navigation}) => {

 
    const location = useLocation();
    console.log(location.state);
    let user;
    if(location.state != null){
        user= location.state.u;
    }
    console.log(user);
   
    if(user){
        return (
       
            <div className="adminPage">
                <h2>Espace administration</h2>
    
    
                <p>Vous êtes dans l'espace de gestion des bâtiments, des photos associées et des utilisateurs.</p>
    
                <Link className="btn btn-primary" to="/admin/buildings">Voir les bâtiments</Link>
                <Link className="btn btn-primary mx-1" to="/admin/users">Voir les utilisateurs</Link>
    
            </div>
        )
    }else{
        return (
            <div>
              <p>Vous devez être connecté pour accéder à l'espace administration.</p>
              <Link to="/">Retour à la page d'acceuil</Link>
            </div>
          );
    }
    

}

export default Admin;