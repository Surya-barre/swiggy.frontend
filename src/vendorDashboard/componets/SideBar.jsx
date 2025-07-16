import React from "react";

const SideBar = ({ setShowFirm, setShowProduct, setShowAllProduct,showFirmTitle}) => {
 
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
     {showFirmTitle? <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={setShowFirm}
        >
          Add Firm
        </li>:""}
       
        <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={setShowProduct}
        >
          Add Product
        </li>
        <li
          className="hover:bg-gray-700 p-2 rounded cursor-pointer"
          onClick={setShowAllProduct}
        >
           My products
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          User Details
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
