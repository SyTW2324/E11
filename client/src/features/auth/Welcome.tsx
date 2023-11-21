import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";
import { Link } from "react-router-dom";

import React from 'react'

const Welcome = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);

    const welcome = user ? `Welcome ${user}!` : "Welcome!";
    const tokenAbbr = `${token?.slice(0, 10)}...`;

    const content = (
        <div>
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <Link to="/home">Home</Link>
        </div>
    )
  return content
}
export default Welcome