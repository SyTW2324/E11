import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../slices/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function User() {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    toast.success("Usuario actualizado");
  };

  return (
    <>
      <Header />

      <button className="button" onClick={handleSubmit}>
        Actualizar
      </button>

      <button className="button" onClick={() => navigate("/home")}>
        Volver
      </button>
      <div className="p-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div className="bg-burlywood rounded-full">
              <p className="font-bold text-gray-700 text-xl">{user.points}</p>
              <p className="text-gray-400">Amigos</p>
            </div>
            <div className="bg-burlywood rounded-full">
              <p className="font-bold text-gray-700 text-xl">10</p>
              <p className="text-gray-400">Ranking mundial</p>
            </div>
            <div className="bg-burlywood rounded-full">
              <p className="font-bold text-gray-700 text-xl">89</p>
              <p className="text-gray-400">Ranking amigos</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
            </div>
          </div>
        </div>
        <div className="mt-20 text-center pb-12">
          <h1 className="text-4xl font-medium text-gray-700">{user.username}</h1>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default User;
