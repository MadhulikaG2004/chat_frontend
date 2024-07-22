import { Link, useNavigate } from "react-router-dom"; 
const NavBar=()=>{
    return (
    <div className="nav">
    <Link to="/">
      <button>Home</button>
      </Link>
      <Link to="/register">
      <button>Register</button>
      </Link>
      <Link to="/login">
      <button>Login</button>
      </Link>
    </div>
    );
};
export default NavBar;