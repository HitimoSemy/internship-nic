import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/AuthService';
import OfficerServices from '../services/OfficerServices';
import logo from "../icons/nicwhitelogo.png"
import logoA from "../icons/ashok.png"

const ViewEnrollment = () => {
   const loc = useLocation();
   const id = loc.state.appId
   const navigate = useNavigate()
   const [body, setBody] = useState({
      appDate:'',
      
      
      enrollmentApplicationForm: '',
      
		applicantName: '',
      estdName:'',
		estdAddress: '',
		district: '',
		pincode: '',
      taxCircle: '',
      estdDescr:'',
      employeeTypes:"",

      dateOfCommence: '',
      grossAnnual:'',
      
      enrollmentApplicationForeignEmployers:'',
      placeOfWork: '',
      enrollmentApplicationOtherPLaceOfWorks:'',
      branchCertNos:'',
      enrollmentApplicationActs:''
   });

   const user = AuthService.getCurrentUser();

   const [approveEnrollment, setApproveEnrollment] = useState({
      officerId: '',
      enrlId:''
   })

   const [foreignEmployerList, setForeignEmployerList] = useState([]);

   const [otherPowList, setOtherPowList] = useState([]);

   const [actsL, setActsL] = useState([]);

   useEffect(() => {
      let unmounted = false;
		async function getCircCharacters() {
         const response = await axios.get('http://localhost:8080/api/officer/viewEnrollment/'+ id);
         const body = response.data;
         if(!unmounted){
            
            setBody({appDate: body.appDate,  enrollmentApplicationForm: id, applicantName: body.applicantName, estdName: body.estdName ,estdAddress: body.estdAddress, district:body.district, pincode: body.pincode, taxCircle:  body.taxCircle, estdDescr: body.estdDescr, employeeTypes:body.employeeTypes , dateOfCommence:body.dateOfCommence , grossAnnual: body.grossAnnual, placeOfWork: body.placeOfWork, branchCertNos: body.branchCertNos});
            setApproveEnrollment({officerId: user.officerId, enrlId: id})
            if(body.enrollmentForeignEmployers !== undefined || null){
               setForeignEmployerList(body.enrollmentForeignEmployers.map(({ employerName, employerAddress, monthlyPay})  => ({ employerName: employerName, employerAddress: employerAddress, monthlyPay: monthlyPay})))
            }
            if(body.enrollmentOtherPlaceOfWorks !== undefined || null){
               setOtherPowList(body.enrollmentOtherPlaceOfWorks.map(({ estdName, estdAddress}) => ({ estdName: estdName, estdAddress: estdAddress})))
            }
            if(body.enrollmentActs !== undefined || null){
               setActsL(body.enrollmentActs.map(({acts, certificateRegistrationNumber, logDate}) => ({ acts:{actCode: acts} , certificateRegistrationNumber: certificateRegistrationNumber, logDate: logDate})))
            }         
         }
		}
		getCircCharacters();
		return () => {
			unmounted = true;
		};
   }, [id, user.officerId])
   
   const employeeTable = foreignEmployerList.map((info) => {
		return (
			<tr key={info.employerName} className='text-center'>
				<td>{info.employerName}</td>
				<td>{info.employerAddress}</td>
				<td>{info.monthlyPay}</td>
			</tr>
		);
	});	

   const powList = otherPowList.map((info) => {
		return (
			<tr key={info.estdName} className='text-center'>
				<td>{info.estdName}</td>
				<td>{info.estdAddress}</td>
			</tr>
		);
	});

   const actsList = actsL.map((info) => {
		return (
			<tr key={info.certificateRegistrationNumber} className='text-center'>
				<td>{info.acts.actCode}</td>
				<td>{info.certificateRegistrationNumber}</td>
            <td>{info.logDate}</td>
			</tr>
		);
	});

   

   const handleSubmit = (e) => {
      e.preventDefault();
      
         
      
      console.log(approveEnrollment)


      OfficerServices.newEnrollment(approveEnrollment).then(
         () => {
            // window.history.back(navigate('/officerHome'), '/officerHome');
            // window.history.forward(navigate('/officerHome'), '/officerHome');
		 		window.history.pushState(navigate('/officerHome'), '/officerHome');
             alert('enrollment completed');
		 	},
		 	(error) => {
		 		console.log(error.toString());
		 	})
          console.log(approveEnrollment)
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
						<p className='text-md'>Application for Certificate of Enrollment</p>
                 
					</div>
               
					
               <div className="flex w-1/5 justify-end items-top -top-8 h-full">
                  <img src={logo} alt="nic logo" className=" h-20 -top-12"></img>
               </div>
            </div>
				
            <form className='p-8 pt-10'>	
					<div className="mb-10 rounded bg-white shadow">
                  <p className="bg-gradient-to-tr from-pink-400 to-pink-600 p-4 tracking-wider shadow-md shadow-pink-300 relative -left-4 -top-4 w-2/5 rounded text-white">Applicantion Form</p>
						<div className="flex felx-wrap flex-row gap-3 px-4 pb-4 items-center">
                     <label className="block text-sm font-normal py-2">
                        Application Number : 
                     </label>
                     <p className="border-2 border-gray-200 px-8 py-1 w-auto rounded bg-gray-50">{body.enrollmentApplicationForm}</p>
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
									Establishment Name<span className="text-red-600 font-normal">*</span>
								</label> 
								
								<p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.estdName}</p>
							
							</div>
						</div>
						<div className="flex felx-wrap gap-3 p-4 ">
                  <div className="md:w-2/3">
								<label className="block text-sm font-normal pb-2">
									Establishment Address<span className="text-red-600 font-normal">*</span>
								</label>
								
								<p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.estdAddress}</p>
							
							</div>
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									Pincode<span className="text-red-600 font-normal">*</span>
								</label>
								<p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.pincode}</p>
							</div>
							
						</div>
                  <div className="flex felx-wrap gap-3 px-4">
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
							
						</div>
                  <div className="md:w-full px-4 pt-4">
							<label className='block text-sm font-normal pb-2'>
								Description of goods and or services supplied<span className="text-red-600 font-normal">*</span>
							</label>
							<p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.estdDescr}</p>
						</div>
                  <label className='block text-sm font-normal px-4 pt-4 pb-2'>
                     Date of commencement of Profession/Trade/Calling/Employment in Meghalaya<span className="text-red-600 font-normal">*</span>
                  </label>
                  <div className="md:w-full px-4 flex flex-row pb-4 gap-4">
                  <p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.employeeTypes}</p>
                     
                  <p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.dateOfCommence}</p>
                  </div>
                  
                  <div className="md:w-full flex felx-wrap gap-4 px-4 pb-4">
                     <div className='md:w-1/3'>
                     <label className='block text-sm font-normal pb-2'>Gross annual income in last financial year<span className="text-red-600 font-normal">*</span></label>
                     <p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.grossAnnual}</p>
                     </div>
                     <div className='md:w-1/3'>
                     <label className='block text-sm font-normal pb-2'>Principal place of work<span className="text-red-600 font-normal">*</span></label>
                     <p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.placeOfWork}</p>
                     </div>
                     <div className='md:w-1/3'>
                     <label className='block text-sm font-normal pb-2'>No of Branch Certificates<span className="text-red-600 font-normal">*</span></label>
                     <p className="border-2 border-gray-200 p-2 w-auto rounded bg-gray-50">{body.branchCertNos}</p>
                     </div>
                  </div>
                  <div className='pb-4'>
                     {employeeTable === []? null: (<>
                        <label className="relative flex justify-left items-center w-4/6 grouptext-xl"> <p className='pl-4 pr-2'>Foreign Employment Details</p>
                     </label>
                     
                           <table className="table-auto w-full border-separate p-4">
                           <thead className="bg-zinc-700 text-white text-sm">
                              <tr>
                                 <th className="border border-slate-500 p-2">Employer Name</th>
                                 <th className="border border-slate-500 p-2">Employer Address</th>
                                 <th className="border border-slate-500 p-2">Monthly Income</th>
                              </tr>
                           </thead>
                           <tbody className="bg-zinc-200 border border-slate-500 p-2">{employeeTable}</tbody>
                        </table>
                     </>)}
                     
                        
                  </div>
                  <div className='pb-4'>
                     {powList === []? null:(<>
                        <label className="relative flex justify-left items-center w-4/6 grouptext-xl"> <p className='pl-4 pr-2'>Other places of work, in the State</p>
                        
                        </label>
                           <table className="table-auto w-full border-separate p-4">
                           <thead className="bg-zinc-700 text-white text-sm">
                              <tr>
                                 <th className="border border-slate-500 p-2">Establishment Name</th>
                                 <th className="border border-slate-500 p-2">Establishment Address</th>
                              </tr>
                           </thead>
                           <tbody className="bg-zinc-200 border border-slate-500 p-2">{powList}</tbody>
                        </table>
                        </>)}
                    
                     
                  </div>
                  <div className='pb-4'>
                     
                     {
                        actsList === []? null :(<>
                        <label className="relative flex justify-left items-center w-4/6 grouptext-xl"> <p className='pl-4 pr-2'>Other Enrolled Acts</p>
                        
                        </label>
                           <table className="table-auto w-full border-separate p-4">
                           <thead className="bg-zinc-700 text-white text-sm">
                              <tr>
                                 <th className="border border-slate-500 p-2">Act Title</th>
                                 <th className="border border-slate-500 p-2">Enrollment Certificate No</th>
                                 <th className="border border-slate-500 p-2">Date of Issue</th>
                              </tr>
                           </thead>
                           <tbody className="bg-zinc-200 border border-slate-500 p-2">{actsList}</tbody>
                        </table>
                        </>)
                     }
                  </div>
                  <div className='flex flex-col justify-center items-center w-full p-3'>
                     
                     <div className='flex flex-row flex-wrap justify-center gap-4'>
                        <button onClick={handleSubmit} className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded shadow-md shadow-blue-300 hover:bg-gradient-to-tr hover:from-green-400 hover:to-green-600 hover:rounded hover:shadow-md hover:shadow-green-300  tracking-wider text-white py-2 w-28 mb-4">Approve</button>
                        <button disabled className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded shadow-md shadow-blue-300 hover:bg-gradient-to-tr hover:from-red-400 hover:to-red-600 hover:rounded hover:shadow-md hover:shadow-red-300  tracking-wider text-white py-2 w-28 mb-4">Reject</button>
                     </div>
                  </div>
                  
               </div>
               
				</form>
			</div>
		</div>
	);
}

export default ViewEnrollment