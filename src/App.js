// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CloudProviderForm from "./components/CloudProviderForm";
import DataCenterForm from "./components/DataCenterForm";
import CloudPoolForm from "./components/CloudPoolForm";
import VirtualMachineForm from "./components/VirtualMachineForm";
import UserForm from "./components/UserForm";
import UnitForm from "./components/UnitForm";
import StorageForm from "./components/StorageForm";
import OSForm from "./components/OSForm";
import MyPage from "./components/MyPage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cloud-provider" element={<CloudProviderForm />} />
            <Route path="/data-center" element={<DataCenterForm />} />
            <Route path="/cloud-pool" element={<CloudPoolForm />} />
            <Route path="/virtual-machine" element={<VirtualMachineForm />} />
            <Route path="/user" element={<UserForm />} />
            <Route path="/unit" element={<UnitForm />} />
            <Route path="/storage" element={<StorageForm />} />
            <Route path="/os" element={<OSForm />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
