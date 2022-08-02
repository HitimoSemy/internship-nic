import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import logo from "../icons/nicwhitelogo.png"
import logoA from "../icons/ashok.png"

export const RegtCert = React.forwardRef((props, ref) => {
   const user = AuthService.getCurrentUser();

   const [body, setBody] = useState({
      regtId: '',
      officer: '',
      approvalDate: '',
      address:'',
      applicantName: '',
      employerStatus: '',
      estdName: '',
      estdAddress: '',
      district: '',
      taxCircle: '',
      employerClass: ''
   });

   const [estdList, setEstdList] = useState([]);

   const [empList, setEmpList] = useState([]);

   const [actsList, setActsList] = useState([]);

   useEffect(() => {
		let unmounted = false;
		async function getCircCharacters() {
         const response = await axios.get('http://localhost:8080/api/citizen/registrationCertificate/'+ user.citizenId);
         const body = response.data;
         if(!unmounted){
            setBody({regtId: body.regtId, officer: body.officer, applicantName: body.applicantName, address: body.address, employerStatus: body.employerStatus, estdName: body.estdName, estdAddress: body.estdAddress, taxCircle: body.taxCircle, employerClass: body.employerClass, estdDescr: body.estdDescr, approvalDate: body.approvalDate});
            setEstdList(body.registrationExtraEstablishments.map(({estdName, estdAddress})  => ({estdName: estdName, estdAddress: estdAddress})))
            setEmpList(body.registrationEmployeeListViews.map(({employeeName, employeeStatus, employeeGrossPay, employeeTaxPayable}) => ({employeeName: employeeName, employeeStatus: employeeStatus, employeeGrossPay: employeeGrossPay, employeeTaxPayable: employeeTaxPayable})))
            setActsList(body.registrationActsListViews.map(({acts, certificateRegistrationNumber, logDate}) => ({acts: acts, certificateRegistrationNumber: certificateRegistrationNumber, logDate: logDate})))  
         }
		}
		getCircCharacters();
		return () => {
			unmounted = true;
		};
	}, [user.citizenId]);

   const employeeTable = empList.map((info) => {
		return (
			<tr className='text-center bg-slate-200'>
				<td>{info.employeeName}</td>
				<td>{info.employeeStatus}</td>
				<td>{info.employeeGrossPay}</td>
				<td>{info.employeeTaxPayable}</td>
			</tr>
		);
	}, [empList]);

   const actsTable = actsList.map((info) => {
		return (
			<tr className='text-center bg-slate-200'>
				<td>{info.acts}</td>
				<td>{info.certificateRegistrationNumber}</td>
				<td>{info.logDate}</td>
			</tr>
		);
	}, [empList]);

   const estdTable = estdList.map((info) => {
		return (
			<tr className='text-center bg-slate-200'>
				<td>{info.estdName}</td>
				<td>{info.estdAddress}</td>
			</tr>
		);
	}, [estdList]);

   return (
      <div ref={ref} className='flex flex-grow bg-slate-50 p-10 justify-center'>
         <div className='pt-2 flex flex-grow flex-col justify-center items-center overflow-auto'>
               <div className='flex flex-col w-full rounded bg-white shadow-md'>
           
                  <div className='bg-gradient-to-tr from-pink-400 to-pink-600 h-auto text-white tracking-wider shadow-sm shadow-pink-300 text-lg rounded w-full items-center flex flex-col p-8'>
                     
                     <div className="flex w-full justify-start h-auto relative">
                        <img src={logoA} alt="emblem" className="absolute h-40 -top-8"></img>
                     </div>
                  
                     <p className="text-center text-xl pb-2 tracking-wider font-semibold">OFFICE OF THE SUPERINTENDENT OF TAXES, {body.taxCircle}</p>
                     <p className="text-center text-sm pb-4 tracking-wider">The Meghalaya Professions, Trades, Callings & Employments Taxation Rules</p>
                     <p className="text-center text-xl font-bold tracking-widest">CERTIFICATE OF REGISTRATION</p>
                     <div className="flex w-full justify-end items-top -top-8 h-full relative">
                        <img src={logo} alt="nic logo" className="absolute h-16 -top-12"></img>
                     </div>
                  </div>
                  <div className='flex-col flex p-8 tracking-wider leading-loose'>
                        <div className='flex-row flex gap-2'>
                           <p>Registration Number: <span className="shadow border bg-stone-50 shadow-stone-50 py-1 px-4 rounded">{body.regtId}</span></p>
                        </div>
                     <div className='flex-row flex-wrap flex gap-6 pt-6 text-justify'>
                        <p>This is to certify that the <span className='border rounded shadow bg-stone-50 shadow-stone-50 py-1 px-4 w-auto'>{body.employerClass}</span> by the name and style <span className='border rounded shadow bg-stone-50 shadow-stone-50 py-1 px-4 w-auto'>{body.estdName}</span> and located at <span className='border rounded shadow bg-stone-50 shadow-stone-50 py-1 px-4 w-auto'>{body.estdAddress}</span> has been registered as an Employer under the Meghalaya Professions, Trades, Callings and Employments Taxation Act</p>
                     </div>
                     <div className='flex-row flex-wrap flex gap-6 pt-4 text-justify'>
                        <p>Return in the prescribed Form IV shall be furnished by the employer in respect of each quarter of a Financial year separately on or before the last day of the following month of the quarter next. The total tax payable shall be with reference to the total annual gross income as specified in the Schedule annexed to the Act divided by 12 (twelve) multiplied by the number of months or fraction of a month as applicable for which salary was paid during the quarter of the Financial year and the receipted challan in token of payment of the tax shall be attached to the return</p>
                     </div>
                     
                     <div className="flex-row flex-wrap flex gap-6 pt-6 text-justify">
                        <p>Place: <span className="shadow border bg-stone-50 shadow-stone-50 py-1 px-4 rounded">{body.address}</span></p>
                        <p>Name: <span className="shadow border bg-stone-50 shadow-stone-50 py-1 px-4 rounded">{body.address}</span></p>
                        <p>Designation: <span className="shadow border bg-stone-50 shadow-stone-50 py-1 px-4 rounded">{body.employerStatus}</span></p>
                        <p>Date: <span className="shadow border bg-stone-50 shadow-stone-50 py-1 px-4 rounded">{body.approvalDate}</span></p>
                        <p>AO-Code: <span className="shadow border bg-stone-50 shadow-stone-50 py-1 px-4 rounded">{body.officer}</span></p>
                     </div>
                     <div className='flex-row flex-wrap flex gap-6 pt-6'>
                        <p>The holder of this Certificate has additional establishment at the following addresses:</p>
                     </div>
                     <div className='flex'>
                           <table className="table-auto w-full border-separate p-3">
                              <thead className="bg-slate-500 text-white text-sm">
                                 <tr>
                                    <th className="p-2">Name:</th>
                                    <th className="p-2">Address</th>
                                 </tr>
                              </thead>
                              <tbody className="p-2">{estdTable}</tbody>
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
                           <p>List Of employees Registered with Certificate</p>
                        </div>
                        <div className='flex pb-4'>
                        <table className="table-auto w-full border-separate p-3">
                           <thead className="bg-slate-500 text-white text-sm">
                              <tr>
                                 <th className="p-2">Name</th>
                                 <th className="p-2">Designation</th>
                                 <th className="p-2">Total Gross Income Yearly</th>
                                 <th className="p-2">Tax Payable</th>
                              </tr>
                           </thead>
                           <tbody className="p-2">{employeeTable}</tbody>
                        </table>
                     </div>
                     
                  </div>

               </div>
         </div>
      </div>
   )  
})
