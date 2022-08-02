import React, { useEffect, useState } from 'react';
import RegtActsTable from '../common/RegtActsTable';
import RegtEmpTable from '../common/RegtEmpTable';
import RegtExtraEstdTable from '../common/RegtExtraEstdTable';
import axios from 'axios';
import CitizenServices from '../services/CitizenServices';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import logo from "../icons/nicwhitelogo.png"
import logoA from "../icons/ashok.png"

const Registration = () => {

   const navigate = useNavigate();

	const [registration, setRegistration] = useState({
		citizen: {
         citizenId:''
      },
		applicantName: '',
		address: '',
		pincode: '',
		employerStatus:'',
		estdName: '',
		estdAddress: '',
      district:'',
      taxCircle:'',
      employerClass:'',
      estdDescr:'',
      registrationEmployeeLists: '',
      registrationApplicationActs: '',
      registrationApplicationExtraEstablishments: ''
	});

   const user = AuthService.getCurrentUser();

	const handleChange = (e) => {
		const value = e.target.value;
		setRegistration({ ...registration, [e.target.name]: value });
	};

   const [stat, setStat] = useState({
      statusId: ''
   })

   const handleStatusChange = (e) => {
      const val = e.target.value;
      setStat({statusId:val})
   }

   const [classs, setClasss] = useState({
      classId:''
   })

   const handleClassChange = (e) => {
      const val = e.target.value;
      setClasss({classId: val})
   }
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

   const [statusItems, setStatusItems] = useState([]);

   useEffect(() => {
		let unmounted = false;
		async function getCharacters() {
			const response = await axios.get('http://localhost:8080/api/misc/employerStatus');
			const body = response.data;
			if (!unmounted) {
				setStatusItems(body.map(({ statusId, statusName }) => ({ item: statusName, key: statusId })));
				setLoading(false);

			}
		}
		getCharacters();
		return () => {
			unmounted = true;
		};
	}, []);

   const [classItems, setClassItems] = useState([]);

   useEffect(() => {
		let unmounted = false;
		async function getCharacters() {
			const response = await axios.get('http://localhost:8080/api/misc/employerClass');
			const body = response.data;
			if (!unmounted) {
				setClassItems(body.map(({ classId, className }) => ({ item: className, key: classId })));
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

	const [employeeLists, setEmployeeLists] = useState([]);

	const employeeTable = employeeLists.map((info) => {
		return (
			<tr key={info.id} className='text-center'>
				<td>{info.id}</td>
				<td>{info.employeeName}</td>
				<td>{info.employeeStatus.statusId}</td>
				<td>{info.employeeGrossPay}</td>
				<td>{info.employeeTaxPayable}</td>
			</tr>
		);
	}, [employeeLists]);



	const addEmployee = (data) => {
		const totalEmployee = employeeLists.length;
      if(totalEmployee === 0 || null){
         data.id = 1;
      }else{
         data.id = totalEmployee + 1;
      }
      const updatedRegistrationEmployeeLists = [...employeeLists];
		updatedRegistrationEmployeeLists.push(data);
		setEmployeeLists(updatedRegistrationEmployeeLists);
	};
   
   const [extraEstd, setExtraEstd] = useState([]);

	const extraEstdTable = extraEstd.map((info) => {
		return (
			<tr key={info.id} className='text-center'>
				<td>{info.id}</td>
				<td>{info.estdName}</td>
				<td>{info.estdAddress}</td>
			</tr>
		);
	}, [extraEstd]);
   const addExtraEstd = (data) => {
      const totalExtraEstd = extraEstd.length;
      if(totalExtraEstd === 0||null){
         data.id = 1;
      }else{
         data.id = totalExtraEstd + 1;
      }
		
		const updatedExtraEstd = [...extraEstd];
		updatedExtraEstd.push(data);
		setExtraEstd(updatedExtraEstd);
   }

   const [acts, setActs] = useState([]);

	const actsTable = acts.map((info) => {
		return (
			<tr key={info.id} className='text-center'>
				<td>{info.id}</td>
				<td>{info.acts.actCode}</td>
				<td>{info.certificateRegistrationNumber}</td>
            <td>{info.logDate}</td>
			</tr>
		);
	}, [acts]);
   const addActs = (data) => {
      const totalActs = acts.length;
      if(totalActs === 0||null){
         data.id = 1;
      }else{
         data.id = totalActs + 1;
      }
		
		const updatedActs = [...acts];
		updatedActs.push(data);
		setActs(updatedActs);
   }

   const [otherEstd, showOtherEstd] = useState(false);

   const handleOtherEstd = (e) => {
      
      if (otherEstd){
         showOtherEstd(false);
      }else{
         showOtherEstd(true);
      }
   }

   const [empList, showEmpList] = useState(false);

   const handleEmpList = (e) => {
      
      if (empList){
         showEmpList(false);
      }else{
         showEmpList(true);
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      registration.citizen.citizenId = user.citizenId;
      registration.registrationEmployeeLists = employeeLists;
      registration.registrationApplicationActs = acts;
      registration.registrationApplicationExtraEstablishments = extraEstd;
      registration.employerStatus = stat;
      registration.employerClass = classs;
      registration.district = dist;
      registration.taxCircle = taxCirc;

      console.log(registration)


      CitizenServices.newRegistration(registration).then(
         () => {
		 		window.history.pushState(navigate('/citizenHome'), '/citizenHome');
             alert('registration completed');
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
                  <p className="bg-gradient-to-tr from-orange-400 to-orange-600 p-4 tracking-wider shadow-md shadow-orange-300 relative -left-4 -top-4 w-2/5 rounded text-white">Application Form</p>
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
									Address<span className="text-red-600 font-normal">*</span>
								</label>
								<input
									type="text"
									name="address"
									placeholder="address"
                           onChange={(e) => handleChange(e)}
									className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full rounded bg-gray-50"
								></input>
							</div>
						</div>
						<div className="flex felx-wrap gap-3 p-4 mb-4">
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
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									Status<span className="text-red-600 font-normal">*</span>
								</label>
								<select 
                           disabled={loading}
									name='statusId'
                           defaultValue=''
									onChange={(e) => handleStatusChange(e)} 
                           className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-full rounded">
                           <option value='' disabled multiple={false}>
										--- Select Status ---
									</option>
									{statusItems.map(({ item, key }) => (
										<option key={key} value={key}>
											{item}
										</option>
									))}
                        </select>
							</div>
						</div>
					
                  <div className="flex felx-wrap gap-3 px-4">
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									Establishment Name<span className="text-red-600 font-normal">*</span>
								</label>
								<input
									type="text"
									name="estdName"
									placeholder="establishment name"
                           onChange={(e) => handleChange(e)}
									className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full rounded bg-gray-50"
								></input>
							</div>
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
						</div>
						<div className="flex felx-wrap gap-3 p-4">
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									District<span className="text-red-600 font-normal">*</span>
								</label>
								<select
                           disabled={loading}
									name='distId' 
									onChange={(e) => handleDistChange(e)} 
                           defaultValue=""
                           className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-full rounded">
                           <option value='' disabled multiple={false}>
										--- Select District ---
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
                           disabled={loading}
									name='circleId'
									onChange={(e) => handeleCirlceChange(e)} 
                           defaultValue=''
                           className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-full rounded">
                           <option value='' disabled multiple={false}>
										--- Select Circle ---
									</option>
									{taxCircleItems.map(({circleId, circleName }) => (
										<option key={circleId} value={circleId}>
											{circleName}
										</option>
									))}
                        </select>	
							</div>
							<div className="md:w-1/3">
								<label className="block text-sm font-normal pb-2">
									Employer Class<span className="text-red-600 font-normal">*</span>
								</label>
                        <select 
                           disabled={loading}
									name='classId'
                           defaultValue=''
									onChange={(e) => handleClassChange(e)} 
                           className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-full rounded">
                           <option value='' disabled multiple={false}>
										--- Select Employer Class ---
									</option>
									{classItems.map(({ item, key }) => (
										<option key={key} value={key}>
											{item}
										</option>
									))}
                        </select>
							
							</div>
						</div>
						<div className="md:w-full p-4 mb-4">
							<label className='block text-sm font-normal pb-2'>
								Description of goods and or services supplied<span className="text-red-600 font-normal">*</span>
							</label>
							<textarea name='estdDescr' value={registration.estdDescr} onChange={(e) => handleChange(e)} className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full rounded bg-gray-50"></textarea>
						</div>
                  <table className="table-auto w-full border-separate px-4">
							<thead className="bg-zinc-700 text-white text-sm">
								<tr>
									<th className="border border-slate-500 p-2">Sl. No</th>
									<th className="border border-slate-500 p-2">Employee Name</th>
									<th className="border border-slate-500 p-2">Designation</th>
									<th className="border border-slate-500 p-2">Total Gross annual Income</th>
									<th className="border border-slate-500 p-2">Tax payable quarterly</th>
								</tr>
							</thead>
							<tbody className="bg-zinc-200 border border-slate-500 p-2">{employeeTable}</tbody>
						</table>
                  <RegtEmpTable func={addEmployee}/>
                  <div className='pb-4'>
                     <label className="relative flex justify-left items-center w-4/6 grouptext-xl"> <p className='pl-4 pr-2'>Other establishments, if any in Meghalaya</p>
                        <button onClick={(e) => handleOtherEstd(e)} className="bottom-3">
                           <input type="checkbox" className="absolute -translate-x-1/2 w-full h-full peer appearance-none rounded-md group-hover:cursor-pointer hover:cursor-pointer" />
                           <span className="w-8 h-5 flex items-center flex-shrink-0 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-amber-400 after:w-3 after:h-3 after:bg-white after:rounded-full after:shadow-sm after:duration-300 peer-checked:after:translate-x-3 group-hover:cursor-pointer"></span>
                        </button>
                     </label>
                     {
                        otherEstd? (<>
                           <table className="table-auto w-full border-separate p-4">
							         <thead className="bg-zinc-700 text-white text-sm">
								         <tr>
                                    <th className="border border-slate-500 p-2">Sl. No</th>
                                    <th className="border border-slate-500 p-2">Establishment Name</th>
                                    <th className="border border-slate-500 p-2">Address</th>
								         </tr>
							         </thead>
							         <tbody className="bg-zinc-200 border border-slate-500 p-2">{extraEstdTable}</tbody>
						         </table>
                           <RegtExtraEstdTable func={addExtraEstd}/>
                        </>) : null
                     }
                  </div>
                  <div className='pb-4'>
                     <label className="relative flex justify-left items-center w-4/6 grouptext-xl"> <p className='pl-4 pr-2'>If Registered under any</p>
                        <button onClick={(e) => handleEmpList(e)} className="bottom-3">
                           <input type="checkbox" className="absolute -translate-x-1/2 w-full h-full peer appearance-none rounded-md group-hover:cursor-pointer hover:cursor-pointer" />
                           <span className="w-8 h-5 flex items-center flex-shrink-0 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-amber-400 after:w-3 after:h-3 after:bg-white after:rounded-full after:shadow-sm after:duration-300 peer-checked:after:translate-x-3 group-hover:cursor-pointer"></span>
                        </button>
                     </label>
                     {empList? (<>
                        <table className="table-auto w-full border-separate p-4">
                           <thead className="bg-zinc-700 text-white text-sm">
                              <tr>
                                 <th className="border border-slate-500 p-2">Sl. No</th>
                                 <th className="border border-slate-500 p-2">Act Title</th>
                                 <th className="border border-slate-500 p-2">Certificate Registration Number</th>
                                 <th className='border border-slate-500 p-2'>Certificate Log Date</th>
                              </tr>
                           </thead>
                           <tbody className="bg-zinc-200 border border-slate-500 p-2">{actsTable}</tbody>
                        </table>
                        <RegtActsTable func={addActs}/>
                     </>): null}
                  </div>
					
              
					
               
                  <div className='flex flex-col justify-center items-center w-full p-3'>
                     <div className='w-4/5 flex-row p-2'>
                        <input type="checkbox" className='items-center m-1'/>
                        <label>I hereby apply for a Certificate of Registration/amendment of Certificate of Registration under the Meghalaya Professions, Trades, Callings and Employments Taxation Act, as per particulars given.</label>
                     </div>
                     <button onClick={handleSubmit} className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded shadow-md shadow-blue-300 hover:bg-gradient-to-tr hover:from-red-400 hover:to-red-600 hover:rounded hover:shadow-md hover:shadow-red-300  tracking-wider text-white py-2 w-28 mb-4">Submit</button>
                  </div>
               </div>
				</form>
			</div>
		</div>
	);
};

export default Registration;
