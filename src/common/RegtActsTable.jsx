import React, { useState, useEffect } from 'react'
import axios from 'axios';
function RegtActsTable(props){
   const [actsBuffer, setActsBuffer] = useState({
      id: '',
      acts: {
         actCode: ''
      },
      certificateRegistrationNumber: '',
      logDate: '',
   })

   const codeChange = (e) => {
      const val = e.target.value;
      setActsBuffer({...actsBuffer, acts:{actCode: val}})
   }
   const actsChanges = (e) => {
      const value = e.target.value
		setActsBuffer({ ...actsBuffer, [e.target.name]: value });
	};
	const transferValue = (e) => {
		e.preventDefault();
		
		props?.func(actsBuffer);
		clearState();
	};

	const clearState = () => {
		setActsBuffer('');
	};

   const [loading, setLoading] = useState(true);

   const [classItems, setClassItems] = useState([]);

   useEffect(() => {
		let unmounted = false;
		async function getCharacters() {
			const response = await axios.get('http://localhost:8080/api/misc/acts');
			const body = response.data;
			if (!unmounted) {
				setClassItems(body.map(({ actCode, actName }) => ({ item: actName, key: actCode })));
				setLoading(false);
			}
		}
		getCharacters();
		return () => {
			unmounted = true;
		};
	}, []);
	return (
		<div className='flex flex-col justify-center p-4 mb-4'>
			<div className="flex felx-wrap gap-3 pb-2">
			
				<div className="md:w-1/2"> 
					<label className="block text-sm font-normal pb-2">Act Title<span className="text-red-600 font-normal">*</span></label>
					<select 
               defaultValue=''
                  disabled={loading}
						name='actCode'
						onChange={(e) => codeChange(e)}  
                  className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-full rounded">
                  <option value='' disabled multiple={false}>
							--- select act ---
						</option>
						{classItems.map(({ item, key }) => (
							<option key={key} value={key}>
								{item}
							</option>
						))}
               </select>
				</div>
			
				<div className="md:w-1/4">
					<label className="block text-sm font-normal pb-2">Certificate Registration Number<span className="text-red-600 font-normal">*</span></label>
					<input
						type="text"
						name="certificateRegistrationNumber"
						value={actsBuffer.certificateRegistrationNumber?? ''}
						onChange={actsChanges}
                  className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-full rounded"
					/>
				</div>
            <div className="md:w-1/4">
					<label className="block text-sm font-normal pb-2">Certificate Log Date<span className="text-red-600 font-normal">*</span></label>
					<input
						type="date"
						name="logDate"
						value={actsBuffer.logDate?? ''}
						onChange={actsChanges}
                  className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-full rounded"
					/>
				</div>
			</div>
			<button className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded shadow-md shadow-blue-300 hover:bg-gradient-to-tr hover:from-zinc-400 hover:to-zinc-600 hover:rounded hover:shadow-md hover:shadow-zinc-300 self-center tracking-wider text-white py-2 w-28" onClick={transferValue}>Add To List</button>
		</div>
	);
}

export default RegtActsTable