import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home"; // Asegúrate de crear este componente
import LoginRegister from "./Pages/LoginRegister";
import Ranking from "./Pages/Ranking";
import User from "./Pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/loginRegister" element={<LoginRegister />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
