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
  createDisk,
  getDisks,
  updateDisk,
  deleteDisk,
  getStorage,
  getUnits,
  getCloudPools, // 追加
  getDataCenters, // 追加
} from "../services/api";

const DiskForm = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [unitId, setUnitId] = useState("");
  const [storageId, setStorageId] = useState("");
  const [disks, setDisks] = useState([]);
  const [storages, setStorages] = useState([]);
  const [units, setUnits] = useState([]);
  const [cloudPools, setCloudPools] = useState([]); // 追加
  const [dataCenters, setDataCenters] = useState([]); // 追加
  const [editMode, setEditMode] = useState(false);
  const [editDiskId, setEditDiskId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const diskResponse = await getDisks();
      const storageResponse = await getStorage();
      const unitResponse = await getUnits();
      const cloudPoolResponse = await getCloudPools(); // 追加
      const dataCenterResponse = await getDataCenters(); // 追加

      setDisks(diskResponse.data);
      setStorages(storageResponse.data);
      setUnits(unitResponse.data);
      setCloudPools(cloudPoolResponse.data); // 追加
      setDataCenters(dataCenterResponse.data); // 追加

      if (storageResponse.data.length > 0) {
        setStorageId(storageResponse.data[0].storage_device_id);
      }
      if (unitResponse.data.length > 0) {
        setUnitId(unitResponse.data[0].unit_id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const diskData = {
        name,
        size: parseFloat(size),
        unit_id: parseInt(unitId, 10),
        storage_id: parseInt(storageId, 10),
      };

      if (editMode) {
        await updateDisk(editDiskId, diskData);
        setEditMode(false);
        setEditDiskId(null);
      } else {
        await createDisk(diskData);
      }

      setName("");
      setSize("");
      setUnitId("");
      setStorageId("");
      fetchData();
    } catch (error) {
      console.error("Error creating/updating disk:", error);
    }
  };

  const handleEdit = (disk) => {
    setName(disk.disk_name);
    setSize(disk.size);
    setUnitId(disk.unit_id);
    setStorageId(disk.storage_device_id);
    setEditMode(true);
    setEditDiskId(disk.disk_id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDisk(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting disk:", error);
    }
  };

  const getStorageDisplayName = (storage) => {
    const cloudPool = cloudPools.find(
      (pool) => pool.cloud_pool_id === storage.cloud_pool_id
    );
    const dataCenter = dataCenters.find(
      (dc) => dc.data_center_id === cloudPool?.data_center_id
    );
    return `${storage.name}-${cloudPool?.name || "不明"}(${
      dataCenter?.name || "不明"
    })`;
  };

  const getDiskDisplayName = (disk) => {
    const storage = storages.find(
      (s) => s.storage_device_id === disk.storage_device_id
    );
    const cloudPool = cloudPools.find(
      (pool) => pool.cloud_pool_id === storage?.cloud_pool_id
    );
    const dataCenter = dataCenters.find(
      (dc) => dc.data_center_id === cloudPool?.data_center_id
    );
    return `${disk.disk_name}-${cloudPool?.name || "不明"}(${
      dataCenter?.name || "不明"
    })`;
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                {editMode ? "Edit Disk" : "Create Disk"}
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
                <Form.Group id="size" className="mt-3">
                  <Form.Label>Size</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={unitId}
                        onChange={(e) => setUnitId(e.target.value)}
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
                <Form.Group id="storage" className="mt-3">
                  <Form.Label>Storage</Form.Label>
                  <Form.Control
                    as="select"
                    value={storageId}
                    onChange={(e) => setStorageId(e.target.value)}
                    required
                  >
                    <option value="">Select Storage</option>
                    {storages.map((storage) => (
                      <option
                        key={storage.storage_device_id}
                        value={storage.storage_device_id}
                      >
                        {getStorageDisplayName(storage)}
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
                      setEditDiskId(null);
                      setName("");
                      setSize("");
                      setUnitId("");
                      setStorageId("");
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
          <h2 className="text-center mb-4">Disks</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Storage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {disks.map((disk) => (
                <tr key={disk.disk_id}>
                  <td>{disk.disk_name}</td>
                  <td>
                    {disk.size}{" "}
                    {units.find((unit) => unit.unit_id === disk.unit_id)?.name}
                  </td>
                  <td>{getDiskDisplayName(disk)}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(disk)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(disk.disk_id)}
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

export default DiskForm;
