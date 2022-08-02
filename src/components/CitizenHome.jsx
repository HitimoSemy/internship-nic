import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom'
import AuthService from '../services/AuthService';
import logo from "../icons/nicwhitelogo.png"
import logoA from "../icons/ashok.png"

const CitizenHome = () => {

   const [cit, setCit] = useState({
      regtApp: false,
      regt: false,
      enrlApp: false,
      enrl: false
   })
  
   const user = AuthService.getCurrentUser();

   useEffect(() => {
		let unmounted = false;
		async function getCharacters() {
			const response = await axios.get('http://localhost:8080/api/citizen/homePayload/' + user.citizenId);
			const body = response.data;
			if (!unmounted) {
				setCit({ regtApp: body.regtApp, regt: body.regt, enrlApp: body.enrlApp, enrl: body.enrl });
            console.log("here")
			}
		}
		getCharacters();
		return () => {
			unmounted = true;
		};
	}, [user.citizenId]);
   
   
  return (
      <div className='p-4 bg-slate-100 flex flex-col flex-grow overflow-auto'>
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
         <div className='pt-8 bg-slate-100 flex flex-grow flex-col justify-center items-center gap-10 overflow-auto'>
               <div className='px-4 w-4/6 bg-white rounded shadow min-h-30'>
                  <div className='bg-gradient-to-tr from-purple-400 to-purple-600 h-12 text-white tracking-wider shadow-md shadow-purple-300 text-lg rounded w-96 relative -left-8 -top-4 px-8 items-center flex'>
                     Services
                  </div>
                  <div className='flex flex-row justify-center w-full gap-4 pb-4'>
                     {cit.regtApp? cit.regt? null : (<Link to={"/registration"} className="w-full"><button className='bg-gradient-to-tr from-blue-400 to-blue-600 p-4 tracking-wider shadow-md shadow-blue-300 py-2 px-4 hover:shadow-md h-24 rounded text-white w-full hover:bg-gradient-to-tr hover:from-orange-400 hover:to-orange-600 hover:shadow-orange-300'>Registration</button></Link>) : null}
                     {cit.regt? (<Link to={"/registrationCertificate"} className="w-full"><button className='bg-gradient-to-tr from-blue-400 to-blue-600 p-4 tracking-wider shadow-md shadow-blue-300 py-2 px-4 hover:shadow-md h-24 rounded text-white w-full hover:bg-gradient-to-tr hover:from-orange-400 hover:to-orange-600 hover:shadow-orange-300'>Registration</button></Link>): null}
                     {cit.enrlApp? cit.enrl? null : (<Link to={'/enrollment'} className="w-full"><button className='bg-gradient-to-tr from-blue-400 to-blue-600 p-4 tracking-wider shadow-md shadow-blue-300 py-2 px-4 hover:shadow-md h-24 rounded text-white w-full hover:bg-gradient-to-tr hover:from-pink-400 hover:to-pink-600 hover:shadow-pink-300'>Enrolment</button></Link>) : null}
                     {cit.enrl? (<Link to={"/enrolmentCertificate"} className="w-full"><button className='bg-gradient-to-tr from-blue-400 to-blue-600 p-4 tracking-wider shadow-md shadow-blue-300 py-2 px-4 hover:shadow-md h-24 rounded text-white w-full hover:bg-gradient-to-tr hover:from-orange-400 hover:to-orange-600 hover:shadow-orange-300'>Enrolment</button></Link>): null}
                  </div>
                  <div className='flex flex-col justify-center w-full gap-4 pb-4'>
                     {cit.regtApp? null:(<p className='tracking-wider w-full text-justify'>Registration Under Process (Your Registration Application has been sumbmitted successfully and is under process, it may take 1-2 bussiness days until it is processed)</p>)}
                     {cit.regt? (<p className=' tracking-wider w-full text-justify'>Registration Processed (You may now Download/Print/Save the Certificate, Apply for Amendment or Cancellation through The Registration Service)</p>): null}
                     {cit.enrlApp? null:(<p className='tracking-wider w-full text-justify'>Enrollment Under Process (Your Enrollment Application has been sumbmitted successfully, it may take 1-2 bussiness days until it is processed)</p>)}
                     {cit.enrl? (<p className='tracking-wider w-full text-justify'>Enrollment Processed (You may now Download/Print/Save the Certificate and is under process, Apply for Amendment or Cancellation through The Enrollment Service)</p>): null}
                  </div>
                   </div>
         </div>
         
      </div>
  )
};

export default CitizenHome