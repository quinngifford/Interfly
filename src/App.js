import { useEffect, useState } from "react";
import logo from './logo.png';
import './App.css';
import { Search, Filter, DollarSign, Code, BookOpen, MessageSquare, SettingsIcon, HomeIcon, SidebarCloseIcon, UserIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Components/card';
import { Routes, Route, Link } from 'react-router-dom';
import Main from './Pages/Main';
import Settings from './Pages/Settings';
import Profile from './Pages/Profile';

function App() {
    return (
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </div>
    );
}

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen shadow-md flex flex-col p-4">
      {/* Logo Section */}
      <div className="flex mb-8">
        <img src={logo} alt="logo" className="w-20 h-20 rounded-full" />
        <button className="ml-auto p-2 text-gray-700 hover:text-gray-900">
          <SidebarCloseIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col space-y-2">
        <NavItem to="/" text="Main" icon={HomeIcon} />
        <NavItem to="/Profile" text="Profile" icon={UserIcon} />
        <NavItem to="/Settings" text="Settings" icon={SettingsIcon} />
      </nav>
    </div>
  );
};

const NavItem = ({ to, text, icon: Icon, badge }) => {
  return (
    <Link
      to={to}
      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 text-gray-700"
    >
      <div className="flex items-center">
        {Icon && <Icon className="h-6 w-6 mr-3" />} {/* Render the icon component */}
        <span>{text}</span>
      </div>
      {badge && (
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
};


export default App;
