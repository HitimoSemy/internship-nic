import React from 'react';
import { Link } from 'react-router-dom';
const Index = () => {
	return (
      <div className="flex flex-grow justify-center items-center bg-gray-100">
         <div className='rounded shadow-md flex flex-row justify-between gap-4 bg-white p-8 h-2/5 w-4/5'>
            <div className='flex flex-col justify-center w-3/5 gap-8'>
               <p className='text-2xl tracking-wider'>Welcome to Professional Taxes Portal, Govt. of Meghalaya</p>
               <p className='text-sm tracking-wider'>We provide services for Citizens of Meghalaya to Enroll or Register for certificates under the Meghalaya Professions, Trades, Callings and Employments Taxation Act</p>
            </div>
            <div className='flex flex-col justify-center gap-4 px-12 w-2/5'>
               <div className='flex flex-row items-center justify-between'>
                  <p className='px-4 text-sm tracking-wider'>New user? Sign up here</p><Link to={'/signUp'}><button className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded shadow-md shadow-blue-300 hover:bg-gradient-to-tr hover:from-pink-400 hover:to-pink-600 hover:rounded hover:shadow-md hover:shadow-pink-300  tracking-wider text-white py-2 w-28">Sign Up</button></Link>
               </div>
               <div className='flex flex-row items-center justify-between'>
                  <p className='px-4 text-sm tracking-wider'>Have an Account? Login here</p><Link to={'/loginPage'}><button className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded shadow-md shadow-blue-300 hover:bg-gradient-to-tr hover:from-pink-400 hover:to-pink-600 hover:rounded hover:shadow-md hover:shadow-pink-300  tracking-wider text-white py-2 w-28">Login</button></Link>
               </div>
               
            </div>
         </div>
      </div>);
};

export default Index;
