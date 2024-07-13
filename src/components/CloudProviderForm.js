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
  createCloudProvider,
  getCloudProviders,
  deleteCloudProvider,
  updateCloudProvider,
} from "../services/api";

import "./style.css";

const CloudProviderForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [providers, setProviders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProviderId, setEditProviderId] = useState(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await getCloudProviders();
      setProviders(response.data);
    } catch (error) {
      console.error("Error fetching cloud providers:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateCloudProvider(editProviderId, { name, description });
        setEditMode(false);
        setEditProviderId(null);
      } else {
        await createCloudProvider({ name, description });
      }
      setName("");
      setDescription("");
      fetchProviders();
    } catch (error) {
      console.error("Error creating/updating cloud provider:", error);
    }
  };

  const handleEdit = (provider) => {
    setName(provider.name);
    setDescription(provider.description);
    setEditMode(true);
    setEditProviderId(provider.provider_id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCloudProvider(id);
      fetchProviders();
    } catch (error) {
      console.error("Error deleting cloud provider:", error);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                {editMode ? "Edit Cloud Provider" : "Create Cloud Provider"}
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
                <Form.Group id="description" className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                      setEditProviderId(null);
                      setName("");
                      setDescription("");
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
          <h2 className="text-center mb-4">Cloud Providers</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider) => (
                <tr key={provider.provider_id}>
                  <td>{provider.name}</td>
                  <td>{provider.description}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(provider)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(provider.provider_id)}
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

export default CloudProviderForm;
