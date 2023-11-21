
import Header from "../components/Header";
import GuessList from "../components/GuessList";
import Footer from "../components/Footer";
import "../styles/Home.css";

function Home() {
  return (
    <div className="Home">
      <Header />
      <div className="main-container">
        <h2> Adivina el animal de hoy </h2>
        <GuessList />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
