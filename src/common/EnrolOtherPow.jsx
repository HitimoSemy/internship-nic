import { useState } from "react";

function EnrolOtherPow(props){
   const [otherPow, setOtherPow] = useState({
		id: '',
		estdName: '',
      estdAddress: ''
		
	});

   const otherPowChange = (e) => {
      const val = e.target.value;
      setOtherPow({...otherPow, [e.target.name]:val})      
   }
	
	const transferValue = (e) => {
		e.preventDefault();
		
		props?.func(otherPow);
		clearState();
	};

	const clearState = () => {
		setOtherPow('');
	};


	return (
		<div className='flex flex-col justify-center p-4 mb-4'>
			<div className="flex felx-wrap gap-3 pb-2">
				<div className="md:w-1/2">
					<label className="block text-sm font-normal pb-2">Establishment Name<span className="text-red-600 font-normal">*</span></label>
					<input
						type="text"
						name="estdName"
						value={otherPow.estdName?? ''}
						onChange={otherPowChange}
                  placeholder="Employer Name"
                  className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"
					/>
				</div>
				<div className="md:w-1/2">
					<label className="block text-sm font-normal pb-2">Establishment Address<span className="text-red-600 font-normal">*</span></label>
					<input
						type="text"
						name="estdAddress"
						value={otherPow.estdAddress?? ''}
						onChange={otherPowChange}
                  placeholder="Employer Address"
                  className="block focus:outline-2 focus:outline-gray-400 border-2 border-gray-200 px-2 py-2 w-full  rounded bg-gray-50"
					/>
				</div>
			</div>
			<button className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded shadow-md shadow-blue-300 hover:bg-gradient-to-tr hover:from-zinc-400 hover:to-zinc-600 hover:rounded hover:shadow-md hover:shadow-zinc-300 self-center tracking-wider text-white py-2 w-28" onClick={transferValue}>Add To List</button>
		</div>
	);
}

export default EnrolOtherPow;