import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/About';
import CitizenHome from './components/CitizenHome';
import Contact from './components/Contact';
import Enrollment from './components/Enrollment';
import Index from './components/Index';
import Login from './components/Login';
import Navbar from './components/Navbar';
import OfficerHome from './components/OfficerHome';
import Registration from './components/Registration';
import SignUp from './components/SignUp';
import ViewRegistraion from './components/ViewRegistraion';
import RegistrationCertificate from './components/RegistrationCertificate';
import PrintRegistrationCertificate from './components/PrintRegistrationCertificate';
import ViewEnrollment from './components/ViewEnrollment';
import EnrollmentCertificate from './components/EnrollmentCertificate';
import PrintEnrollmentCertificate from './components/PrintEnrollmentCertificate';
import RegtCancel from './components/RegtCancel';
import EnrlCancel from './components/EnrlCancel';

function App() {
	return (
		<div className="container flex flex-col h-screen ">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route index element={<Index />}></Route>
					<Route path="/index" element={<Index />}></Route>
					<Route path="/registration" element={<Registration />}></Route>
					<Route path="/enrollment" element={<Enrollment />}></Route>
					<Route path="/loginPage" element={<Login />}></Route>
					<Route path="/signUp" element={<SignUp />}></Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="/contact" element={<Contact />}></Route>
					<Route path="/citizenHome" element={<CitizenHome />}></Route>
					<Route path="/officerHome" element={<OfficerHome />}></Route>
					<Route path="/viewRegistration" element={<ViewRegistraion />}></Route>
					<Route path="/registrationCertificate" element={<RegistrationCertificate />}></Route>
					<Route
						path="/printRegistrationCertificate"
						element={<PrintRegistrationCertificate />}
					></Route>
					<Route path="/viewEnrollment" element={<ViewEnrollment />}></Route>
					<Route path="/enrolmentCertificate" element={<EnrollmentCertificate />}></Route>
					<Route path="/printEnrolmentCertificate" element={<PrintEnrollmentCertificate />}></Route>
					<Route path="/regtCancelApp" element={<RegtCancel />}></Route>
					<Route path="/enrlCancelApp" element={<EnrlCancel />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
