import axios from "axios";
import React, { useState } from "react";
import { Apidata } from "../Data/Api";
 const Login = ({ RegisterHandler, welcomeHandler }) => {
 
    const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handlers = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Apidata}/vendor/login`, user);
      alert(res.data.message);
      
      localStorage.setItem("token", res.data.token);
       try{
        const vendorId = res.data.userId;
        const vendorResponse = await axios.get(
          `${Apidata}/vendor/single-vendor/${vendorId}`
        );
          console.log(vendorResponse)
          console.log(vendorResponse.data.vendor.firm[0].firmName);
          localStorage.setItem(
            "firmName",
            vendorResponse.data.vendor.firm[0].firmName
          );
          localStorage.setItem("firmId",vendorResponse.data.vendorFirmId)
          // alert("now you can add your restaurant");
        window.location.reload(); 
        // welcomeHandler();
       }catch(err){
        console.log(err,"hello idfdsklf");
        window.location.reload(); 
       }
      
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
        // if (err.response.data.message === "Vendor not found") {
        //   alert("Vendor not found ss");
        // }
      } else {
        console.error("An unexpected error occurred.");
      }
    }
    setUser({
      email: "",
      password: "",
    });
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h3 className="text-2xl font-semibold text-center mb-6">
          Vendor Login
        </h3>
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={user.email}
              placeholder="Enter your email"
              onChange={handlers}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              placeholder="Enter your password"
              onChange={handlers}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
