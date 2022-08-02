import React from 'react'
import logo from "../icons/nicwhitelogo.png"
import logoA from "../icons/ashok.png"

const Contact = () => {
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
         <div className='flex items-center gap-4 h-1/5 w-2/5'>
            <div className='w-1/2 h-full flex flex-col justify-center bg-white shadow rounded p-4'>
               <p className='text-md tracking-wider'>Help Desk (24x7)</p>
               <p className='text-md tracking-wider'>Contact No: +91 1234567890</p>
            </div>
            <div className='w-1/2 h-full flex flex-col justify-center bg-white shadow rounded p-4'>
               <p className='text-md tracking-wider'>Office Contact</p>
               <p className='text-md tracking-wider'>Contact No: +91 1234567890</p>
            </div>
         </div>
      </div>);
}

export default Contact