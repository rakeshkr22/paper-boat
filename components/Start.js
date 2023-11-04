import React, { useState } from 'react';
import publisher from "../data/publisher.json";
import Table from './Table';

export default function Start() {

  const [firstDropdownValue, setFirstDropdownValue] = useState('');
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [secondDropdownValue, setSecondDropdownValue] = useState('');
  const [inputValue, setInputValue] = useState('1');
  const [totalFinalAmount, setTotalFinalAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const handleFirstDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setFirstDropdownValue(selectedValue);
    let options = [];
    
    publisher.map((p) => {
      if (selectedValue === p.name) {
        options = p.list;
      }
    });
    setSecondDropdownOptions(options);
  };

  const handleSecondDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSecondDropdownValue(selectedValue);
  };

  let priceValue = '0';

  const handleDeleteRow = () => {
    if(tableData && tableData.length>0){
      const deleteRow = tableData[tableData.length-1];
      setTotalFinalAmount(totalFinalAmount-(deleteRow.totalPrice));
      setTableData([...tableData.slice(0,tableData.length-1)]);
    }
  };

  const handleAddRow = () => {
    
    if (firstDropdownValue && secondDropdownValue) {
      publisher.map((p) => {
        if (firstDropdownValue === p.name) {
           p.list.map((l)=> {
            if(secondDropdownValue === l.name){
              priceValue = l.price;
              if(isChecked && l.perMonth!==null && l.perMonth!==undefined){
                priceValue = l.perMonth;
              }
            }
           });
        }
      });

      const newRow = {
        publisher: firstDropdownValue,
        item: secondDropdownValue,
        price: priceValue,
        quantity : inputValue,
        totalPrice : priceValue*inputValue
      };

      setTableData([...tableData, newRow]);

      // Reset dropdown values
      setFirstDropdownValue('');
      setSecondDropdownValue('');
      setInputValue('1');
    }
    if(priceValue && inputValue){
      setTotalFinalAmount(totalFinalAmount+(priceValue*inputValue));
    }


  };

  const ToggleButton = () => {
    
  
    const handleToggle = () => {
      setIsChecked(!isChecked);
      
    };

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    return (
      <div>
      <div className="inline-flex items-center">
        <button
          className={`relative inline-flex flex-shrink-0 h-6 w-12 border-2 rounded-full transition-colors ease-in-out duration-300 focus:outline-none ${
            isChecked ? 'bg-black' : 'bg-gray-200'
          }`}
          onClick={handleToggle}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-300 ${
              isChecked ? 'translate-x-6' : 'translate-x-0'
            }`}
          ></span>
        </button>
        <span className="ml-2 Avenir text-gray-900 font-medium">{isChecked ? 'Yes' : 'No'}</span>
          
  
      </div>
  
  
  {!isChecked ? <div> 
    <div className="mt-5 mb-1 Avenir text-gray-900">
          Count
    </div>
    <input
  type="text"
  className="container lg:mx-0 mx-auto block w-40 px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  value={inputValue}
  onChange={handleInputChange}
  placeholder="Enter count"
  />
  </div> : <div></div>}
  
  </div>
  
    );
  };

  return (
    <section className="text-black body-font">
      <div className="max-w-8xl mx-auto flex px-5 py-24 md:flex-row flex-col items-top">
        <div className="lg:flex-grow md:w-1/6 md:ml-20 pt-6 flex flex-col md:items-start md:text-left mb-40 items-center text-center">

        <div className="mt-5 mb-1 Avenir text-gray-900">
          Publisher
        </div>

        <select className="rounded cursor-pointer Avenir text-gray-900" id="firstDropdown" value={firstDropdownValue} onChange={handleFirstDropdownChange}>
        <option value="">Select an option</option>
          {
          publisher.map((p) => {
            return (
              <option key={p.name} value={p.name}>{p.name}</option>
            );
          })
          }
        </select>

        <div className="mt-5 mb-1 Avenir text-gray-900">
                  Item
        </div>

        <select className="rounded cursor-pointer Avenir text-gray-900" id="secondDropdown" value={secondDropdownValue} onChange={handleSecondDropdownChange}>
                <option value="">Select an option</option>
                {secondDropdownOptions.map((option) => (
                  <option key={option.name} value={option.name}>{option.name}</option>
                ))}
        </select>
        
        <div className="mt-5 mb-1 Avenir text-gray-900">
                  Subscription
        </div>
        <div className="container mx-auto mt-1">
          <ToggleButton inputValue={inputValue} />
        </div>


        <div className="flex justify-center mt-10 cursor-pointer">
            <a
              className="inline-flex items-center px-5 py-2 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-black border rounded-lg bg-gray-900"
              onClick={handleAddRow}
            >
              <span className="justify-center">Add</span>
            </a>
          </div>
          { tableData.length > 0  &&
          <div className="flex justify-center mt-10 cursor-pointer">
            <a
              className="inline-flex items-center px-5 py-2 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-black border rounded-lg bg-gray-900"
              onClick={handleDeleteRow}
            >
              <span className="justify-center">Delete Last</span>
            </a>
          </div>
          }


        </div>
        <div className="xl:mr-44 sm:mr-0 sm:mb-28 mb-0 lg:mb-0  md:pl-10 md:pr-10">
          
        { tableData.length > 0  && <div>
          <Table data={tableData} /> 
          
          <div class="max-w-md mx-auto rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-4 text-center">Total Amount</h2>
    <div class="flex items-center justify-center">
      <span class="text-4xl font-bold text-black-500">₹</span>
      <span class="text-6xl font-bold text-black-500">{totalFinalAmount}</span>
    </div>
    <div class="mt-6 flex items-center justify-center">
      <button class="bg-black hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded">
        Generate Bill
      </button>
    </div>
  </div>
  </div>
          
          
          }
          
        </div>

        

      </div>
      

    </section>
    
  );
}
