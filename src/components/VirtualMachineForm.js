import React, { useState, useEffect } from "react";
import {
  createVirtualMachine,
  getCloudPools,
  getUnits,
  getOperatingSystems,
  getUsers,
} from "../services/api";

const VirtualMachineForm = () => {
  const [name, setName] = useState("");
  const [memory, setMemory] = useState("");
  const [memoryUnitId, setMemoryUnitId] = useState("");
  const [cpu, setCpu] = useState("");
  const [diskCapacity, setDiskCapacity] = useState("");
  const [diskUnitId, setDiskUnitId] = useState("");
  const [cloudPoolId, setCloudPoolId] = useState("");
  const [osId, setOsId] = useState("");
  const [userId, setUserId] = useState("");
  const [cloudPools, setCloudPools] = useState([]);
  const [units, setUnits] = useState([]);
  const [operatingSystems, setOperatingSystems] = useState([]);
  const [users, setUsers] = useState([]);
  const [partitions, setPartitions] = useState([
    { disk_id: "", size: "", unit_id: "", filesystem: "" },
  ]);
  const [ipAddresses, setIpAddresses] = useState([
    { vlan: "", ipv4: "", ipv6: "" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cloudPoolResponse = await getCloudPools();
        const unitResponse = await getUnits();
        const osResponse = await getOperatingSystems();
        const userResponse = await getUsers();
        setCloudPools(cloudPoolResponse.data);
        setUnits(unitResponse.data);
        setOperatingSystems(osResponse.data);
        setUsers(userResponse.data);
        if (cloudPoolResponse.data.length > 0) {
          setCloudPoolId(cloudPoolResponse.data[0].cloud_pool_id); // 初期値として最初のクラウドプールのIDをセット
        }
        if (unitResponse.data.length > 0) {
          setMemoryUnitId(unitResponse.data[0].unit_id); // 初期値として最初の単位IDをセット
          setDiskUnitId(unitResponse.data[0].unit_id); // 初期値として最初の単位IDをセット
        }
        if (osResponse.data.length > 0) {
          setOsId(osResponse.data[0].os_id); // 初期値として最初のOS IDをセット
        }
        if (userResponse.data.length > 0) {
          setUserId(userResponse.data[0].user_id); // 初期値として最初のユーザーIDをセット
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePartitionChange = (index, field, value) => {
    const newPartitions = [...partitions];
    newPartitions[index][field] = value;
    setPartitions(newPartitions);
  };

  const handleAddPartition = () => {
    setPartitions([
      ...partitions,
      { disk_id: "", size: "", unit_id: "", filesystem: "" },
    ]);
  };

  const handleRemovePartition = (index) => {
    const newPartitions = partitions.filter((_, i) => i !== index);
    setPartitions(newPartitions);
  };

  const handleIpAddressChange = (index, field, value) => {
    const newIpAddresses = [...ipAddresses];
    newIpAddresses[index][field] = value;
    setIpAddresses(newIpAddresses);
  };

  const handleAddIpAddress = () => {
    setIpAddresses([...ipAddresses, { vlan: "", ipv4: "", ipv6: "" }]);
  };

  const handleRemoveIpAddress = (index) => {
    const newIpAddresses = ipAddresses.filter((_, i) => i !== index);
    setIpAddresses(newIpAddresses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedMemoryUnitId = parseInt(memoryUnitId, 10);
    const parsedDiskUnitId = parseInt(diskUnitId, 10);
    const parsedCloudPoolId = parseInt(cloudPoolId, 10);
    const parsedOsId = parseInt(osId, 10);
    const parsedUserId = parseInt(userId, 10);
    if (
      isNaN(parsedMemoryUnitId) ||
      isNaN(parsedDiskUnitId) ||
      isNaN(parsedCloudPoolId) ||
      isNaN(parsedOsId) ||
      isNaN(parsedUserId)
    ) {
      console.error("Invalid ID");
      return;
    }

    try {
      const response = await createVirtualMachine({
        name,
        memory,
        memory_unit_id: parsedMemoryUnitId,
        cpu,
        disk_capacity: diskCapacity,
        disk_unit_id: parsedDiskUnitId,
        cloud_pool_id: parsedCloudPoolId,
        os_id: parsedOsId,
        user_id: parsedUserId,
        partitions,
        ip_addresses: ipAddresses,
      });
      console.log("Virtual Machine Created:", response.data);
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
          <label>Memory:</label>
          <input
            type="number"
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
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
          <label>CPU:</label>
          <input
            type="number"
            value={cpu}
            onChange={(e) => setCpu(e.target.value)}
          />
        </div>
        <div>
          <label>Disk Capacity:</label>
          <input
            type="number"
            value={diskCapacity}
            onChange={(e) => setDiskCapacity(e.target.value)}
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
        <div>
          <label>Operating System:</label>
          <select value={osId} onChange={(e) => setOsId(e.target.value)}>
            {operatingSystems.map((os) => (
              <option key={os.os_id} value={os.os_id}>
                {os.name} {os.version}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>User:</label>
          <select value={userId} onChange={(e) => setUserId(e.target.value)}>
            {users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Partitions:</label>
          {partitions.map((partition, index) => (
            <div key={index}>
              <input
                type="number"
                placeholder="Disk ID"
                value={partition.disk_id}
                onChange={(e) =>
                  handlePartitionChange(index, "disk_id", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Size"
                value={partition.size}
                onChange={(e) =>
                  handlePartitionChange(index, "size", e.target.value)
                }
              />
              <select
                value={partition.unit_id}
                onChange={(e) =>
                  handlePartitionChange(index, "unit_id", e.target.value)
                }
              >
                {units.map((unit) => (
                  <option key={unit.unit_id} value={unit.unit_id}>
                    {unit.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Filesystem"
                value={partition.filesystem}
                onChange={(e) =>
                  handlePartitionChange(index, "filesystem", e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => handleRemovePartition(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddPartition}>
            Add Partition
          </button>
        </div>
        <div>
          <label>IP Addresses:</label>
          {ipAddresses.map((ip, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="VLAN"
                value={ip.vlan}
                onChange={(e) =>
                  handleIpAddressChange(index, "vlan", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="IPv4"
                value={ip.ipv4}
                onChange={(e) =>
                  handleIpAddressChange(index, "ipv4", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="IPv6"
                value={ip.ipv6}
                onChange={(e) =>
                  handleIpAddressChange(index, "ipv6", e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => handleRemoveIpAddress(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddIpAddress}>
            Add IP Address
          </button>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default VirtualMachineForm;
