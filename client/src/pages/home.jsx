
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (id, key, value) => {
    if (key === 'length' || key === 'width' || key === 'height' || key === 'quantity') {
      if (value < 0) {
        return;
      }
    }

    const updatedPackages = packages.map(pkg => {
      if (pkg.id === id) {
        return {
          ...pkg,
          [key]: Number(value)
        }
      }
      return pkg;
    });
    setPackages(updatedPackages);
  }

  useEffect(() => {
    const storedPackages = JSON.parse(sessionStorage.getItem('packages'));
    if (storedPackages) {
      setPackages(storedPackages);
      console.log(storedPackages);
      return;
    }

    axios.get(`${import.meta.env.VITE_REACT_HOST}/box/getAll`)
      .then(response => {
        setPackages(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);


  const addNewPackage = () => {
    const newPackage = {
      id: "new",
      name: "Box C",
      length: 0,
      width: 0,
      height: 0,
      quantity: 0
    }
    setPackages([...packages, newPackage]);
  }

  const navigateToSummary = () => {
    sessionStorage.setItem('packages', JSON.stringify(packages));
    navigate('/summary');
  }

  return (
    <div className="p-20">
      <h1 className=" font-bold text-2xl mb-10">Package Details</h1>

      {packages.map((pkg, index) => (
              <div className="mt-5" key={index}>
              <div className="flex justify-between gap-10 bg-white p-5 rounded-md shadow-md">
                <div className="relative w-full mr-20">
                  <label className="text-sm font-medium absolute -top-2 left-2 bg-white px-1">Package Type</label>
                  <select disabled
                        className="w-full border border-gray-700 bg-white rounded-md p-2 pl-3 pr-8 h-12"
                        value={""}
                        //onChange={(e) => handleChange(pkg.id, 'name', e.target.value)}
                      >
                        <option value={pkg.name}>{pkg.name}</option>
                      </select>
                </div>
                <div className='flex gap-5'>
                <div className="relative w-full">
                  <label className="text-sm font-medium absolute -top-2 left-2 bg-white px-1">Length </label>
                  <span className="absolute text-red-500 right-[-0.5rem] top-[-0.8rem] font-bold">*</span>
                  <input disabled={pkg.id !== "new"}
                    type="number"
                    className="w-full border border-gray-700 rounded-md p-2 pl-3 pr-8 h-12"
                    value={pkg.length || ""}
                    onChange={(e) => handleChange(pkg.id, 'length', e.target.value)}
                  />
                   <span className="absolute right-3 top-3 text-gray-700">cm</span>
                </div>
                <div className="relative w-full">
                  <label className="text-sm font-medium absolute -top-2 left-2 bg-white px-1">Width </label>
                  <span className="absolute text-red-500 right-[-0.5rem] top-[-0.8rem] font-bold">*</span>
                  <input disabled={pkg.id !== "new"}
                    type="number"
                    className="w-full border border-gray-700 rounded-md p-2 pl-3 pr-8 h-12"
                    value={pkg.width || ""}
                    onChange={(e) => handleChange(pkg.id, 'width', e.target.value)}
                  />
                   <span className="absolute right-3 top-3 text-gray-700">cm</span>
                </div>
                <div className="relative w-full">
                  <label className="text-sm font-medium absolute -top-2 left-2 bg-white px-1">Height </label>
                  <span className="absolute text-red-500 right-[-0.5rem] top-[-0.8rem] font-bold">*</span>
                  <input disabled={pkg.id !== "new"}
                    type="number"
                    className="w-full border border-gray-700 rounded-md p-2 pl-3 pr-8 h-12"
                    value={pkg.height || ""}
                    onChange={(e) => handleChange(pkg.id, 'height', e.target.value)}
                  />
                   <span className="absolute right-3 top-3 text-gray-700">cm</span>
                </div>
                <div className="relative w-full">
                  <label className="text-sm font-medium absolute -top-2 left-2 bg-white px-1">Quantity </label>
                  <span className="absolute text-red-500 right-[-0.5rem] top-[-0.8rem] font-bold">*</span>
                  <input
                    type="number"
                    className="w-full border border-gray-700 rounded-md p-2 pl-3 pr-8 h-12"
                    value={pkg.quantity || ""}
                    onChange={(e) => handleChange(pkg.id, 'quantity', e.target.value)}
                  />
                </div>
                </div>
              </div>
            </div>        
      ))}



      <div className='flex justify-between gap-10 mt-10'>
        <button className="bg-white border border-red-500 text-gray-700 p-2 mt-10 px-5 rounded-full" onClick={addNewPackage}>ADD ANOTHER</button>
        <button className="bg-red-500 border border-red-500 text-white font-semibold p-2 mt-10 px-10 rounded-full" onClick={navigateToSummary}>Next</button>
      </div>
    </div>
  );
}

export default Home;