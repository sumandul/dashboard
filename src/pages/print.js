import { Button } from "@/components/button/Button";
import PrintPage from "@/components/print/PrintPage";
import React, { useRef } from 'react';

const App = () => {
  const printRef = useRef();

  const handlePrint = () => {
    const printElement = printRef.current;

    // Check if the element exists and is a DOM element
    if (printElement && printElement instanceof HTMLElement) {
// Modify the element (optional)
      window.print(); // Trigger the print dialog for the specified element
    }
  };

  return (
    <div className=" ">
     <div>
      <div ref={printRef}>

      <PrintPage />

      </div>
    
   <div className=" flex justify-end mt-4">
    <span onClick={handlePrint}>
    <Button variant={"primary"} className=" ">
        Print Out
      </Button>
    </span>

   </div>
     </div>
    </div>
  );
};

export default App;
