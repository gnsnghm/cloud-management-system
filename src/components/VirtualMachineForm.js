import React, { useState, useEffect } from "react";
import {
  getCloudPools,
  getUnits,
  getOperatingSystems,
  getUsers,
  createVirtualMachine,
  getDisks,
} from "../services/api";

const VirtualMachineForm = () => {
  const [name, setName] = useState("");
  const [memorySize, setMemorySize] = useState("");
  const [memoryUnitId, setMemoryUnitId] = useState("");
  const [diskSize, setDiskSize] = useState("");
  const [diskUnitId, setDiskUnitId] = useState("");
  const [cloudPoolId, setCloudPoolId] = useState("");
  const [osId, setOsId] = useState("");
  const [userId, setUserId] = useState("");
  const [ipv4, setIpv4] = useState("");
  const [ipv6, setIpv6] = useState("");
  const [vlan, setVlan] = useState("");
  const [partitions, setPartitions] = useState([]);
  const [partitionSize, setPartitionSize] = useState("");
  const [partitionUnitId, setPartitionUnitId] = useState("");
  const [partitionFilesystem, setPartitionFilesystem] = useState("");
  const [partitionDiskName, setPartitionDiskName] = useState("");
  const [cloudPools, setCloudPools] = useState([]);
  const [units, setUnits] = useState([]);
  const [operatingSystems, setOperatingSystems] = useState([]);
  const [users, setUsers] = useState([]);
  const [disks, setDisks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cloudPoolResponse = await getCloudPools();
        const unitResponse = await getUnits();
        const osResponse = await getOperatingSystems();
        const userResponse = await getUsers();
        const diskResponse = await getDisks();

        setCloudPools(cloudPoolResponse.data);
        setUnits(unitResponse.data);
        setOperatingSystems(osResponse.data);
        setUsers(userResponse.data);
        setDisks(diskResponse.data);

        if (cloudPoolResponse.data.length > 0) {
          setCloudPoolId(cloudPoolResponse.data[0].cloud_pool_id);
        }
        if (unitResponse.data.length > 0) {
          setMemoryUnitId(unitResponse.data[0].unit_id);
          setDiskUnitId(unitResponse.data[0].unit_id);
          setPartitionUnitId(unitResponse.data[0].unit_id);
        }
        if (osResponse.data.length > 0) {
          setOsId(osResponse.data[0].os_id);
        }
        if (userResponse.data.length > 0) {
          setUserId(userResponse.data[0].user_id);
        }
        if (diskResponse.data.length > 0) {
          setPartitionDiskName(diskResponse.data[0].disk_name);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddPartition = () => {
    const selectedDisk = disks.find(
      (disk) => disk.disk_name === partitionDiskName
    );
    if (selectedDisk) {
      setPartitions([
        ...partitions,
        {
          size: partitionSize,
          unit_id: partitionUnitId,
          filesystem: partitionFilesystem,
          disk_id: selectedDisk.disk_id,
        },
      ]);
      setPartitionSize("");
      setPartitionFilesystem("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const vmResponse = await createVirtualMachine({
        name,
        memory_size: parseFloat(memorySize),
        memory_unit_id: parseInt(memoryUnitId, 10),
        disk_size: parseFloat(diskSize),
        disk_unit_id: parseInt(diskUnitId, 10),
        cloud_pool_id: parseInt(cloudPoolId, 10),
        os_id: parseInt(osId, 10),
        user_id: parseInt(userId, 10),
        ipv4,
        ipv6,
        vlan,
        partitions,
      });
      console.log("Virtual machine created successfully", vmResponse.data);
    } catch (error) {
      console.error("Error creating virtual machine:", error);
    }
  };

  return (
    <div>
      <h2>Create Virtual Machine</h2>
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
          <label>Memory Size:</label>
          <input
            type="number"
            value={memorySize}
            onChange={(e) => setMemorySize(e.target.value)}
          />
          <select
            value={memoryUnitId}
            onChange={(e) => setMemoryUnitId(e.target.value)}
          >
            {units.map((unit) => (
              <option key={unit.unit_id} value={unit.unit_id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Disk Size:</label>
          <input
            type="number"
            value={diskSize}
            onChange={(e) => setDiskSize(e.target.value)}
          />
          <select
            value={diskUnitId}
            onChange={(e) => setDiskUnitId(e.target.value)}
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
            {cloudPools.map((pool) => (
              <option key={pool.cloud_pool_id} value={pool.cloud_pool_id}>
                {pool.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Operating System:</label>
          <select value={osId} onChange={(e) => setOsId(e.target.value)}>
            {operatingSystems.map((os) => (
              <option key={os.os_id} value={os.os_id}>
                {os.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>User:</label>
          <select value={userId} onChange={(e) => setUserId(e.target.value)}>
            {users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>IPv4:</label>
          <input
            type="text"
            value={ipv4}
            onChange={(e) => setIpv4(e.target.value)}
          />
        </div>
        <div>
          <label>IPv6:</label>
          <input
            type="text"
            value={ipv6}
            onChange={(e) => setIpv6(e.target.value)}
          />
        </div>
        <div>
          <label>VLAN:</label>
          <input
            type="text"
            value={vlan}
            onChange={(e) => setVlan(e.target.value)}
          />
        </div>
        <div>
          <h3>Partitions</h3>
          <div>
            <label>Partition Size:</label>
            <input
              type="number"
              value={partitionSize}
              onChange={(e) => setPartitionSize(e.target.value)}
            />
            <label>Unit:</label>
            <select
              value={partitionUnitId}
              onChange={(e) => setPartitionUnitId(e.target.value)}
            >
              {units.map((unit) => (
                <option key={unit.unit_id} value={unit.unit_id}>
                  {unit.name}
                </option>
              ))}
            </select>
            <label>Filesystem:</label>
            <input
              type="text"
              value={partitionFilesystem}
              onChange={(e) => setPartitionFilesystem(e.target.value)}
            />
            <label>Disk:</label>
            <select
              value={partitionDiskName}
              onChange={(e) => setPartitionDiskName(e.target.value)}
            >
              {disks.map((disk) => (
                <option key={disk.disk_id} value={disk.disk_name}>
                  {disk.disk_name}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddPartition}>
              Add Partition
            </button>
          </div>
          <ul>
            {partitions.map((partition, index) => (
              <li key={index}>
                {partition.size}{" "}
                {units.find((unit) => unit.unit_id === partition.unit_id)?.name}{" "}
                - {partition.filesystem} (Disk ID: {partition.disk_id})
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default VirtualMachineForm;
