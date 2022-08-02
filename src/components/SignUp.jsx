import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';


const SignUp = () => {
	const navigate = useNavigate();

	const [userVerification, setUserVerificatoin] = useState({
		otp: '',
		mobileNumber: '',
		email: '',
	});

	const [userSignup, setUserSignup] = useState({
		logonName: '',
		mobileNumber: '',
		password: '',
	});
	const handleChange = (e) => {
		const value = e.target.value;
		setUserVerificatoin({ ...userVerification, [e.target.name]: value });
	};

   const handlePassChange = (e) =>{
      const value = e.target.value;
      setUserSignup({
			loginName: userVerification.email,
			mobileNumber: userVerification.mobileNumber,
			password: value,
		});  
   }

	const signup = () => {
		AuthService.userSignup(userSignup)
			.then((response) => {
				console.log(response);
				if (response.status === 400) {
					alert('error');
				} else if (response.status === 200) {
					navigate('/loginPage');
					alert('account created, you can login');
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const verifyOtp = () => {
		AuthService.verifyOtp(userVerification)
			.then((response) => {
				console.log(response);
				if (response.status === 400) {
					alert('Invalid OTP');
				} else if (response.status === 200) {
					setPage((currentPage) => currentPage + 1);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const submitVerification = () => {
		AuthService.submitVerification(userVerification)
			.then((response) => {
				console.log(response.data);
				if (response.status === 400) {
					alert('email already in use');
				} else if (response.status === 200) {
					setPage((currentPage) => currentPage + 1);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const [page, setPage] = useState(0);

	const PageDisplay = () => {
		if (page === 0) {
			return (
				<>
					<div className='bg-gradient-to-tr from-pink-400 to-pink-600 shadow-md shadow-pink-300 rounded relative -left-4 -top-6 flex'>
                  <h3 className="text-xl font-bold text-center text-white p-6 tracking-widest">User Info</h3>
               </div>
               <div className='px-6 pb-4'>
               <div>
						<label className="block" htmlFor="email">
							Email
						</label>
						<input
							type="text"
							name="email"
							value={userVerification.email}
							onChange={(e) => handleChange(e)}
							placeholder="email"
							className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"
						></input>
					</div>
					<div className="my-4">
						<label className="block" htmlFor="mobile">
							Mobile Number
						</label>
						<input
							type="text"
							name="mobileNumber"
							value={userVerification.mobileNumber}
							onChange={(e) => handleChange(e)}
							placeholder="mobile"
							className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"
						></input>
					</div>
					<button
						className="w-full px-6 py-2 mt-4 text-white bg-gradient-to-tr from-blue-400 to-blue-600 rounded hover:bg-gradient-to-tr hover:from-purple-400 hover:to-purple-600 shadow shadow-blue-300 hover:shadow-md hover:shadow-purple-300"
						onClick={() => {
							submitVerification();
						}}
					>
						Request OTP
					</button>
               </div>
					
				</>
			);
		} else if (page === 1) {
			return (
				<>
					<div className='bg-gradient-to-tr from-pink-400 to-pink-600 shadow-md shadow-pink-300 rounded relative -left-4 -top-6 flex'>
                  <h3 className="text-xl font-bold text-center text-white p-6 tracking-widest">Enter Otp</h3>
               </div>
               <div className='px-6 pb-4'>
					<div>
						<input
							type="text"
							name="otp"
							value={userVerification.otp}
							onChange={(e) => handleChange(e)}
							placeholder="Enter otp"
							className="focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50 block"
						></input>
					</div>
					<button
						className="w-full px-6 py-2 mt-4 text-white bg-gradient-to-tr from-blue-400 to-blue-600 rounded hover:bg-gradient-to-tr hover:from-purple-400 hover:to-purple-600 shadow shadow-blue-300 hover:shadow-md hover:shadow-purple-300"
						onClick={() => {
							verifyOtp();
						}}
					>
						Verify
					</button>
               </div>
				</>
			);
		} else if (page === 2) {
			return (
				<>
					<div className='bg-gradient-to-tr from-pink-400 to-pink-600 shadow-md shadow-pink-300 rounded relative -left-4 -top-6 flex'>
                  <h3 className="text-xl font-bold text-center text-white p-6 tracking-widest">Provide New Password</h3>
               </div>
               <div className='px-6 pb-4'>
					<div>
						<label className="block" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={userSignup.password}
							onChange={(e) => handlePassChange(e)}
							placeholder="password"
							className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"
						></input>
					</div>
					<button
						className="w-full px-6 py-2 mt-4 text-white bg-gradient-to-tr from-blue-400 to-blue-600 rounded hover:bg-gradient-to-tr hover:from-purple-400 hover:to-purple-600 shadow shadow-blue-300 hover:shadow-md hover:shadow-purple-300"
						onClick={() => {
							signup();
						}}
					>
						Sign Up
					</button>
               </div>
				</>
			);
		}
	};
	return (
		<div className="flex flex-grow items-center justify-center bg-gray-100">
			<div className="text-left bg-white shadow-lg md:w-1/4 lg:w-1/4 sm:w-1/4 rounded">
				<div>{PageDisplay()}</div>
			</div>
		</div>
	);
};

export default SignUp;
