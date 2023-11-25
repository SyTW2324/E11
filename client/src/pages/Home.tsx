
import Header from "../components/Header";
import GuessList from "../components/GuessList";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Home.css";

function Home() {

  const auth = useSelector((state: any) => state.auth);

  console.log(auth);
  return (
    <div className="Home flex flex-col min-h-screen">
      <Header />
      <main className="main-container">
        <h2> Adivina el animal de hoy </h2>
        <GuessList />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
