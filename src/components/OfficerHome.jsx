import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import AuthService from '../services/AuthService';
import logo from "../icons/nicwhitelogo.png"
import logoA from "../icons/ashok.png"

const OfficerHome = (props) => {

   const [registrations, setRegistration] = useState([]);
  
   const [enrollments, setEnrollments] = useState([]);

   const [rl, setRl] = useState(true);
   
   const [el, setEl] = useState(true);

   const user = AuthService.getCurrentUser();

   useEffect(() => {
      let unmounted = false;
		async function getRegistrations() {
         const response = await axios.get('http://localhost:8080/api/officer/registrations/' + user.circle.circleId);
         const body = response.data;
         if(body.length > 0){
            setRl(false)
         }
         if(!unmounted){
            setRegistration(body.map(({ appId, applicantName, appDate }) => ({ appId: appId, applicantName: applicantName, appDate: appDate })));
         }
     
		}
		getRegistrations();
		return () => {
			unmounted = true;
		}; 
   }, [user.circle.circleId])

   useEffect(() => {
      let unmounted = false;
      async function getEnrollments() {
         const response = await axios.get('http://localhost:8080/api/officer/enrollments/' + user.circle.circleId);
         const body = response.data;
         if(body.length > 0){
            setEl(false)
         }
         if(!unmounted){
            setEnrollments(body.map(({enrlId, applicantName, appDate}) => ({ appId: enrlId, applicantName: applicantName, appDate: appDate})))
         }
     
      }
      getEnrollments();
      return () => {
         unmounted = true;
      };
   }, [user.circle.circleId])

   const registrationsTable = registrations.map((info) => {
      return (
         <tr className='text-center bg-slate-100' key={info.appId}>
            <td>{info.appId}</td>
            <td>{info.applicantName}</td>
            <td>{info.appDate}</td>
            <td className='bg-white'><Link to={'/viewRegistration'} state={{appId: info.appId}}><button className='h-full w-full p-1 rounded-md bg-blue-400 hover:bg-blue-500 shadow-sm hover:shadow-md hover:shadow-blue-400 shadow-blue-300 text-white'>View</button></Link></td>
         </tr>
         );
   }, [registrations]);

   const enrollmentsTable = enrollments.map((info) => {
      return(
         <tr className='text-center bg-slate-100' key={info.appId}>
            <td>{info.appId}</td>
            <td>{info.applicantName}</td>
            <td>{info.appDate}</td>
            <td className='bg-white'><Link to={'/viewEnrollment'} state={{appId: info.appId}}><button className='h-full w-full p-1 rounded-md bg-blue-400 hover:bg-blue-500 shadow-sm hover:shadow-md hover:shadow-blue-500 shadow-blue-300 text-white'>View</button></Link></td>
         </tr>
      )
   }, [enrollments]);

   

   

   return (
      <div className='px-4 bg-slate-100 flex flex-grow flex-col overflow-auto'>
         <div className='bg-gradient-to-tr from-blue-400 to-blue-500 h-auto text-white tracking-wider shadow-sm shadow-blue-400 text-lg rounded w-full items-center flex flex-col p-8 mt-4'> 
            <div className="flex w-full justify-start h-auto relative">
               <img src={logoA} alt="emblem" className="absolute h-32 -top-8"></img>
            </div>
            <p className="text-center text-xl pb-2 tracking-wider font-semibold">OFFICE OF THE SUPERINTENDENT OF TAXES</p>
            <p className="text-center text-sm pb-4 tracking-wider">The Meghalaya Professions, Trades, Callings & Employments Taxation Rules</p>
            <div className="flex w-full justify-end items-top -top-8 h-full relative">
               <img src={logo} alt="nic logo" className="absolute h-20 -top-12"></img>
            </div>
         </div>
         <div className='flex xl:flex-row w-full h-2/5'>
            <div className='w-1/2 px-4'>
               <div className='bg-gradient-to-tr from-orange-400 to-orange-600 h-12 text-white tracking-wider shadow-md shadow-orange-300 text-lg rounded w-96 relative -left-4 top-6 px-8 items-center flex'>
                  Registrations
               </div>
               <div className='bg-white shadow-md h-5/6 w-full pt-8 px-2 rounded'>
                  {rl? (
                         <div className='flex justify-center items-center h-full pb-8'>
                         <p className='p-4 tracking-wider '>You're all caught up!</p>
                      </div>
                     ): (
                        <table className="table-auto w-full border-separate p-3">
                        <thead className="bg-slate-500 text-white text-sm">
                           <tr>
                              <th className="p-2">Application No</th>
                              <th className="p-2">Applicant Name</th>
                              <th className="p-2">Submit Date</th>
                              <th className="p-2">Action</th>
                           </tr>
                        </thead>
                        <tbody className="p-2">{registrationsTable}</tbody>
                     </table>
                      )  
                  }
               </div>
            </div>
            <div className='w-1/2 px-4'>
               <div className='bg-gradient-to-tr from-pink-400 to-pink-600 h-12 text-white tracking-wider shadow-md shadow-pink-300 text-lg rounded w-96 relative -left-4 top-6 px-8 items-center flex'>
                  Enrollments
               </div>
               <div className='bg-white shadow-md h-5/6 w-full pt-8 px-2 rounded'>
                  {el ? (
                        <div className='flex justify-center items-center h-full pb-8'>
                           <p className='p-4 tracking-wider '>You're all caught up!</p>
                        </div>
                     ) :  (<table className="table-auto w-full border-separate p-3">
                     <thead className="bg-slate-500 text-white text-sm">
                        <tr>
                           <th className="p-2">Application No  </th>
                           <th className="p-2">Applicant Name</th>
                           <th className="p-2">Submit Date</th>
                           <th className="p-2">Action</th>
                        </tr>
                     </thead>
                     <tbody className="p-2">{enrollmentsTable}</tbody>
                  </table>) 
                  }
                  
               </div>
            </div>
         </div>
         <div className='flex xl:flex-row w-full h-2/5 mb-8'>
            <div className='w-1/2 px-4'>
               <div className='bg-gradient-to-tr from-blue-400 to-blue-600 h-12 text-white tracking-wider shadow-md shadow-blue-300 text-lg rounded w-96 relative -left-4 top-6 px-8 items-center flex'>
                  Amendments
               </div>
               <div className='bg-white shadow-md h-5/6 w-full pt-8 px-2 rounded'>
                 
                        <div className='flex justify-center items-center h-full pb-8'>
                           <p className='p-4 tracking-wider '>You're all caught up!</p>
                        </div>
                    
               </div>
            </div>
            <div className='w-1/2 px-4 '>
               <div className='bg-gradient-to-tr from-purple-400 to-purple-600 h-12 text-white tracking-wider shadow-md shadow-purple-300 text-lg rounded w-96 relative -left-4 top-6 px-8 items-center flex'>
                  Cancellations
               </div>
               <div className='bg-white shadow-md h-5/6 w-full pt-8 px-2 rounded'>
                  
                        <div className='flex justify-center items-center h-full pb-8'>
                           <p className='p-4 tracking-wider '>You're all caught up!</p>
                        </div>
                     
                  
               </div>
            </div>
         </div>
      </div>
   )
}

export default OfficerHome