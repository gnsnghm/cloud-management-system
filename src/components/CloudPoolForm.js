// src/components/CloudPoolForm.js
import React, { useState, useEffect } from "react";
import { createCloudPool, getUnits, getDataCenters } from "../services/api";

const CloudPoolForm = () => {
  const [name, setName] = useState("");
  const [totalMemory, setTotalMemory] = useState("");
  const [totalMemoryUnitId, setTotalMemoryUnitId] = useState("");
  const [totalCpu, setTotalCpu] = useState("");
  const [totalDiskCapacity, setTotalDiskCapacity] = useState("");
  const [totalDiskUnitId, setTotalDiskUnitId] = useState("");
  const [dataCenterId, setDataCenterId] = useState("");
  const [dataCenters, setDataCenters] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCenterResponse = await getDataCenters();
        const unitResponse = await getUnits();
        setDataCenters(dataCenterResponse.data);
        setUnits(unitResponse.data);
        if (dataCenterResponse.data.length > 0) {
          setDataCenterId(dataCenterResponse.data[0].data_center_id); // 初期値として最初のデータセンターのIDをセット
        }
        if (unitResponse.data.length > 0) {
          setTotalMemoryUnitId(unitResponse.data[0].unit_id); // 初期値として最初の単位IDをセット
          setTotalDiskUnitId(unitResponse.data[0].unit_id); // 初期値として最初の単位IDをセット
        }
      } catch (error) {
        console.error("Error fetching data centers or units:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedDataCenterId = parseInt(dataCenterId, 10);
    const parsedTotalMemoryUnitId = parseInt(totalMemoryUnitId, 10);
    const parsedTotalDiskUnitId = parseInt(totalDiskUnitId, 10);
    if (
      isNaN(parsedDataCenterId) ||
      isNaN(parsedTotalMemoryUnitId) ||
      isNaN(parsedTotalDiskUnitId)
    ) {
      console.error("Invalid ID");
      return;
    }

    try {
      const response = await createCloudPool({
        name,
        total_memory: totalMemory,
        total_memory_unit_id: parsedTotalMemoryUnitId,
        total_cpu: totalCpu,
        total_disk_capacity: totalDiskCapacity,
        total_disk_unit_id: parsedTotalDiskUnitId,
        data_center_id: parsedDataCenterId,
      });
      console.log("Cloud Pool Created:", response.data);
    } catch (error) {
      console.error("Error creating cloud pool:", error);
    }
  };

  return (
    <div>
      <h2>Create Cloud Pool</h2>
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
          <label>Total Memory:</label>
          <input
            type="number"
            value={totalMemory}
            onChange={(e) => setTotalMemory(e.target.value)}
          />
          <select
            value={totalMemoryUnitId}
            onChange={(e) => setTotalMemoryUnitId(e.target.value)}
          >
            {units.map((unit) => (
              <option key={unit.unit_id} value={unit.unit_id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Total CPU:</label>
          <input
            type="number"
            value={totalCpu}
            onChange={(e) => setTotalCpu(e.target.value)}
          />
        </div>
        <div>
          <label>Total Disk Capacity:</label>
          <input
            type="number"
            value={totalDiskCapacity}
            onChange={(e) => setTotalDiskCapacity(e.target.value)}
          />
          <select
            value={totalDiskUnitId}
            onChange={(e) => setTotalDiskUnitId(e.target.value)}
          >
            {units.map((unit) => (
              <option key={unit.unit_id} value={unit.unit_id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Data Center:</label>
          <select
            value={dataCenterId}
            onChange={(e) => setDataCenterId(e.target.value)}
          >
            {dataCenters.map((dataCenter) => (
              <option
                key={dataCenter.data_center_id}
                value={dataCenter.data_center_id}
              >
                {dataCenter.name} ({dataCenter.location})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CloudPoolForm;
