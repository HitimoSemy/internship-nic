import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthService from '../services/AuthService';
import EnrolForeignnEmployerTable from '../common/EnrolForeignEmployerTable';
import EnrolOtherPow from '../common/EnrolOtherPow';
import EnrolActs from '../common/EnrolActs';
import CitizenServices from '../services/CitizenServices';
import { useNavigate } from 'react-router-dom';
import logo from "../icons/nicwhitelogo.png"
import logoA from "../icons/ashok.png"

const Enrollment = () => {

   const navigate = useNavigate();

	const [enrollment, setEnrollment] = useState({
		citizen: {
         citizenId:''
      },
		applicantName: '',
      branchCertNos: '',
		pincode: '',
		estdName: '',
		estdAddress: '',
      grossAnnual: '',
      district:'',
      taxCircle:'',
      estdDescr:'',
      employeeTypes: '',
      dateOfCommence: '',
      placeOfWork: '',
      enrollmentApplicationForeignEmployers:'',
      enrollmentApplicationOtherPLaceOfWorks:'',
      enrollmentApplicationActs:''
	});

   const user = AuthService.getCurrentUser();

	const handleChange = (e) => {
		const value = e.target.value;
		setEnrollment({ ...enrollment, [e.target.name]: value });
	};

   
   
   const [taxCirc, setTaxCirc] = useState({
      circleId:'',
      district:{
         distId: ''
      }
   })

   const handeleCirlceChange = (e) => {
      const val = e.target.value;
      setTaxCirc({...taxCirc, circleId: val})
   }

   const [dist, setDist] = useState({
      distId:''
   });

   const handleDistChange = (e) => {
      const val = e.target.value;
      setDist({distId:val })
      setTaxCirc({...taxCirc, district:{distId: val}});
   }
   const [loading, setLoading] = useState(true);

  
   const [types, setTypes] = useState([{
      typeId: '',
   }]);
   
   const handleTypeChange = (e) => {
      const val = e.target.value;
      setTypes({typeId: val})
   }

   const [typeItems, setTypeItems] = useState([]);
   useEffect(() => {
		let unmounted = false;
		async function getCharacters() {
			const response = await axios.get('http://localhost:8080/api/misc/employeeTypes');
			const body = response.data;
			if (!unmounted) {
				setTypeItems(body.map(({ typeId, typeName }) => ({ typeName: typeName, typeId: typeId})));
				setLoading(false);
			}
		}
		getCharacters();
		return () => {
			unmounted = true;
		};
	}, []);
   
   const [districtItems, setDistrictItems] = useState([]);

   useEffect(() => {
		let unmounted = false;
		async function getCharacters() {
			const response = await axios.get('http://localhost:8080/api/misc/district');
			const body = response.data;
			if (!unmounted) {
				setDistrictItems(body.map(({ distId, distName }) => ({ distName: distName, distId: distId })));
				setLoading(false);
			}
		}
		getCharacters();
		return () => {
			unmounted = true;
		};
	}, []);

   const [taxCircleItems, setTaxCircleItems] = useState([]);

   useEffect(() => {
		let unmounted = false;
		async function getCircCharacters() {
         if(dist.distId !== '') {
            const response = await axios.get('http://localhost:8080/api/misc/taxCircle/' + dist.distId);
            const body = response.data;
            if(!unmounted){
               setTaxCircleItems(body.map(({ circleId, circleName }) => ({ circleName: circleName, circleId: circleId })));
               setLoading(false);
            }
         }	
		}
		getCircCharacters();
		return () => {
			unmounted = true;
		};
	}, [dist.distId]);

	

   const handleSubmit = (e) => {
      e.preventDefault();
      enrollment.citizen.citizenId = user.citizenId;
      if(foreignEmployerList.length !== 0 || []){
         enrollment.enrollmentApplicationForeignEmployers = foreignEmployerList;
      }
      if(otherPowList.length !== 0 || []){
         enrollment.enrollmentApplicationOtherPLaceOfWorks = otherPowList;
      }
      if(actsL.length !== 0 || []){
         enrollment.enrollmentApplicationActs = actsL
      }
      enrollment.employeeTypes = types;
     
      enrollment.district = dist;
      enrollment.taxCircle = taxCirc;

      console.log(enrollment)


      CitizenServices.newEnrollment(enrollment).then(
         () => {
		 		window.history.pushState(navigate('/citizenHome'), '/citizenHome');
             alert('enrollment completed');
		 	},
		 	(error) => {
		 		console.log(error.toString());
		 	})
  
   }

   const [foreignEmployer, showForeignEmployer] = useState(false);

   const handleShowForeignEmployer = (e) => {
      
      if (foreignEmployer){
         showForeignEmployer(false);
      }else{
         showForeignEmployer(true);
      }
   }

   const [foreignEmployerList, setForeignEmployerList] = useState([]);

	const employeeTable = foreignEmployerList.map((info) => {
		return (
			<tr key={info.id} className='text-center'>
				<td>{info.id}</td>
				<td>{info.employerName}</td>
				<td>{info.employerAddress}</td>
				<td>{info.monthlyPay}</td>
			</tr>
		);
	}, [foreignEmployerList]);

   const addEmployer = (data) => {
		const totalEmployer = foreignEmployerList.length;
      if(totalEmployer === 0 || null){
         data.id = 1;
      }else{
         data.id = totalEmployer + 1;
      }
      const powLists = [...foreignEmployerList];
		powLists.push(data);
		setForeignEmployerList(powLists);
	};

   
   const [otherPow, showOtherPow] = useState(false);

   const handleShowOtherPow = (e) => {
      
      if (otherPow){
         showOtherPow(false);
      }else{
         showOtherPow(true);
      }
   }

   const [otherPowList, setOtherPowList] = useState([]);

	const powList = otherPowList.map((info) => {
		return (
			<tr key={info.id} className='text-center'>
				<td>{info.id}</td>
				<td>{info.estdName}</td>
				<td>{info.estdAddress}</td>
			</tr>
		);
	}, [otherPowList]);


	const addEstablishment = (data) => {
		const totalEstd = otherPowList.length;
      if(totalEstd === 0 || null){
         data.id = 1;
      }else{
         data.id = totalEstd + 1;
      }
      const powLists = [...otherPowList];
		powLists.push(data);
		setOtherPowList(powLists);
	};

   const [acts, showActs] = useState(false);

   const handleShowActs = (e) => {
      
      if (acts){
         showActs(false);
      }else{
         showActs(true);
      }
   }

   const [actsL, setActsL] = useState([]);

	const actsList = actsL.map((info) => {
		return (
			<tr key={info.id} className='text-center'>
				<td>{info.id}</td>
				<td>{info.acts.actCode}</td>
				<td>{info.certificateRegistrationNumber}</td>
            <td>{info.logDate}</td>
			</tr>
		);
	}, [actsL]);


	const addActs = (data) => {
		const totalActs = actsL.length;
      if(totalActs === 0 || null){
         data.id = 1;
      }else{
         data.id = totalActs + 1;
      }
      const aList = [...actsL];
		aList.push(data);
		setActsL(aList);
	};

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
                  <p className="font-normal text-sm pl-4 tracking-wider">
							<span className="text-red-600 font-normal">*</span>marked fields are mandatory
						</p>
					</div>
               
					
               <div className="flex w-1/5 justify-end items-top -top-8 h-full">
                  <img src={logo} alt="nic logo" className=" h-20 -top-12"></img>
               </div>
            </div>
            <form className='p-8 pt-10'>	
					<div className="mb-10 rounded bg-white shadow">
                  <p className="bg-gradient-to-tr from-pink-400 to-pink-600 p-4 tracking-wider shadow-md shadow-pink-300 relative -left-4 -top-4 w-2/5 rounded text-white">Application Form</p>
						<div className="flex felx-wrap gap-3 px-4">
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									Name<span className="text-red-600 font-normal">*</span>
								</label>
								<input
									type="text"
									name="applicantName"
									placeholder="applicant name"
                           onChange={(e) => handleChange(e)}
									className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full rounded bg-gray-50"
								></input>
							</div>
							<div className="md:w-2/3">
								<label className="block text-sm font-normal pb-2">
									Establishment Name<span className="text-red-600 font-normal">*</span>
								</label>
								
								<input
									type="text"
									name="estdName"
									placeholder="address"
                           onChange={(e) => handleChange(e)}
									className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full rounded bg-gray-50"
								></input>
							
							</div>
						</div>
						<div className="flex felx-wrap gap-3 p-4 ">
                  <div className="md:w-2/3">
								<label className="block text-sm font-normal pb-2">
									Establishment Address<span className="text-red-600 font-normal">*</span>
								</label>
								
								<input
									type="text"
									name="estdAddress"
									placeholder="address"
                           onChange={(e) => handleChange(e)}
									className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full rounded bg-gray-50"
								></input>
							
							</div>
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									Pincode<span className="text-red-600 font-normal">*</span>
								</label>
								<input
									type="text"
									name="pincode"
									placeholder="pincode"
                           onChange={(e) => handleChange(e)}
									className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full rounded bg-gray-50"
								></input>
							</div>
							
						</div>
                  <div className="flex felx-wrap gap-3 px-4">
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									District<span className="text-red-600 font-normal">*</span>
								</label>
								<select
                        defaultValue=''
                           disabled={loading}
									name='distId' 
									onChange={(e) => handleDistChange(e)} 
                           className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-full rounded">
                           <option value='' disabled multiple={false}>
										--- select district ---
									</option>
									{districtItems.map(({ distId, distName }) => (
										<option key={distId} value={distId}>
											{distName}
										</option>
									))}
                        </select>
							</div>
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									Circle<span className="text-red-600 font-normal">*</span>
								</label>
								<select 
                        defaultValue = ''
                           disabled={loading}
									name='circleId'
									onChange={(e) => handeleCirlceChange(e)} 
                           className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-full rounded">
                           <option value='' disabled multiple={false}>
										--- select circle ---
									</option>
									{taxCircleItems.map(({circleId, circleName }) => (
										<option key={circleId} value={circleId}>
											{circleName}
										</option>
									))}
                        </select>	
							</div>
							
						</div>
                  <div className="md:w-full px-4 pt-4">
							<label className='block text-sm font-normal pb-2'>
								Description of goods and or services supplied<span className="text-red-600 font-normal">*</span>
							</label>
							<textarea name='estdDescr' value={enrollment.estdDescr?? ''} onChange={(e) => handleChange(e)} className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 bg-gray-50 px-2 py-2 w-full rounded"></textarea>
						</div>
                  <label className='block text-sm font-normal px-4 pt-4 pb-2'>
                     Date of commencement of Profession/Trade/Calling/Employment in Meghalaya (Please Select whichever is applicable)<span className="text-red-600 font-normal">*</span>
                  </label>
                  <div className="md:w-full px-4 flex flex-row pb-4 gap-4">
                  <select
                        defaultValue=''
                           disabled={loading}
									name='typeId' 
									onChange={(e) => handleTypeChange(e)} 
                           className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-1/3 rounded">
                           <option value='' disabled multiple={false}>
										--- select type ---
									</option>
									{typeItems.map(({ typeId, typeName }) => (
										<option key={typeId} value={typeId}>
											{typeName}
										</option>
									))}
                        </select>
                     
                     <input type="date"
									name="dateOfCommence"
									placeholder="date of commence"
                           onChange={(e) => handleChange(e)}
									className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-1/3 text-sm rounded bg-gray-50"></input>
                  </div>
                  
                  <div className="md:w-full flex felx-wrap gap-4 px-4 pb-4">
                     <div className='md:w-1/3'>
                     <label className='block text-sm font-normal pb-2'>Gross annual income in last financial year<span className="text-red-600 font-normal">*</span></label>
                        <input  type="text"
									name="grossAnnual"
                           value={enrollment.grossAnnual?? ''}
									placeholder="annual gross income"
                           onChange={(e) => handleChange(e)}
									className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"></input>
                     </div>
                     <div className='md:w-1/3'>
                     <label className='block text-sm font-normal pb-2'>Principal place of work<span className="text-red-600 font-normal">*</span></label>
                        <input  type="text"
									name="placeOfWork"
									placeholder="principal work place"
                           onChange={(e) => handleChange(e)}
									className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"></input>
                     </div>
                     <div className='md:w-1/3'>
                     <label className='block text-sm font-normal pb-2'>No of Branch Certificates<span className="text-red-600 font-normal">*</span></label>
                        <input  type="number"
									name="branchCertNos"
									placeholder='1/2/..'
                           value={enrollment.branchCertNos??''}
                           onChange={(e) => handleChange(e)}
									className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"></input>
                     </div>
                  </div>
                  <div className='pb-4'>
                     <label class="relative flex justify-left items-center w-4/6 grouptext-xl"> <p className='pl-4 pr-2'>An employee of any diplomatic/consular office/trade commissioner of any foreign country? </p>
                        <button onClick={(e) => handleShowForeignEmployer(e)} className="bottom-3">
                           <input type="checkbox" className="absolute -translate-x-1/2 w-full h-full peer appearance-none rounded-md group-hover:cursor-pointer hover:cursor-pointer" />
                           <span className="w-8 h-5 flex items-center flex-shrink-0 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-amber-400 after:w-3 after:h-3 after:bg-white after:rounded-full after:shadow-sm after:duration-300 peer-checked:after:translate-x-3 group-hover:cursor-pointer"></span>
                        </button>
                     </label>
                     {
                        foreignEmployer? (<>
                           <table className="table-auto w-full border-separate p-4">
                           <thead className="bg-zinc-700 text-white text-sm">
                              <tr>
                                 <th className="border border-slate-500 p-2">Sl. No</th>
                                 <th className="border border-slate-500 p-2">Employer Name</th>
                                 <th className="border border-slate-500 p-2">Employer Address</th>
                                 <th className="border border-slate-500 p-2">Monthly Income</th>
                              </tr>
                           </thead>
                           <tbody className="bg-zinc-200 border border-slate-500 p-2">{employeeTable}</tbody>
                        </table>
                        <EnrolForeignnEmployerTable func={addEmployer}/>
                        </>) : null
                     }
                  </div>
                  <div className='pb-4'>
                     <label className="relative flex justify-left items-center w-4/6 grouptext-xl"> <p className='pl-4 pr-2'>Other places of work, if any, in the State</p>
                        <button onClick={(e) => handleShowOtherPow(e)} className="bottom-3">
                           <input type="checkbox" className="absolute -translate-x-1/2 w-full h-full peer appearance-none rounded-md group-hover:cursor-pointer hover:cursor-pointer" />
                           <span className="w-8 h-5 flex items-center flex-shrink-0 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-amber-400 after:w-3 after:h-3 after:bg-white after:rounded-full after:shadow-sm after:duration-300 peer-checked:after:translate-x-3 group-hover:cursor-pointer"></span>
                        </button>
                     </label>
                     {
                        otherPow? (<>
                           <table className="table-auto w-full border-separate p-4">
                           <thead className="bg-zinc-700 text-white text-sm">
                              <tr>
                                 <th className="border border-slate-500 p-2">Sl. No</th>
                                 <th className="border border-slate-500 p-2">Establishment Name</th>
                                 <th className="border border-slate-500 p-2">Establishment Address</th>
                              </tr>
                           </thead>
                           <tbody className="bg-zinc-200 border border-slate-500 p-2">{powList}</tbody>
                        </table>
                        <EnrolOtherPow func={addEstablishment}/>
                        </>) : null
                     }
                  </div>
                  <div className='pb-4'>
                     <label className="relative flex justify-left items-center w-4/6 grouptext-xl"> <p className='pl-4 pr-2'>If Enrolled under any act</p>
                        <button onClick={(e) => handleShowActs(e)} className="bottom-3">
                           <input type="checkbox" className="absolute -translate-x-1/2 w-full h-full peer appearance-none rounded-md group-hover:cursor-pointer hover:cursor-pointer" />
                           <span className="w-8 h-5 flex items-center flex-shrink-0 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-amber-400 after:w-3 after:h-3 after:bg-white after:rounded-full after:shadow-sm after:duration-300 peer-checked:after:translate-x-3 group-hover:cursor-pointer"></span>
                        </button>
                     </label>
                     {
                        acts? (<>
                           <table className="table-auto w-full border-separate p-4">
                           <thead className="bg-zinc-700 text-white text-sm">
                              <tr>
                                 <th className="border border-slate-500 p-2">Sl. No</th>
                                 <th className="border border-slate-500 p-2">Act Title</th>
                                 <th className="border border-slate-500 p-2">Enrollment Certificate No</th>
                                 <th className="border border-slate-500 p-2">Date of Issue</th>
                              </tr>
                           </thead>
                           <tbody className="bg-zinc-200 border border-slate-500 p-2">{actsList}</tbody>
                        </table>
                        <EnrolActs func={addActs}/>
                        </>) : null
                     }
                  </div>
                  <div className='flex flex-col justify-center items-center w-full p-3'>
                     <div className='w-4/5 flex-row p-2'>
                        <input type="checkbox" className='items-center m-1'/>
                        <label>I hereby apply for a Certificate of Enrollment under the Meghalaya Professions, Trades, Callings and Employments Taxation Act, as per particulars given.</label>
                     </div>
                     <button onClick={handleSubmit} className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded shadow-md shadow-blue-300 hover:bg-gradient-to-tr hover:from-red-400 hover:to-red-600 hover:rounded hover:shadow-md hover:shadow-red-300  tracking-wider text-white py-2 w-28 mb-4">Submit</button>
                  </div>
                  
               </div>
               
				</form>
			</div>
		</div>
	);
};

export default Enrollment;
