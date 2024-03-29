import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
  let { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [ranking, setRanking] = useState();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    friends: [],
    points: 0,
  });

  useEffect(() => {
    try {
      const getUser = async () => {
        const response = await fetch(
          `http://localhost:5000/user/name/${username}`
        );
        const data = await response.json();
        setUser(data);
      };
      getUser();
      console.log(user);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }, []);

  useEffect(() => {
    const getRankingPosition = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        data.sort((a: any, b: any) => b.points - a.points);
        setRanking(data.findIndex((user: any) => user.username === username) + 1);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
      setIsLoading(false);
    };

    getRankingPosition();
  }, []);   

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="p-8 mt-24 main-container">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div className="bg-burlywood rounded-full mr-4 p-4">
                <p className="font-bold text-gray-700 text-xl">{user.points}</p>
                <p className="text-gray-600">Puntos</p>
              </div>
              <div className="bg-burlywood rounded-full mr-4 p-4">
                <p className="font-bold text-gray-700 text-xl">#{ranking}</p>
                <p className="text-gray-600">Ranking mundial</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-20 text-center pb-12">
            <h1 className="text-6xl font-bold text-white-1000">
              {user.username}
            </h1>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
