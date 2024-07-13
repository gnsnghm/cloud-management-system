import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";
import {
  getCloudPools,
  getUnits,
  getOperatingSystems,
  getUsers,
  createVirtualMachine,
  getDisks,
  updateVirtualMachine,
  deleteVirtualMachine,
  getVirtualMachines,
  getDataCenters,
} from "../services/api";

import "./style.css";

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
  const [diskId, setDiskId] = useState("");
  const [cloudPools, setCloudPools] = useState([]);
  const [units, setUnits] = useState([]);
  const [operatingSystems, setOperatingSystems] = useState([]);
  const [users, setUsers] = useState([]);
  const [disks, setDisks] = useState([]);
  const [virtualMachines, setVirtualMachines] = useState([]);
  const [dataCenters, setDataCenters] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editVMId, setEditVMId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cloudPoolResponse = await getCloudPools();
      const unitResponse = await getUnits();
      const osResponse = await getOperatingSystems();
      const userResponse = await getUsers();
      const diskResponse = await getDisks();
      const vmResponse = await getVirtualMachines();
      const dataCenterResponse = await getDataCenters();

      setCloudPools(cloudPoolResponse.data);
      setUnits(unitResponse.data);
      setOperatingSystems(osResponse.data);
      setUsers(userResponse.data);
      setDisks(diskResponse.data);
      setVirtualMachines(vmResponse.data);
      setDataCenters(dataCenterResponse.data);

      if (cloudPoolResponse.data.length > 0) {
        setCloudPoolId(cloudPoolResponse.data[0].cloud_pool_id);
      }
      if (unitResponse.data.length > 0) {
        setMemoryUnitId(unitResponse.data[0].unit_id);
        setDiskUnitId(unitResponse.data[0].unit_id);
      }
      if (osResponse.data.length > 0) {
        setOsId(osResponse.data[0].os_id);
      }
      if (userResponse.data.length > 0) {
        setUserId(userResponse.data[0].user_id);
      }
      if (diskResponse.data.length > 0) {
        setDiskId(diskResponse.data[0].disk_id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vmData = {
        name,
        memory_size: parseFloat(memorySize),
        memory_unit_id: parseInt(memoryUnitId, 10),
        disk_id: parseInt(diskId, 10),
        disk_size: parseFloat(diskSize),
        disk_unit_id: parseInt(diskUnitId, 10),
        cloud_pool_id: parseInt(cloudPoolId, 10),
        os_id: parseInt(osId, 10),
        user_id: parseInt(userId, 10),
        ipv4,
        ipv6,
        vlan: vlan === "" ? null : vlan,
      };

      if (editMode) {
        await updateVirtualMachine(editVMId, vmData);
        setEditMode(false);
        setEditVMId(null);
      } else {
        await createVirtualMachine(vmData);
      }

      setName("");
      setMemorySize("");
      setMemoryUnitId("");
      setDiskSize("");
      setDiskUnitId("");
      setCloudPoolId("");
      setOsId("");
      setUserId("");
      setIpv4("");
      setIpv6("");
      setVlan("");
      setDiskId("");
      fetchData();
    } catch (error) {
      console.error("Error creating/updating virtual machine:", error);
    }
  };

  const handleEdit = (vm) => {
    setName(vm.name);
    setMemorySize(vm.memory_size);
    setMemoryUnitId(vm.memory_unit_id);
    setDiskSize(vm.disk_size);
    setDiskUnitId(vm.disk_unit_id);
    setCloudPoolId(vm.cloud_pool_id);
    setOsId(vm.os_id);
    setUserId(vm.user_id);
    setIpv4(vm.ipv4);
    setIpv6(vm.ipv6);
    setVlan(vm.vlan);
    setDiskId(vm.disk_id);
    setEditMode(true);
    setEditVMId(vm.vm_id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteVirtualMachine(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting virtual machine:", error);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                {editMode ? "Edit Virtual Machine" : "Create Virtual Machine"}
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group id="memorySize" className="mt-3">
                  <Form.Label>Memory Size</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        value={memorySize}
                        onChange={(e) => setMemorySize(e.target.value)}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={memoryUnitId}
                        onChange={(e) => setMemoryUnitId(e.target.value)}
                        required
                      >
                        <option value="">Select Unit</option>
                        {units.map((unit) => (
                          <option key={unit.unit_id} value={unit.unit_id}>
                            {unit.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group id="disk" className="mt-3">
                  <Form.Label>Disk</Form.Label>
                  <Form.Control
                    as="select"
                    value={diskId}
                    onChange={(e) => setDiskId(e.target.value)}
                    required
                  >
                    <option value="">Select Disk</option>
                    {disks.map((disk) => (
                      <option key={disk.disk_id} value={disk.disk_id}>
                        {disk.disk_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group id="diskSize" className="mt-3">
                  <Form.Label>Disk Size</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        value={diskSize}
                        onChange={(e) => setDiskSize(e.target.value)}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={diskUnitId}
                        onChange={(e) => setDiskUnitId(e.target.value)}
                        required
                      >
                        <option value="">Select Unit</option>
                        {units.map((unit) => (
                          <option key={unit.unit_id} value={unit.unit_id}>
                            {unit.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group id="cloudPool" className="mt-3">
                  <Form.Label>Cloud Pool</Form.Label>
                  <Form.Control
                    as="select"
                    value={cloudPoolId}
                    onChange={(e) => setCloudPoolId(e.target.value)}
                    required
                  >
                    <option value="">Select Cloud Pool</option>
                    {cloudPools.map((pool) => {
                      const dataCenterName = dataCenters.find(
                        (dc) => dc.data_center_id === pool.data_center_id
                      )?.name;
                      return (
                        <option
                          key={pool.cloud_pool_id}
                          value={pool.cloud_pool_id}
                        >
                          {pool.name} ({dataCenterName})
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group id="os" className="mt-3">
                  <Form.Label>OS</Form.Label>
                  <Form.Control
                    as="select"
                    value={osId}
                    onChange={(e) => setOsId(e.target.value)}
                    required
                  >
                    <option value="">Select Operating System</option>
                    {operatingSystems.map((os) => (
                      <option key={os.os_id} value={os.os_id}>
                        {os.name}({os.version})
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group id="user" className="mt-3">
                  <Form.Label>Manage user</Form.Label>
                  <Form.Control
                    as="select"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  >
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.username} ({user.email})
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group id="ipv4" className="mt-3">
                  <Form.Label>IPv4</Form.Label>
                  <Form.Control
                    type="text"
                    value={ipv4}
                    onChange={(e) => setIpv4(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="ipv6" className="mt-3">
                  <Form.Label>IPv6</Form.Label>
                  <Form.Control
                    type="text"
                    value={ipv6}
                    onChange={(e) => setIpv6(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="vlan" className="mt-3">
                  <Form.Label>VLAN</Form.Label>
                  <Form.Control
                    type="number"
                    value={vlan}
                    onChange={(e) => setVlan(e.target.value)}
                  />
                </Form.Group>
                <Button className="w-100 mt-4" type="submit">
                  {editMode ? "Update" : "Create"}
                </Button>
                {editMode && (
                  <Button
                    className="w-100 mt-2"
                    variant="secondary"
                    onClick={() => {
                      setEditMode(false);
                      setEditVMId(null);
                      setName("");
                      setMemorySize("");
                      setMemoryUnitId("");
                      setDiskSize("");
                      setDiskUnitId("");
                      setCloudPoolId("");
                      setOsId("");
                      setUserId("");
                      setIpv4("");
                      setIpv6("");
                      setVlan("");
                      setDiskId("");
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2 className="text-center mb-4">Virtual Machines</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Memory</th>
                <th>Disk</th>
                <th>Cloud Pool</th>
                <th>OS</th>
                <th>User</th>
                <th>IPv4</th>
                <th>IPv6</th>
                <th>VLAN</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {virtualMachines.map((vm) => (
                <tr key={vm.vm_id}>
                  <td>{vm.name}</td>
                  <td>
                    {vm.memory_size}{" "}
                    {
                      units.find((unit) => unit.unit_id === vm.memory_unit_id)
                        ?.name
                    }
                  </td>
                  <td>
                    {vm.disk_size}{" "}
                    {
                      units.find((unit) => unit.unit_id === vm.disk_unit_id)
                        ?.name
                    }{" "}
                    (
                    {
                      disks.find((disk) => disk.disk_id === vm.disk_id)
                        ?.disk_name
                    }
                    )
                  </td>
                  <td>
                    {
                      cloudPools.find(
                        (pool) => pool.cloud_pool_id === vm.cloud_pool_id
                      )?.name
                    }
                  </td>
                  <td>
                    {operatingSystems.find((os) => os.os_id === vm.os_id)?.name}
                  </td>
                  <td>
                    {
                      users.find((user) => user.user_id === vm.user_id)
                        ?.username
                    }
                  </td>
                  <td>{vm.ipv4}</td>
                  <td>{vm.ipv6}</td>
                  <td>{vm.vlan}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(vm)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(vm.vm_id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default VirtualMachineForm;
