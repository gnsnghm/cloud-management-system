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
  createOS,
  getOperatingSystems,
  deleteOS,
  updateOS,
} from "../services/api";

import "./style.css";

const OSForm = () => {
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const [oses, setOses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editOsId, setEditOsId] = useState(null);

  useEffect(() => {
    fetchOses();
  }, []);

  const fetchOses = async () => {
    try {
      const response = await getOperatingSystems();
      setOses(response.data);
    } catch (error) {
      console.error("Error fetching operating systems:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const osData = {
        name,
        version,
      };

      if (editMode) {
        await updateOS(editOsId, osData);
        setEditMode(false);
        setEditOsId(null);
      } else {
        await createOS(osData);
      }
      setName("");
      setVersion("");
      fetchOses();
    } catch (error) {
      console.error("Error creating/updating OS:", error);
    }
  };

  const handleEdit = (os) => {
    setName(os.name);
    setVersion(os.version);
    setEditMode(true);
    setEditOsId(os.os_id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteOS(id);
      fetchOses();
    } catch (error) {
      console.error("Error deleting OS:", error);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                {editMode ? "Edit Operating System" : "Create Operating System"}
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
                <Form.Group id="version" className="mt-3">
                  <Form.Label>Version</Form.Label>
                  <Form.Control
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    required
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
                      setEditOsId(null);
                      setName("");
                      setVersion("");
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
          <h2 className="text-center mb-4">Operating Systems</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Version</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {oses.map((os) => (
                <tr key={os.os_id}>
                  <td>{os.name}</td>
                  <td>{os.version}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(os)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(os.os_id)}
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

export default OSForm;
