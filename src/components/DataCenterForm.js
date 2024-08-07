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
  createDataCenter,
  getDataCenters,
  updateDataCenter,
  deleteDataCenter,
  getCloudProviders,
} from "../services/api";

import "./style.css";

const DataCenterForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [providerId, setProviderId] = useState("");
  const [dataCenters, setDataCenters] = useState([]);
  const [cloudProviders, setCloudProviders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editDataCenterId, setEditDataCenterId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const dataCenterResponse = await getDataCenters();
      const cloudProviderResponse = await getCloudProviders();
      setDataCenters(dataCenterResponse.data);
      setCloudProviders(cloudProviderResponse.data);

      if (cloudProviderResponse.data.length > 0) {
        setProviderId(cloudProviderResponse.data[0].provider_id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataCenterData = {
        name,
        location,
        provider_id: parseInt(providerId, 10),
      };

      if (editMode) {
        await updateDataCenter(editDataCenterId, dataCenterData);
        setEditMode(false);
        setEditDataCenterId(null);
      } else {
        await createDataCenter(dataCenterData);
      }

      setName("");
      setLocation("");
      setProviderId("");
      fetchData();
    } catch (error) {
      console.error("Error creating/updating data center:", error);
    }
  };

  const handleEdit = (dataCenter) => {
    setName(dataCenter.name);
    setLocation(dataCenter.location);
    setProviderId(dataCenter.provider_id);
    setEditMode(true);
    setEditDataCenterId(dataCenter.data_center_id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDataCenter(id);
      fetchData();
    } catch (error) {
      console.error("Error deleting data center:", error);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                {editMode ? "Edit Data Center" : "Create Data Center"}
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
                    <option value="">Select Cloud Provider</option>
                    {cloudProviders.map((provider) => (
                      <option
                        key={provider.provider_id}
                        value={provider.provider_id}
                      >
                        {provider.name}
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
                      setEditDataCenterId(null);
                      setName("");
                      setLocation("");
                      setProviderId("");
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
          <h2 className="text-center mb-4">Data Centers</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Cloud Provider</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataCenters.map((dataCenter) => (
                <tr key={dataCenter.data_center_id}>
                  <td>{dataCenter.name}</td>
                  <td>{dataCenter.location}</td>
                  <td>
                    {cloudProviders.find(
                      (provider) =>
                        provider.provider_id === dataCenter.provider_id
                    )?.name || "Unknown"}
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
                      onClick={() => handleDelete(dataCenter.data_center_id)}
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

export default DataCenterForm;
