import React, { useDebugValue, useEffect, useState } from "react";
import Navbar from "../componets/Navbar";
import Login from "../componets/forms/Login";
import SignUp from "../componets/forms/SignUp";
import AddProduct from "../componets/forms/AddProduct";
import AddFirm from "../componets/forms/AddFirm";
import SideBar from "../componets/SideBar";
import VendorLogin from "../componets/forms/VendorLogin";
import AllProduct from "../componets/forms/AllProduct";
const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister,setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome,setShowWelcome]=useState(false);
  const [showAllProduct,setShowAllProduct]=useState(false);
   const [showLogOut,setShowLogout]=useState(false);
  const [showFirmTitle,setShowFirmTitle]=useState(true)
  useEffect(()=>{
     const loginToken=localStorage.getItem("token");
     if(loginToken ){
       setShowLogout(true)
     }
},[])
useEffect(()=>{
  const firmName=localStorage.getItem('firmName')
  console.log("firm name is:",firmName)
  if(firmName){
     
    setShowFirmTitle(false);
  }
},[])
const logoutHandler = () => {

  const isConfirmed = window.confirm("Are you sure to logout?");
  if (isConfirmed) {
    localStorage.removeItem("token");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");
    setShowLogout(false);
    setShowFirmTitle(true);
  }
};

  const RigisterHandler=()=>{
    
      setShowRegister(true);
      setShowLogin(false);
      setShowProduct(false);
      setShowFirm(false);
      setShowWelcome(false);
      setShowAllProduct(false);

  }
  const LoginHandler = () => {
    
      setShowLogin(true);
      setShowRegister(false);
      setShowProduct(false);
      setShowFirm(false);
      setShowWelcome(false);
      setShowAllProduct(false);
  };
  const   FirmHandler = () => {
    setShowFirm(true);
    setShowRegister(false);
    setShowLogin(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProduct(false);
  };
  const productHandler = () => {
    setShowProduct(true);
    setShowFirm(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowWelcome(false);
    setShowAllProduct(false);

  };
  const welcomeHandler=()=>{
    setShowWelcome(true);
    setShowProduct(false);
    setShowFirm(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowAllProduct(false);
    
  }
  const allProductHandler=()=>{
    setShowAllProduct(true)
    setShowWelcome(false);
    setShowProduct(false);
    setShowFirm(false);
    setShowRegister(false);
    setShowLogin(false);
  }
console.log(showWelcome)
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setShowLogin={LoginHandler} setShowRegister={RigisterHandler} showLogOut={showLogOut} logoutHandler={logoutHandler}/>
      <div className="flex">
        <SideBar
          setShowFirm={FirmHandler}
          setShowProduct={productHandler}
          setShowAllProduct={allProductHandler}
          showFirmTitle={showFirmTitle}
        />
        <div className="flex-grow flex items-center justify-center bg-gray-100">
          {showLogin && (
            <Login
              RigisterHandler={RigisterHandler}
              welcomeHandler={welcomeHandler}
            />
          )}
          {showRegister && <SignUp LoginHandler={LoginHandler} />}
          {showFirm && <AddFirm />}
          {showProduct && <AddProduct />}
          {showWelcome && <VendorLogin />}
          {showAllProduct && <AllProduct />}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
