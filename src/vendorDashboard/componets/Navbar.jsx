import React from "react";

const Navbar = ({ setShowLogin, setShowRegister, showLogOut,logoutHandler }) => {
  const firmName=localStorage.getItem('firmName')
  return (
    <div className="bg-gray-900 text-white px-6 py-4 shadow-md flex items-center justify-between">
      <div className="text-2xl font-bold">Vendor Dashboard</div>
      <div>
        <h2 className="text-2xl text-red-600">firmName: {firmName ? `${firmName} restaurant` : ""}</h2>
      </div>
      <div className="space-x-6 text-sm font-medium">
        {!showLogOut ? (
          <>
            <span
              className="hover:text-gray-300 cursor-pointer"
              onClick={setShowLogin}
            >
              Login
            </span>
            <span
              className="hover:text-gray-300 cursor-pointer"
              onClick={setShowRegister}
            >
              Register
            </span>{" "}
          </>
        ) : (
          <span
            className="hover:text-gray-300 cursor-pointer"
            onClick={logoutHandler}
          >
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
