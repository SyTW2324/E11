import "../styles/Header.css";
import medal from "../images/medal.png";
import login from "../images/login.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import exit from "../images/exit.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { toast } from "react-toastify";

function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  return (
    <div className="header-container">
      <div className="login-icon">
        {auth._id ? (
          <Link id="user" to="/user">
            <img src={login} alt="loginRegister-icon" />
          </Link>
        ) : (
          <Link id="login" to="/login">
            <img src={login} alt="loginRegister-icon" />
          </Link>
        )}
      </div>
      <div className="title-icon">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Wildle</h1>
        </Link>
      </div>
      <div className="ranking-icon">
        <Link id="ranking" to="/ranking">
          <img src={medal} alt="ranking-icon" />
        </Link>
      </div>
      {auth._id ? (
        <div className="logout-icon cursor-pointer">
          <Logout
            onClick={() => {
              toast.success("Sesión cerrada con éxito");
              dispatch(logoutUser(null) as any);
            }}
          >
            <img
              id="logout"
              src={exit}
              alt="logout-icon"
              className="logout-icon-img"
            />{" "}
          </Logout>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export const Logout = (props: any) => {
  return (
    <div onClick={props.onClick} className="logout">
      {props.children}
    </div>
  );
};

export default Header;
