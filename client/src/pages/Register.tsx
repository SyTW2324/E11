// import React, { useState } from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import email from "../images/email.png";
// import password from "../images/password.png";
// import user from "../images/user.png";
// import "../styles/LoginRegister.css";

// function Register() {
//   const [action, setAction] = useState("Sign Up");

//   return (
//     <>
//       <Header />
//       <section className="bg-trasparent dark:bg-gray-900">
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//           <div className="w-full bg-burlywood rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                 Registra tu cuenta
//               </h1>
//               <form className="space-y-4 md:space-y-6" action="#">
//                 <div>
//                   <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
//                   <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Usuario" />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
//                   <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
//                 </div>
//                 <div>
//                   <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
//                   <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                 </div>
//                 <button type="submit" className="w-full text-black bg-verde-hoja hover:bg-verde-sabana focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section >
//       <Footer />
//     </>
//   );
// }

// export default Register;

// client/src/pages/Register.tsx
  import React, { FormEvent, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { ThunkDispatch } from 'redux-thunk';
  import { AnyAction } from 'redux';
  import { RootState } from '../reducers';
  import { registerUser, AuthActionTypes } from '../actions/authActions';

  const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch: ThunkDispatch<RootState, null, AuthActionTypes> = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    function handleRegister(event: FormEvent<HTMLFormElement>): void {
      throw new Error('Function not implemented.');
    }

    // ...

    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <br />
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };

  export default Register;

