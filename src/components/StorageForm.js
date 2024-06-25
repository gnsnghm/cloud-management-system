import React, { useState, useEffect } from "react";
import {
  getCloudPools,
  createStorage,
  createDisk,
  getUnits,
} from "../services/api";

const StorageForm = () => {
  const [cloudPoolId, setCloudPoolId] = useState("");
  const [storageName, setStorageName] = useState("");
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [cloudPools, setCloudPools] = useState([]);
  const [disks, setDisks] = useState([]);
  const [diskName, setDiskName] = useState("");
  const [diskSize, setDiskSize] = useState("");
  const [unitId, setUnitId] = useState("");
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cloudPoolResponse = await getCloudPools();
        const unitResponse = await getUnits();
        setCloudPools(cloudPoolResponse.data);
        setUnits(unitResponse.data);
        if (cloudPoolResponse.data.length > 0) {
          setCloudPoolId(cloudPoolResponse.data[0].cloud_pool_id);
        }
        if (unitResponse.data.length > 0) {
          setUnitId(unitResponse.data[0].unit_id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateTotalCapacity = () => {
      const total = disks.reduce((sum, disk) => sum + parseFloat(disk.size), 0);
      setTotalCapacity(total);
    };

    calculateTotalCapacity();
  }, [disks]);

  const handleAddDisk = () => {
    setDisks([
      ...disks,
      {
        name: diskName,
        size: parseFloat(diskSize),
        unit_id: parseInt(unitId, 10),
      },
    ]);
    setDiskName("");
    setDiskSize("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storageResponse = await createStorage({
        cloud_pool_id: parseInt(cloudPoolId, 10),
        storage_name: storageName,
        total_capacity: totalCapacity,
      });
      const storageId = storageResponse.data.storage_device_id;

      for (const disk of disks) {
        await createDisk({
          disk_name: disk.name,
          storage_device_id: storageId,
          size: disk.size,
          unit_id: disk.unit_id,
        });
      }
      console.log("Storage and disks created successfully");
    } catch (error) {
      console.error("Error creating storage and disks:", error);
    }
  };

  return (
    <div>
      <h2>Create Storage</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cloud Pool:</label>
          <select
            value={cloudPoolId}
            onChange={(e) => setCloudPoolId(e.target.value)}
          >
            {cloudPools.map((pool) => (
              <option key={pool.cloud_pool_id} value={pool.cloud_pool_id}>
                {pool.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Storage Name:</label>
          <input
            type="text"
            value={storageName}
            onChange={(e) => setStorageName(e.target.value)}
          />
        </div>
        <div>
          <label>Total Capacity:</label>
          <input type="number" value={totalCapacity} readOnly />
        </div>
        <div>
          <h3>Disks</h3>
          <div>
            <label>Disk Name:</label>
            <input
              type="text"
              value={diskName}
              onChange={(e) => setDiskName(e.target.value)}
            />
            <label>Disk Size:</label>
            <input
              type="number"
              value={diskSize}
              onChange={(e) => setDiskSize(e.target.value)}
            />
            <label>Unit:</label>
            <select value={unitId} onChange={(e) => setUnitId(e.target.value)}>
              {units.map((unit) => (
                <option key={unit.unit_id} value={unit.unit_id}>
                  {unit.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddDisk}>
              Add Disk
            </button>
          </div>
          <ul>
            {disks.map((disk, index) => (
              <li key={index}>
                {disk.name} - {disk.size}{" "}
                {units.find((unit) => unit.unit_id === disk.unit_id)?.name}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default StorageForm;
