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
import { createUnit, getUnits, deleteUnit, updateUnit } from "../services/api";

const UnitForm = () => {
  const [name, setName] = useState("");
  const [multiplier, setMultiplier] = useState("");
  const [units, setUnits] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editUnitId, setEditUnitId] = useState(null);

  useEffect(() => {
    fetchUnits();
  }, []);

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
    try {
      const unitData = {
        name,
        multiplier,
      };

      if (editMode) {
        await updateUnit(editUnitId, unitData);
        setEditMode(false);
        setEditUnitId(null);
      } else {
        await createUnit(unitData);
      }
      setName("");
      setMultiplier("");
      fetchUnits();
    } catch (error) {
      console.error("Error creating/updating unit:", error);
    }
  };

  const handleEdit = (unit) => {
    setName(unit.name);
    setMultiplier(unit.multiplier);
    setEditMode(true);
    setEditUnitId(unit.unit_id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUnit(id);
      fetchUnits();
    } catch (error) {
      console.error("Error deleting unit:", error);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                {editMode ? "Edit Unit" : "Create Unit"}
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
                <Form.Group id="multiplier" className="mt-3">
                  <Form.Label>Multiplier</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={multiplier}
                    onChange={(e) => setMultiplier(e.target.value)}
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
                      setEditUnitId(null);
                      setName("");
                      setMultiplier("");
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
          <h2 className="text-center mb-4">Units</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Multiplier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit.unit_id}>
                  <td>{unit.name}</td>
                  <td>{unit.multiplier}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(unit)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(unit.unit_id)}
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

export default UnitForm;
