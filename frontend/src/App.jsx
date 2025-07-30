import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Dashboard from "./Pages/Dashboard";
import Inbox from "./Pages/Inbox";
import RegistrationForm from "./Pages/RegistrationForm";
import MoneyMarketForm from "./Pages/MoneyMarketForm";
import DealPosting from "./Components/Dashboard/DealBoardSection";

import "./App.css";
import ProfilePage from "./Pages/ProfilePage";
import DealDetails from "./Pages/DealDetails";

const App = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showNotification, setShowNotification] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <Router>
  <Routes>
    <Route path="/" element={<RegistrationForm />} /> {/* Default path */}
    <Route path="/register" element={<RegistrationForm />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/inbox" element={<Inbox />} />
    <Route path="/profilePage" element = {<ProfilePage/>}/> 
    <Route path="/postadeal" element = {<MoneyMarketForm/>} />
    <Route path="/deal" element = {<DealDetails/>} />
  </Routes>
</Router>

  );
};

export default App;
