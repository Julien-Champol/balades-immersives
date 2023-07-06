import { Link, useLocation } from "react-router-dom";

const Admin = () => {

 
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


                <Link to={'/admin/buildings'} state={{ user }}>
                <span>Voir les bâtiments</span>
                </Link>
                < br/>
                <Link to={'/admin/users'} state={{ user }}>
                <span>Voir les users</span>
                </Link>
                <br/>
                <Link to="/"> Retour à la page d'acceuil</Link>
    
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