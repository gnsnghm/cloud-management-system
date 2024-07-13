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
  createCloudPool,
  getUnits,
  getDataCenters,
  getCloudPools,
  updateCloudPool,
  deleteCloudPool,
} from "../services/api";

import "./style.css";

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
  const [cloudPools, setCloudPools] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editCloudPoolId, setEditCloudPoolId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCenterResponse = await getDataCenters();
        const unitResponse = await getUnits();
        const cloudPoolResponse = await getCloudPools();
        setDataCenters(dataCenterResponse.data);
        setUnits(unitResponse.data);
        setCloudPools(cloudPoolResponse.data);
        if (dataCenterResponse.data.length > 0) {
          setDataCenterId(dataCenterResponse.data[0].data_center_id);
        }
        if (unitResponse.data.length > 0) {
          setTotalMemoryUnitId(unitResponse.data[0].unit_id);
          setTotalDiskUnitId(unitResponse.data[0].unit_id);
        }
      } catch (error) {
        console.error(
          "Error fetching data centers, units or cloud pools:",
          error
        );
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
      const cloudPoolData = {
        name,
        total_memory: totalMemory,
        total_memory_unit_id: parsedTotalMemoryUnitId,
        total_cpu: totalCpu,
        total_disk_capacity: totalDiskCapacity,
        total_disk_unit_id: parsedTotalDiskUnitId,
        data_center_id: parsedDataCenterId,
      };

      if (editMode) {
        await updateCloudPool(editCloudPoolId, cloudPoolData);
        setEditMode(false);
        setEditCloudPoolId(null);
      } else {
        await createCloudPool(cloudPoolData);
      }
      setName("");
      setTotalMemory("");
      setTotalMemoryUnitId("");
      setTotalCpu("");
      setTotalDiskCapacity("");
      setTotalDiskUnitId("");
      setDataCenterId("");
      fetchCloudPools();
    } catch (error) {
      console.error("Error creating/updating cloud pool:", error);
    }
  };

  const fetchCloudPools = async () => {
    try {
      const response = await getCloudPools();
      setCloudPools(response.data);
    } catch (error) {
      console.error("Error fetching cloud pools:", error);
    }
  };

  const handleEdit = (cloudPool) => {
    setName(cloudPool.name);
    setTotalMemory(cloudPool.total_memory);
    setTotalMemoryUnitId(cloudPool.total_memory_unit_id);
    setTotalCpu(cloudPool.total_cpu);
    setTotalDiskCapacity(cloudPool.total_disk_capacity);
    setTotalDiskUnitId(cloudPool.total_disk_unit_id);
    setDataCenterId(cloudPool.data_center_id);
    setEditMode(true);
    setEditCloudPoolId(cloudPool.cloud_pool_id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCloudPool(id);
      fetchCloudPools();
    } catch (error) {
      console.error("Error deleting cloud pool:", error);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                {editMode ? "Edit Cloud Pool" : "Create Cloud Pool"}
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="totalMemory" className="mt-3">
                  <Form.Label>Total Memory</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        value={totalMemory}
                        onChange={(e) => setTotalMemory(e.target.value)}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={totalMemoryUnitId}
                        onChange={(e) => setTotalMemoryUnitId(e.target.value)}
                      >
                        {units.map((unit) => (
                          <option key={unit.unit_id} value={unit.unit_id}>
                            {unit.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="totalCpu" className="mt-3">
                  <Form.Label>Total CPU</Form.Label>
                  <Form.Control
                    type="number"
                    value={totalCpu}
                    onChange={(e) => setTotalCpu(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="totalDiskCapacity" className="mt-3">
                  <Form.Label>Total Disk Capacity</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        value={totalDiskCapacity}
                        onChange={(e) => setTotalDiskCapacity(e.target.value)}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={totalDiskUnitId}
                        onChange={(e) => setTotalDiskUnitId(e.target.value)}
                      >
                        {units.map((unit) => (
                          <option key={unit.unit_id} value={unit.unit_id}>
                            {unit.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="dataCenter" className="mt-3">
                  <Form.Label>Data Center</Form.Label>
                  <Form.Control
                    as="select"
                    value={dataCenterId}
                    onChange={(e) => setDataCenterId(e.target.value)}
                    required
                  >
                    {dataCenters.map((dataCenter) => (
                      <option
                        key={dataCenter.data_center_id}
                        value={dataCenter.data_center_id}
                      >
                        {dataCenter.name} ({dataCenter.location})
                      </option>
                    ))}
                  </Form.Control>
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
                      setEditCloudPoolId(null);
                      setName("");
                      setTotalMemory("");
                      setTotalMemoryUnitId("");
                      setTotalCpu("");
                      setTotalDiskCapacity("");
                      setTotalDiskUnitId("");
                      setDataCenterId("");
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
          <h2 className="text-center mb-4">Cloud Pools</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Memory</th>
                <th>Total CPU</th>
                <th>Total Disk Capacity</th>
                <th>Data Center</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cloudPools.map((cloudPool) => (
                <tr key={cloudPool.cloud_pool_id}>
                  <td>{cloudPool.name}</td>
                  <td>
                    {cloudPool.total_memory}{" "}
                    {
                      units.find(
                        (unit) =>
                          unit.unit_id === cloudPool.total_memory_unit_id
                      )?.name
                    }
                  </td>
                  <td>{cloudPool.total_cpu}</td>
                  <td>
                    {cloudPool.total_disk_capacity}{" "}
                    {
                      units.find(
                        (unit) => unit.unit_id === cloudPool.total_disk_unit_id
                      )?.name
                    }
                  </td>
                  <td>
                    {
                      dataCenters.find(
                        (dataCenter) =>
                          dataCenter.data_center_id === cloudPool.data_center_id
                      )?.name
                    }
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(cloudPool)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(cloudPool.cloud_pool_id)}
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

export default CloudPoolForm;
