import axios from "axios";

const BASE_API_URL = "http://localhost:8080/api/authVerify/";

class AuthService{
	async citizenLogin(login) {
		const response = await axios.post(BASE_API_URL + 'citizenLogin', login);
		if (response) {
			window.localStorage.setItem('user', JSON.stringify(response.data));
		}
		return response.data;
      
	} 
   async officerLogin(login){
      const response = await axios.post(BASE_API_URL + 'officerLogin', login);
      if (response){
         window.localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data;
   }

   userSignup(userSignup) {
		return axios.post(BASE_API_URL + 'citizenSignUp', userSignup);
	}

   submitVerification(userVerification) {
		return axios.post(BASE_API_URL + 'newUser', userVerification);
	}

	verifyOtp(userVerification) {
		return axios.post(BASE_API_URL + 'otp', userVerification);
	}
   logout() {
		window.localStorage.removeItem('user');
		return axios.post(BASE_API_URL + 'signout');
	}

   getCurrentUser() {
		return JSON.parse(localStorage.getItem('user'));
	}
}

export default new AuthService();