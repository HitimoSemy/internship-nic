import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import logo from "../icons/nicwhitelogo.png"
import logoA from "../icons/ashok.png"
import { Link } from "react-router-dom";

import PrintEnrollmentCertificate from './PrintEnrollmentCertificate';

const EnrollmentCertificate = () => {
   const user = AuthService.getCurrentUser();

   const [body, setBody] = useState({
      enrlId: '',
      officer: '',
      approvalDate: '',
      address:'',
      applicantName: '',
      employerStatus: '',
      estdName: '',
      estdAddress: '',
      taxCircle: '',
      employeeType: ''
   });
   
   const [employerList, setEmployerList] = useState([]);
   
   const [workplaceList, setWorkplaceList] = useState([]);
   
   const [actsList, setActsList] = useState([]);
   
   useEffect(() => {
      let unmounted = false;
      async function getCircCharacters() {
         const response = await axios.get('http://localhost:8080/api/citizen/enrolmentCertificate/'+ user.citizenId);
         const body = response.data;
         if(!unmounted){
            setBody({enrlId: body.enrlId, officer: body.officer, applicantName: body.applicantName, estdName: body.estdName, estdAddress: body.estdAddress, taxCircle: body.taxCircle, employeeType: body.employeeTypes, approvalDate: body.approvalDate});
            setEmployerList(body.enrollmentForeignEmployers.map(({employerName, employerAddress, monthlyPay})  => ({employerName: employerName, employerAddress: employerAddress, monthlyPay: monthlyPay})))
            setWorkplaceList(body.enrollmentOtherPlaceOfWorks.map(({estdName, estdAddress}) => ({estdName: estdName, estdAddress: estdAddress})))
            setActsList(body.enrollmentActs.map(({acts, certificateRegistrationNumber, logDate}) => ({acts: acts, certificateRegistrationNumber: certificateRegistrationNumber, logDate: logDate})))  
         }
      }
      getCircCharacters();
      return () => {
         unmounted = true;
      };
   }, [user.citizenId]);
   
   const employeerTable = employerList.map((info) => {
      return (
         <tr className='text-center bg-slate-200'>
            <td>{info.employerName}</td>
            <td>{info.employerAddress}</td>
            <td>{info.monthlyPay}</td>
         </tr>
      );
   }, [employerList]);
   
   const actsTable = actsList.map((info) => {
      return (
         <tr className='text-center bg-slate-200'>
            <td>{info.acts}</td>
            <td>{info.certificateRegistrationNumber}</td>
            <td>{info.logDate}</td>
         </tr>
      );
   }, [actsList]);
   
   const opowTable = workplaceList.map((info) => {
      return (
         <tr className='text-center bg-slate-200'>
            <td>{info.estdName}</td>
            <td>{info.estdAddress}</td>
         </tr>
      );
   }, [workplaceList]);

   return (
      <div className='flex flex-grow bg-slate-50 px-10 py-2 justify-center'>
         <div className='pt-8 flex flex-grow flex-col justify-center items-center gap-4 overflow-auto'>
               <div className="flex justify-between gap-4 w-full">
                  <PrintEnrollmentCertificate/>
                  <Link to={'/enrollment'} className="w-full"><button className='bg-gradient-to-tr from-blue-400 to-blue-600 p-4 tracking-widest shadow-md shadow-blue-300 py-2 px-4 hover:shadow-md h-16 rounded text-white w-full hover:bg-gradient-to-tr hover:from-pink-400 hover:to-pink-600 hover:shadow-pink-300'>Apply for Ammendment</button></Link>
                  <Link to={'/enrlCancelApp'} state={{enrlId: body.enrlId}} className="w-full"><button className='bg-gradient-to-tr from-blue-400 to-blue-600 p-4 tracking-widest shadow-md shadow-blue-300 py-2 px-4 hover:shadow-md h-16 rounded text-white w-full hover:bg-gradient-to-tr hover:from-pink-400 hover:to-pink-600 hover:shadow-pink-300'>Apply for Cancellation</button></Link>
               </div>
               <div className='flex flex-col w-full rounded bg-white shadow-md'>
           
               <div className='bg-gradient-to-tr from-pink-400 to-pink-600 h-auto text-white tracking-wider shadow-sm shadow-pink-300 text-lg rounded w-full items-center flex flex-col p-8'>
                     
                     <div className="flex w-full justify-start h-auto relative">
                        <img src={logoA} alt="emblem" className="absolute h-40 -top-8"></img>
                     </div>
                  
                     <p className="text-center text-xl pb-2 tracking-wider font-semibold">OFFICE OF THE SUPERINTENDENT OF TAXES, {body.taxCircle}</p>
                     <p className="text-center text-sm pb-4 tracking-wider">The Meghalaya Professions, Trades, Callings & Employments Taxation Rules</p>
                     <p className="text-center text-xl font-bold tracking-widest">CERTIFICATE OF ENROLMENT</p>
                     <div className="flex w-full justify-end items-top -top-8 h-full relative">
                        <img src={logo} alt="nic logo" className="absolute h-16 -top-12"></img>
                     </div>
                  </div>
                  <div className='flex-col flex p-8 tracking-wider leading-loose'>
                        <div className='flex-row flex gap-2'>
                           <p>Enrolment Number: <span className="shadow border bg-stone-50 shadow-stone-50 py-1 px-4 rounded">{body.enrlId}</span></p>
                        </div>
                     <div className='flex-row flex-wrap flex gap-6 pt-6 text-justify'>
                        <p>This is to certify that the Shri / Smti <span className='border rounded shadow bg-stone-50 shadow-stone-50 py-1 px-4 w-auto'>{body.applicantName}</span> engaged in the <span className='border rounded shadow bg-stone-50 shadow-stone-50 py-1 px-4 mx-2 w-auto'>{body.employeeType}</span>  known as <span className='border rounded shadow bg-stone-50 shadow-stone-50 py-1 px-4 w-auto'>{body.estdName}</span>  located at <span className='border rounded shadow bg-stone-50 shadow-stone-50 py-1 px-4 w-auto'>{body.estdAddress}</span> has been enrolled under the Meghalaya Professions, Trades, Callings and Employments Taxation Act</p>
                     </div>
                     <div className='flex-row flex-wrap flex gap-6 pt-4 text-justify'>
                        <p>Return in the prescribed Form 1 shall be furnished by the registered tax payer in respect of each quarter of a Financial year separately on or before the last day of the following month of the quarter next. The total tax payable shall be with reference to the total annual gross income as specified in the Schedule annexed to the Act divided by 12 (twelve) multiplied by the number of months or fraction of a month as applicable for which salary was paid during the quarter of the Financial year and the receipted challan in token of payment of the tax shall be attached to the return</p>
                     </div>
                     
                     <div className="flex-row flex-wrap flex gap-6 pt-6 text-justify">
                        <p>Date: <span className="shadow border bg-stone-50 shadow-stone-50 py-1 px-4 rounded">{body.approvalDate}</span></p>
                        <p>AO-Code: <span className="shadow border bg-stone-50 shadow-stone-50 py-1 px-4 rounded">{body.officer}</span></p>
                     </div>
                     <div className='flex-row flex-wrap flex gap-6 pt-6'>
                        <p>The holder of this Certificate has additional Workplaces at the following addresses:</p>
                     </div>
                     <div className='flex'>
                           <table className="table-auto w-full border-separate p-3">
                              <thead className="bg-slate-500 text-white text-sm">
                                 <tr>
                                    <th className="p-2">Name:</th>
                                    <th className="p-2">Address</th>
                                 </tr>
                              </thead>
                              <tbody className="p-2">{opowTable}</tbody>
                           </table>
                        </div>
                        <div className=''>
                        <p>Registered Certificates</p>
                     </div>
                        <div className=''>
                           <table className="table-auto w-full border-separate p-3">
                              <thead className="bg-slate-500 text-white text-sm">
                                 <tr>
                                    <th className="p-2">Act Name:</th>
                                    <th className="p-2">Registered Certificate Number</th>
                                    <th className="p-2">Date Of Issue</th>
                                 </tr>
                              </thead>
                              <tbody className="p-2">{actsTable}</tbody>
                           </table>
                        </div>
                     
                  
                        <div className=' tracking-wider rounded w-full relative  items-center flex'>
                           <p>Other Foreign Employers</p>
                        </div>
                        <div className='flex pb-4'>
                        <table className="table-auto w-full border-separate p-3">
                           <thead className="bg-slate-500 text-white text-sm">
                              <tr>
                                 <th className="p-2">Employer Name</th>
                                 <th className="p-2">Employer Address</th>
                                 <th className="p-2">Monthly Pay w.r.t. Employment</th>
                              </tr>
                           </thead>
                           <tbody className="p-2">{employeerTable}</tbody>
                        </table>
                     </div>
                     
                  </div>
                  
               </div>
         </div>
      </div>
   )
}

export default EnrollmentCertificate