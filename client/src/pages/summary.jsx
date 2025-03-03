import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Summary() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [rate, setRate] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  useEffect(() => {
    const storedPackages = JSON.parse(sessionStorage.getItem("packages"));
    if (storedPackages) {
      setPackages(storedPackages);
      console.log(storedPackages);
    }

    axios
      .get(`${import.meta.env.VITE_REACT_HOST}/box/getPrice`)
      .then((response) => {
        console.log(response.data);
        setRate(response.data.ratePerCubicM);
        setDeliveryCharge(response.data.deliveryCharge);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const goBack = () => {
    navigate("/");
  };


  const pricePerBox = (pkg) => {
    const volume = (pkg.length / 100) * (pkg.width / 100) * (pkg.height / 100);
    const amount = volume * pkg.quantity * rate;
    return amount;
  };

  const priceCalculation = () => {
    let totalAmount = 0;

    packages.forEach((pkg) => {
      totalAmount += pricePerBox(pkg);
    });

    totalAmount += deliveryCharge;

    return {
      totalAmount,
    };
  };

  const { totalAmount } = priceCalculation();

  console.log(packages);
  console.log(rate);
  console.log(deliveryCharge);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-100 rounded-lg p-6">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 pr-4 border-r border-gray-300">
            <h2 className="text-xl font-bold mb-6 text-center">
              Package Details
            </h2>

            {packages.map((pkg, index) => (
              <div key={index} className="mb-6">
                <div className="mb-2">
                  <span className="font-bold">Package Type: </span>
                  <span>{pkg.name}</span>
                </div>
                <div className="mb-2">
                  <span className="font-bold">Dimensions: </span>
                  <span>
                    (l){pkg.length.toFixed(2)}cm *(w){pkg.width.toFixed(2)}cm
                    *(h){pkg.height.toFixed(2)}cm
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-bold">Quantity: </span>
                  <span>{pkg.quantity}</span>
                </div>
                {index < packages.length - 1 && (
                  <hr className="my-4 border-gray-300" />
                )}
              </div>
            ))}
          </div>

          <div className="flex-1 pl-4 md:pl-8">
            <h2 className="text-xl font-bold mb-6 text-center">
              Total Price Summary
            </h2>

            <div className="space-y-4">
              {packages.map((pkg, index) => (
                <div className="flex justify-between">
                  <div className="font-bold">{pkg.name}</div>
                  <div className="flex items-center">
                    <span className="mr-2">:</span>
                    <span>{pricePerBox(pkg).toFixed(2)}</span>
                    <span>$</span>
                  </div>
                </div>
              ))}

              <div className="flex justify-between">
                <div className="font-bold">Delivery Charge</div>
                <div className="flex items-center">
                  <span className="mr-2">:</span>
                  <span>{deliveryCharge}</span>
                  <span>$</span>
                </div>
              </div>

              <hr className="my-2 border-gray-300" />

              <div className="flex justify-between">
                <div className="font-bold">Total</div>
                <div className="flex items-center">
                  <span className="mr-2">:</span>
                  <span>{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <button
          className="px-8 py-2 rounded-full bg-gray-200 text-gray-700 border border-orange-400 hover:bg-gray-300"
          onClick={goBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Summary;
