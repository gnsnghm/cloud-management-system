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
  createStorage,
  getStorage,
  updateStorage,
  deleteStorage,
  getCloudPools,
  getUnits,
} from "../services/api";

const StorageForm = () => {
  const [name, setName] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");
  const [totalCapacityUnitId, setTotalCapacityUnitId] = useState("");
  const [cloudPoolId, setCloudPoolId] = useState("");
  const [storages, setStorages] = useState([]);
  const [cloudPools, setCloudPools] = useState([]);
  const [units, setUnits] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editStorageId, setEditStorageId] = useState(null);

  useEffect(() => {
    fetchStorages();
    fetchCloudPools();
    fetchUnits();
  }, []);

  const fetchStorages = async () => {
    try {
      const response = await getStorage();
      setStorages(response.data);
    } catch (error) {
      console.error("Error fetching storages:", error);
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

  const fetchUnits = async () => {
    try {
      const response = await getUnits();
      setUnits(response.data);
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storageData = {
      name,
      total_capacity: totalCapacity,
      total_capacity_unit_id: totalCapacityUnitId,
      cloud_pool_id: cloudPoolId,
    };

    try {
      if (editMode) {
        await updateStorage(editStorageId, storageData);
        setEditMode(false);
        setEditStorageId(null);
      } else {
        await createStorage(storageData);
      }
      setName("");
      setTotalCapacity("");
      setTotalCapacityUnitId("");
      setCloudPoolId("");
      fetchStorages();
    } catch (error) {
      console.error("Error creating/updating storage:", error);
    }
  };

  const handleEdit = (storage) => {
    setName(storage.name);
    setTotalCapacity(storage.total_capacity);
    setTotalCapacityUnitId(storage.total_capacity_unit_id);
    setCloudPoolId(storage.cloud_pool_id);
    setEditMode(true);
    setEditStorageId(storage.storage_id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteStorage(id);
      fetchStorages();
    } catch (error) {
      console.error("Error deleting storage:", error);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                {editMode ? "Edit Storage" : "Create Storage"}
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
                <Form.Group id="totalCapacity" className="mt-3">
                  <Form.Label>Total Capacity</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        value={totalCapacity}
                        onChange={(e) => setTotalCapacity(e.target.value)}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={totalCapacityUnitId}
                        onChange={(e) => setTotalCapacityUnitId(e.target.value)}
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
                    {cloudPools.map((pool) => (
                      <option
                        key={pool.cloud_pool_id}
                        value={pool.cloud_pool_id}
                      >
                        {pool.name}
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
                      setEditStorageId(null);
                      setName("");
                      setTotalCapacity("");
                      setTotalCapacityUnitId("");
                      setCloudPoolId("");
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
          <h2 className="text-center mb-4">Storages</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Capacity</th>
                <th>Cloud Pool</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {storages.map((storage) => (
                <tr key={storage.storage_id}>
                  <td>{storage.name}</td>
                  <td>
                    {storage.total_capacity}{" "}
                    {units.find(
                      (unit) => unit.unit_id === storage.total_capacity_unit_id
                    )?.name || ""}
                  </td>
                  <td>
                    {cloudPools.find(
                      (pool) => pool.cloud_pool_id === storage.cloud_pool_id
                    )?.name || "Unknown"}
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(storage)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(storage.storage_id)}
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

export default StorageForm;
