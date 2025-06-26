import axios from "axios";
import React, { useState } from "react";
import { Apidata as API_URL } from "../Data/Api";

const SignUp = ({ LoginHandler }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handler = (e) => {
    const { name, value } = e.target;
    // console.log(name, ":",value);
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const Submit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      const res = await axios.post(`${API_URL}/vendor/register`, data);
      alert(res.data.message); //
      if (res.data.message === "Vendor registered successfully") {
        LoginHandler();
      }
      console.log(res)
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        console.error("An unexpected error occurred.");
      }
    }

    // axios.post("http://localhost:4000/vendor/register",data).then(res=>console.log(res.data)).catch(err=>console.log(err))

    setData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h3 className="text-2xl font-semibold text-center mb-6">
          Vendor Register
        </h3>
        <form className="space-y-4" onSubmit={Submit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={data.username}
              name="username"
              onChange={handler}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={data.email}
              name="email"
              onChange={handler}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={data.password}
              name="password"
              onChange={handler}
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

export default SignUp;
