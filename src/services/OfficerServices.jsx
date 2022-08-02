import axios from 'axios';
import AuthHeader from './AuthHeader';

const BASE_API_URL = 'http://localhost:8080/api/officer/';

class OfficerServices{

   async newRegistration(approveRegistration){
      const response = await axios.post(BASE_API_URL + 'approveRegtNoEdit/', approveRegistration, { headers: AuthHeader() })
      return response;
   }

   async newEnrollment(approveEnrollment){
      const response = await axios.post(BASE_API_URL + 'approveEnrlNoEdit/', approveEnrollment, { headers: AuthHeader() })
      return response;
   }

}

export default new OfficerServices();