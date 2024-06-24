// src/components/CloudProviderForm.js
import React, { useState } from "react";
import { createCloudProvider } from "../services/api";

const CloudProviderForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCloudProvider({ name });
      console.log("Cloud Provider Created:", response.data);
    } catch (error) {
      console.error("Error creating cloud provider:", error);
    }
  };

  return (
    <div>
      <h2>Create Cloud Provider</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CloudProviderForm;
