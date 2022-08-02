import React from 'react'
import logo from "../icons/nicwhitelogo.png"
import logoA from "../icons/ashok.png"

const About = () => {
   return (
      <div className="flex flex-grow flex-col gap-5 items-center bg-gray-100 p-4">
         <div className='bg-gradient-to-tr from-blue-400 to-blue-500 h-auto text-white tracking-wider shadow-sm shadow-blue-400 text-lg rounded w-full items-center flex flex-col p-8'> 
            <div className="flex w-full justify-start h-auto relative">
               <img src={logoA} alt="emblem" className="absolute h-32 -top-8"></img>
            </div>
            <p className="text-center text-xl pb-2 tracking-wider font-semibold">OFFICE OF THE SUPERINTENDENT OF TAXES</p>
            <p className="text-center text-sm pb-4 tracking-wider">The Meghalaya Professions, Trades, Callings & Employments Taxation Rules</p>
            <div className="flex w-full justify-end items-top -top-8 h-full relative">
               <img src={logo} alt="nic logo" className="absolute h-20 -top-12"></img>
            </div>
         </div>
         <div className='rounded shadow-md flex items-center bg-white p-8 h-1/5 w-4/5'>
            <p className='text-md tracking-wider'>Our Web Application which is accessable by all citizens of Meghalaya, which provides services to apply for Ceritficate of Registration or Enrollment  under the Meghalaya Professions, Trades, Callings and Employments Taxation Act, Apply for Amendment or cancellation of existing etc:</p>
         </div>
      </div>);
}

export default About