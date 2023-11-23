import Header from "../components/Header";
import React from "react";
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
    </>
  );
}

export default User;
