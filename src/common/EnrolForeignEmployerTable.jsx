import { useState } from "react";

function EnrolForeignnEmployerTable(props){
   const [foreignEmployer, setForeignEmployer] = useState({
		id: '',
		employerName: '',
      employerAddress: '',
      monthlyPay: '',
		
	});

   const employerChange = (e) => {
      const val = e.target.value;
      setForeignEmployer({...foreignEmployer, [e.target.name]:val})      
   }
	
	const transferValue = (e) => {
		e.preventDefault();
		
		props?.func(foreignEmployer);
		clearState();
	};

	const clearState = () => {
		setForeignEmployer('');
	};


	return (
		<div className='flex flex-col justify-center p-4 mb-4'>
			<div className="flex felx-wrap gap-3 pb-2">
				<div className="md:w-1/4">
					<label className="block text-sm font-normal pb-2">Employer Name<span className="text-red-600 font-normal">*</span></label>
					<input
						type="text"
						name="employerName"
						value={foreignEmployer.employerName?? ''}
						onChange={employerChange}
                  placeholder="Employer Name"
                  className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"
					/>
				</div>
				<div className="md:w-2/4">
					<label className="block text-sm font-normal pb-2">Employer Address<span className="text-red-600 font-normal">*</span></label>
					<input
						type="text"
						name="employerAddress"
						value={foreignEmployer.employerAddress?? ''}
						onChange={employerChange}
                  placeholder="Employer Address"
                  className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"
					/>
				</div>
				<div className="md:w-1/4">
					<label className="block text-sm font-normal pb-2">Monthly Pay<span className="text-red-600 font-normal">*</span></label>
					<input
						type="text"
						name="monthlyPay"
						value={foreignEmployer.monthlyPay?? ''}
						onChange={employerChange}
                  placeholder="Monthly Pay w.r.t Employment"
                  className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"
					/>
				</div>
			</div>
			<button className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded shadow-md shadow-blue-300 hover:bg-gradient-to-tr hover:from-zinc-400 hover:to-zinc-600 hover:rounded hover:shadow-md hover:shadow-zinc-300 self-center tracking-wider text-white py-2 w-28" onClick={transferValue}>Add To List</button>
		</div>
	);
}

export default EnrolForeignnEmployerTable;