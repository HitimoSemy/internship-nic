import React, { useEffect, useState } from 'react';
import axios from 'axios';
function RegtEmpTable(props) {
	const [employeeBuffer, setEmployeeBuffer] = useState({
		id: '',
		employeeName: '',
		employeeStatus: {
         statusId: ''
      },
		employeeGrossPay: '',
		employeeTaxPayable: '',
	});

   const statusChanges = (e) => {
      const val = e.target.value;
      setEmployeeBuffer({...employeeBuffer, employeeStatus:{statusId: val}})      
   }
	const employeeChanges = (e) => {
      const value = e.target.value
		setEmployeeBuffer({ ...employeeBuffer, [e.target.name]: value });
	};
	const transferValue = (e) => {
		e.preventDefault();
		
		props?.func(employeeBuffer);
		clearState();
	};

	const clearState = () => {
		setEmployeeBuffer('');
	};

   const [loading, setLoading] = useState(true);

   const [statusItems, setStatusItems] = useState([]);

   useEffect(() => {
		let unmounted = false;
		async function getCharacters() {
			const response = await axios.get('http://localhost:8080/api/misc/employerStatus');
			const body = response.data;
			if (!unmounted) {
				setStatusItems(body.map(({ statusId, statusName }) => ({ item: statusName, key: statusId })));
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
				<div className="md:w-1/4">
					<label className="block text-sm font-normal pb-2">Employee Name<span className="text-red-600 font-normal">*</span></label>
					<input
						type="text"
						name="employeeName"
						value={employeeBuffer.employeeName?? ''}
						onChange={employeeChanges}
                  className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-full rounded"
					/>
				</div>
				<div className="md:w-1/4">
					<label className="block text-sm font-normal pb-2">Designation<span className="text-red-600 font-normal">*</span></label>
               <select 
               defaultValue=''
                  disabled={loading}
						name="statusId"
						onChange={(e) => statusChanges(e)} 
                  className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-full rounded">
                  <option value='' disabled multiple={false}>
							--- select status ---
							</option>
							{statusItems.map(({ item, key }) => (
								<option key={key} value={key}>
									{item}
								</option>
							))}
                  </select>

					
				</div>
				<div className="md:w-1/4">
					<label className="block text-sm font-normal pb-2">Total Gross Income Yearly<span className="text-red-600 font-normal">*</span></label>
					<input
						type="text"
						name="employeeGrossPay"
						value={employeeBuffer.employeeGrossPay?? ''}
						onChange={employeeChanges}
                  className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-full rounded"
					/>
				</div>
				<div className="md:w-1/4">
					<label className="block text-sm font-normal pb-2">Tax Payable Quarterly<span className="text-red-600 font-normal">*</span></label>
					<input
						type="text"
						name="employeeTaxPayable"
						value={employeeBuffer.employeeTaxPayable?? ''}
						onChange={employeeChanges}
                  className="block focus:outline-2 focus:outline-gray-400 border-2 bg-slate-50 border-gray-200 px-2 py-2 w-full rounded"
					/>
				</div>
			</div>
			<button className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded shadow-md shadow-blue-300 hover:bg-gradient-to-tr hover:from-zinc-400 hover:to-zinc-600 hover:rounded hover:shadow-md hover:shadow-zinc-300 self-center tracking-wider text-white py-2 w-28" onClick={transferValue}>Add To List</button>
		</div>
	);
}

export default RegtEmpTable;
