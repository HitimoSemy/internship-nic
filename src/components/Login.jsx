import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Login = () => {
	const navigate = useNavigate();

	const [login, setLogin] = useState({
		loginName: '',
		password: '',
	});

	const handleChange = (e) => {
		const value = e.target.value;
		setLogin({ ...login, [e.target.name]: value });
	};

	const handleLoginCitizen = (e) => {
		e.preventDefault();
		AuthService.citizenLogin(login).then(
			() => {
				navigate('/citizenHome');
            window.location.reload();
			},
			(error) => {
				console.log(error.toString());
			},
		);
      
	};

   const handleLoginOfficer = (e) => {
		e.preventDefault();
		AuthService.officerLogin(login).then(
			() => {
				navigate('/officerHome');
            window.location.reload();
			},
			(error) => {
				console.log(error.toString());
			},
		);
	};

   const [page, setPage] = useState(0);

   const goToOfficerLogin = () => {
      setPage((currentPage) => currentPage + 1)
   }

   const goToCitizenLogin = () =>{
      setPage((currentPage) => currentPage - 1)
   }


   const PageDisplay = () => {
		if (page === 0) {
         return(
            <div className="text-left bg-white shadow-lg w-96 rounded">
            <div className='bg-gradient-to-tr from-pink-400 to-pink-600 shadow-md shadow-pink-300 rounded relative -left-4 -top-6 flex'>
               <h3 className="text-xl font-bold text-center text-white p-6 tracking-widest">Citizen Login</h3>
            </div>
            
            <form>
               <div className="px-6">
                  <div className="">
                     <label className="block" htmlFor="email">
                        Email
                     </label>
                     <input
                        type="email"
                        name="loginName"
                        value={login.loginName}
                        onChange={(e) => handleChange(e)}
                        placeholder="email"
                        className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"
                     ></input>
                  </div>
                  <div className="my-4">
                     <label className="block" htmlFor="password">
                        Password
                     </label>
                     
                     <input
                        type="password"
                        name="password"
                        value={login.password}
                        onChange={(e) => handleChange(e)}
                        placeholder="password"
                        className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"
                     ></input>
                  </div>
                  <div className="flex xl:flex-col gap-4">
                     <button
                        onClick={(e) => handleLoginCitizen(e)}
                        className="w-full px-6 py-2 mt-4 text-white bg-gradient-to-tr from-blue-400 to-blue-600 rounded hover:bg-gradient-to-tr hover:from-purple-400 hover:to-purple-600 shadow shadow-blue-300 hover:shadow-md hover:shadow-purple-300"
                     >
                        Login
                     </button>
                  </div>
               </div>
            </form>
            <div className='p-6'>
               <button className="w-full px-6 py-2 bg-gradient-to-tr from-pink-400 to-pink-600 shadow-md shadow-pink-300 rounded hover:bg-gradient-to-tr hover:from-purple-400 hover:to-purple-600 hover:rounded hover:shadow-md hover:shadow-purple-300  text-white" onClick={() => goToOfficerLogin()}>Go to Officer Login</button>
            </div>
         </div>
      )}else if(page === 1){
         return(
            <div className="text-left bg-white shadow-lg rounded w-96">
            <div className='bg-gradient-to-tr from-purple-400 to-purple-600 shadow-md shadow-purple-300 rounded relative -left-4 -top-6 flex'>
               <h3 className="text-xl font-bold text-center text-white p-6 tracking-widest">Officer Login</h3>
            </div>
            <form>
               <div className="px-6">
                  <div className="">
                     <label className="block" htmlFor="email">
                        Email
                     </label>
                     <input
                        type="email"
                        name="loginName"
                        value={login.loginName}
                        onChange={(e) => handleChange(e)}
                        placeholder="email"
                        className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"
                     ></input>
                  </div>
                  <div className="my-4">
                     <label className="block" htmlFor="password">
                        Password
                     </label>
                     <input
                        type="password"
                        name="password"
                        value={login.password}
                        onChange={(e) => handleChange(e)}
                        placeholder="password"
                        className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"
                     ></input>
                  </div>
                  <div className="flex xl:flex-col gap-4">
                     <button
                        onClick={(e) => handleLoginOfficer(e)}
                        className="w-full px-6 py-2 mt-4 text-white bg-gradient-to-tr from-blue-400 to-blue-600 rounded hover:bg-gradient-to-tr hover:from-pink-400 hover:to-pink-600 shadow shadow-blue-300 hover:shadow-md hover:shadow-pink-300"
                     >
                        Sign In
                     </button>
                  </div>
               </div>
            </form>
            <div className='p-6'>
               <button className="w-full px-6 py-2 bg-gradient-to-tr from-purple-400 to-purple-600 shadow-md shadow-purple-300 rounded hover:bg-gradient-to-tr hover:from-pink-400 hover:to-pink-600 hover:rounded hover:shadow-md hover:shadow-pink-300  text-white" onClick={() => goToCitizenLogin()}>Go to Citizen Login</button>
            </div>
         </div>
         )
      }
   }

	return (
		<div className="flex flex-grow items-center justify-center bg-gray-100">
         <div>
            {PageDisplay()}
         </div>
		</div>
	);
};

export default Login;
