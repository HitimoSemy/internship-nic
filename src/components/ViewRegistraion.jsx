import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService';
import OfficerServices from '../services/OfficerServices';
import logo from "../icons/nicwhitelogo.png"
import logoA from "../icons/ashok.png"

const ViewRegistraionCertificate = () => {
   const loc = useLocation();
   const id = loc.state.appId;
   const navigate = useNavigate();
   const [body, setBody] = useState({
    

      registrationApplicationForm:'',

      applicantName: '',
      address: '',
      pincode: '',
      employerStatus: '',
      appDate: '',
      estdName: '',
      estdAddress: '',
      district: '',
      taxCircle: '',
      employerClass: '',
      estdDescr: '',

      registrationEmployees: '',

      registrationActs: '',

      registrationExtraEstablishments: ''
   });


   const user = AuthService.getCurrentUser();

   const [approveRegistration, setApproveRegistration] = useState({
      officerId: '',
      regtId:''
   });

   const [estdList, setEstdList] = useState([]);

   const [empList, setEmpList] = useState([]);

   const [actsList, setActsList] = useState([]);

   useEffect(() => {
		let unmounted = false;
		async function getCircCharacters() {
         const response = await axios.get('http://localhost:8080/api/officer/viewRegistration/'+ id);
         const body = response.data;
         if(!unmounted){
            setBody({ registrationApplicationForm: body.registrationApplicationForm, applicantName: body.applicantName, address: body.address, pincode: body.pincode, employerStatus: body.employerStatus, appDate: body.appDate ,estdName: body.estdName, estdAddress: body.estdDescr, district: body.district , taxCircle: body.taxCircle , employerClass: body.employerClass, estdDescr: body.estdDescr});
            setApproveRegistration({officerId: user.officerId, regtId: body.registrationApplicationForm})
            if(body.registrationApplicationExtraEstablishments !== undefined || null){
               
               setEstdList(body.registrationApplicationExtraEstablishments.map(({estdName, estdAddress})  => ({estdName: estdName, estdAddress: estdAddress})))
            }
            if(body.registrationEmployeeLists !== undefined || null){
               setEmpList(body.registrationEmployeeLists.map(({employeeName, employeeStatus, employeeGrossPay, employeeTaxPayable}) => ({employeeName: employeeName, employeeStatus:{ statusId: employeeStatus} , employeeGrossPay: employeeGrossPay, employeeTaxPayable: employeeTaxPayable})))
            }
            if(body.registrationApplicationActs !== undefined || null){
               
               setActsList(body.registrationApplicationActs.map(({acts, certificateRegistrationNumber, logDate}) => ({acts:{actId:acts} , certificateRegistrationNumber: certificateRegistrationNumber, logDate: logDate})))
            }         
         }
		}
		getCircCharacters();
		return () => {
			unmounted = true;
		};
	}, [id, user.officerId]);

   const employeeTable = empList.map((info) => {
		return (
			<tr key={info.employeeName} className='text-center bg-slate-50'>
				<td>{info.employeeName}</td>
				<td>{info.employeeStatus.statusId}</td>
				<td>{info.employeeGrossPay}</td>
				<td>{info.employeeTaxPayable}</td>
			</tr>
		);
	}, [empList]);

   const actsTable = actsList.map((info) => {
		return (
			<tr key={info.acts.actId} className='text-center bg-slate-200'>
				<td>{info.acts.actId}</td>
				<td>{info.certificateRegistrationNumber}</td>
				<td>{info.logDate}</td>
			</tr>
		);
	}, [empList]);

   const estdTable = estdList.map((info) => {
		return (
			<tr key={info.estdName} className='text-center bg-slate-200'>
				<td>{info.estdName}</td>
				<td>{info.estdAddress}</td>
			</tr>
		);
	}, [estdList]);



   
   
   const handleSubmit = (e) =>{
      OfficerServices.newRegistration(approveRegistration).then(() => {
         // window.history.back(navigate('/officerHome'), '/officerHome');
         window.history.pushState(navigate('/officerHome'), '/officerHome');
         alert('registration approval successfully');
      },
      (error) => {
         console.log(error.toString());
      })
   }

   return (
      <div className="flex flex-grow justify-center items-center p-5 bg-gray-100">
			<div className="h-full w-4/5 rounded overflow-auto">
				<div className='bg-gradient-to-tr from-blue-400 to-blue-600 p-4 text-white tracking-wider shadow-md shadow-blue-300 text-lg rounded flex flex-row justify-between items-center'>
               <div className="flex w-1/5 justify-start h-auto">
                  <img src={logoA} alt="emblem" className=" h-32 -top-8"></img>
               </div>
            
            
               <div className="text-center tracking-wider w-full">
						<p className='font-bold text-base'>THE MEGHALAYA PROFESSIONS, TRADES, CALLINGS AND EMPLOYMENTS TAXATION RULES</p>
						<p className='text-md'>Application for Certificate of Registration</p>
					</div>
               
					
               <div className="flex w-1/5 justify-end items-top -top-8 h-full">
                  <img src={logo} alt="nic logo" className=" h-20 -top-12"></img>
               </div>
            </div>
            <form className='p-8 pt-10'>	
					<div className="mb-10 rounded bg-white shadow">
                  <p className="bg-gradient-to-tr from-orange-400 to-orange-600 p-4 tracking-wider shadow-md shadow-orange-300 relative -left-4 -top-4 w-2/5 rounded text-white">Applicantion Form</p>
						<div className="flex felx-wrap flex-row gap-3 px-4 pb-4 items-center">
                     <label className="block text-sm font-normal py-2">
                        Application Number : 
                     </label>
                     <p className="border-2 border-gray-200 px-8 py-1 w-auto rounded bg-gray-50">{body.registrationApplicationForm}</p>
                     <label className="block text-sm font-normal py-2">
                        Application Date : 
                     </label>
                     <p className="border-2 border-gray-200 px-8 py-1 w-auto rounded bg-gray-50">{body.appDate}</p>
                  </div>
                  <div className="flex felx-wrap gap-3 px-4">
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									Name<span className="text-red-600 font-normal">*</span>
								</label>
								<p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.applicantName}</p>
							</div>
							<div className="md:w-2/3">
								<label className="block text-sm font-normal pb-2">
									Address<span className="text-red-600 font-normal">*</span>
								</label>
								<p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.address}</p>
							</div>
						</div>
						<div className="flex felx-wrap gap-3 p-4">
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									Pincode<span className="text-red-600 font-normal">*</span>
								</label>
								<p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.pincode}</p>
							</div>
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									Status<span className="text-red-600 font-normal">*</span>
								</label>
								<p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.employerStatus}</p>
							</div>
						</div>
					
                  <div className="flex felx-wrap gap-3 px-4">
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									Name<span className="text-red-600 font-normal">*</span>
								</label>
								<p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.estdName}</p>
							</div>
							<div className="md:w-2/3">
								<label className="block text-sm font-normal pb-2">
									Address<span className="text-red-600 font-normal">*</span>
								</label>
								<p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.estdAddress}</p>
							</div>
						</div>
						<div className="flex felx-wrap gap-3 p-4">
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									District<span className="text-red-600 font-normal">*</span>
								</label>
								<p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.district}</p>
							</div>
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									Circle<span className="text-red-600 font-normal">*</span>
								</label>
								<p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.taxCircle}</p>	
							</div>
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									Employer Class<span className="text-red-600 font-normal">*</span>
								</label>
                        <p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.employerClass}</p>	
							
							</div>
						</div>
						<div className="md:w-full p-4">
							<label className='block text-sm font-normal pb-2'>
								Description of goods and or services supplied<span className="text-red-600 font-normal">*</span>
							</label>
							<p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.estdDescr}</p>	
						</div>
                  <div className='pb-4'>
                     <label className="relative flex justify-left items-center w-4/6 grouptext-xl"> <p className='pl-4 pb-2'>Employees List</p>
                     </label>
                     <table className="table-auto w-full border-separate px-4">
							<thead className="bg-zinc-700 text-white text-sm">
								<tr>
									<th className="border border-slate-500 p-2">Employee Name</th>
									<th className="border border-slate-500 p-2">Designation</th>
									<th className="border border-slate-500 p-2">Total Gross annual Income</th>
									<th className="border border-slate-500 p-2">Tax payable quarterly</th>
								</tr>
							</thead>
							<tbody className="bg-zinc-200 border border-slate-500 p-2">{employeeTable}</tbody>
						</table>
                  </div>
                  
                  <div className='pb-4'>
                     <label className="relative flex justify-left items-center w-4/6 grouptext-xl"> <p className='pl-4 pr-2'>Other establishments in Meghalaya</p>
                        
                     </label>
                     
                           <table className="table-auto w-full border-separate p-4">
							         <thead className="bg-zinc-700 text-white text-sm">
								         <tr>
                                    <th className="border border-slate-500 p-2">Establishment Name</th>
                                    <th className="border border-slate-500 p-2">Address</th>
								         </tr>
							         </thead>
							         <tbody className="bg-zinc-200 border border-slate-500 p-2">{estdTable}</tbody>
						         </table>
                     
                      
                     
                  </div>
                  
                  <div className='pb-4'>
                     <label className="relative flex justify-left items-center w-4/6 grouptext-xl"> <p className='pl-4 pr-2'>Registered Certifiactes</p>
                        
                     </label>
                        <table className="table-auto w-full border-separate p-4">
                           <thead className="bg-zinc-700 text-white text-sm">
                              <tr>
                                 <th className="border border-slate-500 p-2">Act Title</th>
                                 <th className="border border-slate-500 p-2">Certificate Registration Number</th>
                                 <th className='border border-slate-500 p-2'>Certificate Log Date</th>
                              </tr>
                           </thead>
                           <tbody className="bg-zinc-200 border border-slate-500 p-2">{actsTable}</tbody>
                        </table>
                  </div>
					
              
					
               
                  <div className='flex flex-row gap-4 justify-center w-full p-3'>
                     <button onClick={(e) => handleSubmit(e)} className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded shadow-md shadow-blue-300 hover:bg-gradient-to-tr hover:from-green-400 hover:to-green-600 hover:rounded hover:shadow-md hover:shadow-green-300  tracking-wider text-white py-2 w-28 mb-4">Approve</button>
                     <button disabled onClick={handleSubmit} className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded shadow-md shadow-blue-300 hover:bg-gradient-to-tr hover:from-red-400 hover:to-red-600 hover:rounded hover:shadow-md hover:shadow-red-300  tracking-wider text-white py-2 w-28 mb-4">Reject</button>
                  </div>
               </div>
				</form>
			</div>
		</div>
	);
}

export default ViewRegistraionCertificate