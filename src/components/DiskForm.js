import React, { useState, useEffect } from "react";
import {
  createDisk,
  getVirtualMachines,
  getStorageDevices,
  getUnits,
} from "../services/api";

const DiskForm = () => {
  const [vmId, setVmId] = useState("");
  const [storageDeviceId, setStorageDeviceId] = useState("");
  const [size, setSize] = useState("");
  const [unitId, setUnitId] = useState("");
  const [virtualMachines, setVirtualMachines] = useState([]);
  const [storageDevices, setStorageDevices] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vmResponse = await getVirtualMachines();
        const storageDeviceResponse = await getStorageDevices();
        const unitResponse = await getUnits();
        console.log("Virtual Machines:", vmResponse.data);
        console.log("Storage Devices:", storageDeviceResponse.data);
        console.log("Units:", unitResponse.data);
        setVirtualMachines(vmResponse.data);
        setStorageDevices(storageDeviceResponse.data);
        setUnits(unitResponse.data);
        if (vmResponse.data.length > 0) {
          setVmId(vmResponse.data[0].vm_id); // 初期値として最初のVM IDをセット
        }
        if (storageDeviceResponse.data.length > 0) {
          setStorageDeviceId(storageDeviceResponse.data[0].storage_device_id); // 初期値として最初のストレージデバイスIDをセット
        }
        if (unitResponse.data.length > 0) {
          setUnitId(unitResponse.data[0].unit_id); // 初期値として最初の単位IDをセット
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedVmId = parseInt(vmId, 10);
    const parsedStorageDeviceId = parseInt(storageDeviceId, 10);
    const parsedUnitId = parseInt(unitId, 10);
    if (
      isNaN(parsedVmId) ||
      isNaN(parsedStorageDeviceId) ||
      isNaN(parsedUnitId)
    ) {
      console.error("Invalid ID");
      return;
    }

    try {
      const response = await createDisk({
        vm_id: parsedVmId,
        storage_device_id: parsedStorageDeviceId,
        size: parseFloat(size),
        unit_id: parsedUnitId,
      });
      console.log("Disk Created:", response.data);
    } catch (error) {
      console.error("Error creating disk:", error);
    }
  };

  return (
    <div>
      <h2>Create Disk</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Virtual Machine:</label>
          <select value={vmId} onChange={(e) => setVmId(e.target.value)}>
            {virtualMachines.map((vm) => (
              <option key={vm.vm_id} value={vm.vm_id}>
                {vm.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Storage Device:</label>
          <select
            value={storageDeviceId}
            onChange={(e) => setStorageDeviceId(e.target.value)}
          >
            {storageDevices.map((device) => (
              <option
                key={device.storage_device_id}
                value={device.storage_device_id}
              >
                {device.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Size:</label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div>
          <label>Unit:</label>
          <select value={unitId} onChange={(e) => setUnitId(e.target.value)}>
            {units.map((unit) => (
              <option key={unit.unit_id} value={unit.unit_id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default DiskForm;
