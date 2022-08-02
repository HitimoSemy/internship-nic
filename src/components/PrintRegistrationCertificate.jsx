import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { RegtCert } from '../common/RegtCert.jsx';


const PrintRegistrationCertificate = () => {
  const componentRef = useRef();

  return (
    <div className='w-full'>
      <ReactToPrint
        trigger={() => <button className='bg-gradient-to-tr from-blue-400 to-blue-600 p-4 tracking-widest shadow-md shadow-blue-300 py-2 px-4 hover:shadow-md h-16 rounded text-white w-full hover:bg-gradient-to-tr hover:from-pink-400 hover:to-pink-600 hover:shadow-pink-300'>Print/Save/Download</button>}
        content={() => componentRef.current}
      />
      <div style={{ display: "none" }}>
         <RegtCert ref={componentRef} />
      </div>
      
    </div>
  );
};
export default PrintRegistrationCertificate;