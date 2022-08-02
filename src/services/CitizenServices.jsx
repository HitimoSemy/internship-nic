import axios from 'axios';
import AuthHeader from './AuthHeader';

const BASE_API_URL = 'http://localhost:8080/api/citizen/';

class CitizenService{

   async newRegistration(registration) {
		const response = await axios.post(BASE_API_URL + 'newRegistration', registration, { headers: AuthHeader() });
		return response;
	} 
   async newEnrollment(enrollment) {
		const response = await axios.post(BASE_API_URL + 'newEnrollment', enrollment, { headers: AuthHeader() });
		return response;
	} 
   async newCancellation(regtCancelApp){
      const response = await axios.post(BASE_API_URL + 'regtCancellation', regtCancelApp, {headers: AuthHeader()})
      return response;
   }
}

export default new CitizenService();