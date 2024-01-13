import Header from "../components/Header";
import GuessList from "../components/GuessList";
import Footer from "../components/Footer";
import {useSelector} from "react-redux";
import "../styles/Home.css";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getUser} from "../slices/authSlice";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    friends: [],
    points: 0,
  });

  useEffect(() => {
    if (!auth._id) {
      navigate("/login");
    }
  }, [auth._id, navigate]);

  useEffect(() => {
    if (auth._id) {
      dispatch(getUser() as any);
    }
  }, [auth._id, dispatch]);

  useEffect(() => {
    setUser({
      username: auth.username,
      email: auth.email,
      password: "",
      friends: auth.friends,
      points: auth.points,
    });
  }, [auth.username, auth.email]);

  console.log(auth);
  return (
    <div className="Home flex flex-col min-h-screen">
      <Header />
      <main className="main-container">
        <h2> Adivina el animal de hoy </h2>
        <GuessList _id={auth._id} />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
