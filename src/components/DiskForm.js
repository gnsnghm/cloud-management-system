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
} from "../services/api";

const DiskForm = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [unitId, setUnitId] = useState("");
  const [storageId, setStorageId] = useState("");
  const [disks, setDisks] = useState([]);
  const [storages, setStorages] = useState([]);
  const [units, setUnits] = useState([]);
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
      setDisks(diskResponse.data);
      setStorages(storageResponse.data);
      setUnits(unitResponse.data);

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

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                {editMode ? "ディスクを編集" : "ディスクを作成"}
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>名前</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group id="size" className="mt-3">
                  <Form.Label>サイズ</Form.Label>
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
                        <option value="">単位を選択</option>
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
                  <Form.Label>ストレージ</Form.Label>
                  <Form.Control
                    as="select"
                    value={storageId}
                    onChange={(e) => setStorageId(e.target.value)}
                    required
                  >
                    <option value="">ストレージを選択</option>
                    {storages.map((storage) => (
                      <option
                        key={storage.storage_device_id}
                        value={storage.storage_device_id}
                      >
                        {storage.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button className="w-100 mt-4" type="submit">
                  {editMode ? "更新" : "作成"}
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
                    キャンセル
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2 className="text-center mb-4">ディスク一覧</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>名前</th>
                <th>サイズ</th>
                <th>ストレージ</th>
                <th>アクション</th>
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
                  <td>
                    {
                      storages.find(
                        (storage) =>
                          storage.storage_device_id === disk.storage_device_id
                      )?.name
                    }
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(disk)}
                      className="me-2"
                    >
                      編集
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(disk.disk_id)}
                    >
                      削除
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
