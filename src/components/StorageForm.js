// src/components/StorageForm.js
import React, { useState, useEffect } from "react";
import {
  createStorage,
  getCloudPools,
  getUnits,
  getStorage,
} from "../services/api";

const StorageForm = () => {
  const [name, setName] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");
  const [totalCapacityUnitId, setTotalCapacityUnitId] = useState("");
  const [cloudPoolId, setCloudPoolId] = useState("");
  const [cloudPools, setCloudPools] = useState([]);
  const [units, setUnits] = useState([]);
  const [storages, setStorages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cloudPoolResponse = await getCloudPools();
      const unitResponse = await getUnits();
      const storageResponse = await getStorage();
      setCloudPools(cloudPoolResponse.data);
      setUnits(unitResponse.data);
      setStorages(storageResponse.data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createStorage({
        name,
        total_capacity: totalCapacity,
        total_capacity_unit_id: totalCapacityUnitId,
        cloud_pool_id: cloudPoolId,
      });
      console.log("Storage Created:", response.data);
    } catch (error) {
      console.error("Error creating storage:", error);
    }
  };

  return (
    <div>
      <h2>Create Storage</h2>
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
          <label>Total Capacity:</label>
          <input
            type="number"
            value={totalCapacity}
            onChange={(e) => setTotalCapacity(e.target.value)}
          />
          <select
            value={totalCapacityUnitId}
            onChange={(e) => setTotalCapacityUnitId(e.target.value)}
          >
            {units.map((unit) => (
              <option key={unit.unit_id} value={unit.unit_id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Cloud Pool:</label>
          <select
            value={cloudPoolId}
            onChange={(e) => setCloudPoolId(e.target.value)}
          >
            {cloudPools.map((cloudPool) => (
              <option
                key={cloudPool.cloud_pool_id}
                value={cloudPool.cloud_pool_id}
              >
                {cloudPool.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
      <h2>Existing Storages</h2>
      <ul>
        {storages.map((storage) => (
          <li key={storage.storage_device_id}>{storage.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StorageForm;
