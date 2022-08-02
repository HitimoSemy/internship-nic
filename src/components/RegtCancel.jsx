import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import AuthService from '../services/AuthService';
import CitizenServices from '../services/CitizenServices';

const RegtCancel = () => {
   const loc = useLocation();
   const user = AuthService.getCurrentUser();
   const rId = loc.state.regtId;
   const [regtCancelApp, setRegtCancelApp] = useState({
      citizen: {
         citizenId:''
      },
      registration: {
         regtId: ''
      }
   })
   
   const handleOnOk = (e) => {
      regtCancelApp.citizen.citizenId = user.citizenId;
      regtCancelApp.registration.regtId =  rId;
      CitizenServices.newCancellation(regtCancelApp).then(
         () => {
            window.history.back('/registrationCertificate')
             alert('cancellation applied');
		 	},
		 	(error) => {
		 		console.log(error.toString());
		 	})
      
   }

  return (
    <div className='p-8 flex justify-center items-center w-full flex-col flex-grow gap-8'>
      <p>Are you sure you want to cancel your Registration Certificate?</p>
      <button onClick={(e) => handleOnOk(e)} className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded shadow-md shadow-blue-300 hover:bg-gradient-to-tr hover:from-red-400 hover:to-red-600 hover:rounded hover:shadow-md hover:shadow-red-300  tracking-wider text-white py-2 w-28 mb-4">Cancel</button>
    </div>
  )
}

export default RegtCancel