 import React from 'react'
 import "./index.css"
import LandingPage from './vendorDashboard/pages/LandingPage';
 import { Routes,Route } from 'react-router-dom';
 const App = () => {
   return (
     <div>
 
        
       <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route/>
       </Routes>
     </div>
   );
 }
 
 export default App