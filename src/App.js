// src/App.js
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CloudProviderForm from "./components/CloudProviderForm";
import DataCenterForm from "./components/DataCenterForm";
import CloudPoolForm from "./components/CloudPoolForm";
import VirtualMachineForm from "./components/VirtualMachineForm";
import UserForm from "./components/UserForm";
import UnitForm from "./components/UnitForm";
import DiskForm from "./components/DiskForm";
import StorageForm from "./components/StorageForm";
import OSForm from "./components/OSForm";
import MyPage from "./components/MyPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && <NavBar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/my-page" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/cloud-providers"
          element={
            isAuthenticated ? <CloudProviderForm /> : <Navigate to="/" />
          }
        />
        <Route
          path="/data-centers"
          element={isAuthenticated ? <DataCenterForm /> : <Navigate to="/" />}
        />
        <Route
          path="/cloud-pools"
          element={isAuthenticated ? <CloudPoolForm /> : <Navigate to="/" />}
        />
        <Route
          path="/virtual-machines"
          element={
            isAuthenticated ? <VirtualMachineForm /> : <Navigate to="/" />
          }
        />
        <Route
          path="/users"
          element={isAuthenticated ? <UserForm /> : <Navigate to="/" />}
        />
        <Route
          path="/units"
          element={isAuthenticated ? <UnitForm /> : <Navigate to="/" />}
        />
        <Route
          path="/disks"
          element={isAuthenticated ? <DiskForm /> : <Navigate to="/" />}
        />
        <Route
          path="/storage-devices"
          element={isAuthenticated ? <StorageForm /> : <Navigate to="/" />}
        />
        <Route
          path="/operating-systems"
          element={isAuthenticated ? <OSForm /> : <Navigate to="/" />}
        />
        <Route
          path="/my-page"
          element={isAuthenticated ? <MyPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
