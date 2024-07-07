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
import { createUser, getUsers, deleteUser, updateUser } from "../services/api";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateUser(editUserId, { username, email });
        setEditMode(false);
        setEditUserId(null);
      } else {
        await createUser({ username, email });
      }
      setUsername("");
      setEmail("");
      fetchUsers();
    } catch (error) {
      console.error("Error creating/updating user:", error);
    }
  };

  const handleEdit = (user) => {
    setUsername(user.username);
    setEmail(user.email);
    setEditMode(true);
    setEditUserId(user.user_id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                {editMode ? "Edit User" : "Create User"}
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group id="email" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      setEditUserId(null);
                      setUsername("");
                      setEmail("");
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
          <h2 className="text-center mb-4">Users</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(user)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user.user_id)}
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

export default UserForm;
