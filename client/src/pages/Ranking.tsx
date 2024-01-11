import {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Ranking() {
  const [isLoading, setIsLoading] = useState(true);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const getRanking = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        data.sort((a: any, b: any) => b.points - a.points);
        setRanking(data.slice(0, 10));
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
      setIsLoading(false);
    };

    getRanking();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <h2>Ranking</h2>
      <div className="main-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          ranking.map((user: any, index: number) => (
            <div className="ranking__user bg-burlywood border border-black m-2">
              <Link to={`/user/${user.username}`}>
              <p className="text-slate-600 text-2xl" >{index + 1}. {user.username} - {user.points} puntos</p>
              </Link>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Ranking;
