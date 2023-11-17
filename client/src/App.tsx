import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home"; // Asegúrate de crear este componente
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Ranking from "./Pages/Ranking";
import User from "./Pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
