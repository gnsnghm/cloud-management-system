// src/components/DataCenterForm.js
import React, { useState, useEffect } from "react";
import { createDataCenter, getCloudProviders } from "../services/api";

const DataCenterForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [providerId, setProviderId] = useState("");
  const [cloudProviders, setCloudProviders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCloudProviders();
        setCloudProviders(response.data);
        if (response.data.length > 0) {
          setProviderId(response.data[0].provider_id); // 初期値として最初のプロバイダーのIDをセット
        }
      } catch (error) {
        console.error("Error fetching cloud providers:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedProviderId = parseInt(providerId, 10);
    if (isNaN(parsedProviderId)) {
      console.error("Invalid provider_id");
      return;
    }

    try {
      const response = await createDataCenter({
        name,
        location,
        provider_id: parsedProviderId,
      });
      console.log("Data Center Created:", response.data);
    } catch (error) {
      console.error("Error creating data center:", error);
    }
  };

  return (
    <div>
      <h2>Create Data Center</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Cloud Provider:</label>
          <select
            value={providerId}
            onChange={(e) => setProviderId(e.target.value)}
          >
            {cloudProviders.map((provider) => (
              <option key={provider.provider_id} value={provider.provider_id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default DataCenterForm;
