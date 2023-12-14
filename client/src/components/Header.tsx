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
  const windowWidth = window.innerWidth;
  const auth = useSelector((state: any) => state.auth);

  if (windowWidth < 768) {
    // drop down menu
    return (
      // <div className="header-container">
      //   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      //     <Container>
      //       <Navbar.Brand href="/">Wildle</Navbar.Brand>
      //       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      //       <Navbar.Collapse id="responsive-navbar-nav">
      //         <Nav>
      //           <NavDropdown title="Menu" id="collasible-nav-dropdown">
      //             <NavDropdown.Item href="/login">Login</NavDropdown.Item>
      //             <NavDropdown.Item href="/ranking">Ranking</NavDropdown.Item>
      //           </NavDropdown>
      //         </Nav>
      //       </Navbar.Collapse>
      //     </Container>
      //   </Navbar>
      // </div>
      <></>
    );
  } else {
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
          <div className="logout-icon">
            <Logout
              onClick={() => {
                toast.success("Sesión cerrada con éxito");
                dispatch(logoutUser(null) as any);
              }}
            >
              <img id="logout" src={exit} alt="exit-icon" />
            </Logout>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export const Logout = (props: any) => {
  return (
    <div onClick={props.onClick} className="logout">
      {props.children}
    </div>
  );
};

export default Header;
