import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import EventBus from '../services/EventBus';
import logo from "../icons/nicwhitelogo.png"
const Navbar = () => {
   const navigate = useNavigate();

   const [board, setBoard] = useState({
		showOfficerBoard: false,
      showCitizenBoard: false,
		currentUser: undefined,
	});
   
   
   useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
         if(user.role.name === 'ROLE_CITIZEN'){
            setBoard({
               currentUser: user,
               showCitizenBoard: true,
               showOfficerBoard: false
             });
         }
         if(user.role.name === 'ROLE_OFFICER'){
            setBoard({
               currentUser: user,
               showCitizenBoard: false,
               showOfficerBoard: true
             });
         }
       }

	}, []);

   EventBus.on('logout', () => {
		logout();
	});
   
	const logout = () => {
		AuthService.logout();
		window.location.reload();
		setBoard({
			showCitizenBoard: false,
			showOfficerBoard: false,
			currentUser: undefined,
		});
		EventBus.remove('logout');
		window.history.replaceState(navigate('/index'), '/index');
	};


	return (
		<div className="w-full sticky z-10 top-0 shadow">
			<nav className="flex flex-wrap justify-between items-center h-16 px-6 bg-gradient-to-tr from-indigo-600 to-indigo-700 shadow shadow-indigo-500 text-slate-50">
            <div className='flex flex-row gap-2'>
               <div>
                  <img src={logo} alt={"niclogo"} className='h-12'></img>
               </div>
               <div className="flex flex-col text-left tracking-widest">
                  <p className="font-medium text-md">Professional Taxes</p>
                  <p className="font-light text-xs">Govt. Of Meghalaya</p>
               </div>
            </div>
				
				<div className="flex gap-8">
					<div>
                  {board.showCitizenBoard ? (
                     <Link to={'/citizenHome'}><button className="hover:bg-indigo-500 hover:shadow-md p-3 rounded focus:outline-none">Home</button></Link>
                  ) : null}
                  {board.showOfficerBoard ? (
                     <Link to={'/officerHome'}><button className="hover:bg-indigo-500 hover:shadow-md p-3 rounded focus:outline-none">Home</button></Link>
                  ) : null}
                  <Link to={'/about'}><button className="hover:bg-indigo-500 hover:shadow-md p-3 rounded focus:outline-none">About</button></Link>
						<Link to={'/contact'}><button className="hover:bg-indigo-500 hover:shadow-md p-3 rounded focus:outline-none">Contact</button></Link>
						
					</div>
					<div>
                  {!board.currentUser ? (
                     <>
                     <Link to={'/signUp'}><button className="hover:bg-indigo-500 hover:shadow-md p-3 rounded focus:outline-none">Sign Up</button></Link>
                     <Link to={'/loginPage'}><button className="hover:bg-indigo-500 hover:shadow-md p-3 rounded focus:outline-none">Login</button></Link>
                  </>
                     
                  ) : (<a href='/index' onClick={() => logout()}><button className="hover:bg-indigo-500 hover:shadow-md p-3 rounded focus:outline-none">Logout</button></a>
                  )}
						
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
