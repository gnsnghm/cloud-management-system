import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Table,
} from "react-bootstrap";
import {
  getCloudProviders,
  getDataCenters,
  createDataCenter,
  updateDataCenter,
  deleteDataCenter,
} from "../services/api";

const DataCenterForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [providerId, setProviderId] = useState("");
  const [providers, setProviders] = useState([]);
  const [dataCenters, setDataCenters] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getCloudProviders();
        setProviders(response.data);
        if (response.data.length > 0) {
          setProviderId(response.data[0].id); // 初期値として最初のプロバイダを設定
        }
      } catch (error) {
        setError("Error fetching cloud providers");
      }
    };

    fetchProviders();
    fetchDataCenters();
  }, []);

  const fetchDataCenters = async () => {
    try {
      const response = await getDataCenters();
      setDataCenters(response.data);
    } catch (error) {
      setError("Error fetching data centers");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateDataCenter(editId, {
          name,
          location,
          provider_id: providerId,
        });
        setSuccess("Data center updated successfully");
      } else {
        await createDataCenter({ name, location, provider_id: providerId });
        setSuccess("Data center created successfully");
      }
      setName("");
      setLocation("");
      setProviderId(providers.length > 0 ? providers[0].id : "");
      setEditId(null);
      fetchDataCenters();
    } catch (error) {
      setError(
        editId ? "Error updating data center" : "Error creating data center"
      );
    }
  };

  const handleEdit = (dataCenter) => {
    setName(dataCenter.name);
    setLocation(dataCenter.location);
    setProviderId(dataCenter.provider_id);
    setEditId(dataCenter.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDataCenter(id);
      setSuccess("Data center deleted successfully");
      fetchDataCenters();
    } catch (error) {
      setError("Error deleting data center");
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Create/Update Data Center</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
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
                <Form.Group id="location" className="mt-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group id="provider" className="mt-3">
                  <Form.Label>Cloud Provider</Form.Label>
                  <Form.Control
                    as="select"
                    value={providerId}
                    onChange={(e) => setProviderId(e.target.value)}
                    required
                  >
                    {providers.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button className="w-100 mt-4" type="submit">
                  {editId ? "Update Data Center" : "Create Data Center"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <h2 className="text-center mb-4">Data Centers</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Provider</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCenters.map((dataCenter) => (
                    <tr key={dataCenter.id}>
                      <td>{dataCenter.name}</td>
                      <td>{dataCenter.location}</td>
                      <td>
                        {
                          providers.find((p) => p.id === dataCenter.provider_id)
                            ?.name
                        }
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() => handleEdit(dataCenter)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(dataCenter.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DataCenterForm;
