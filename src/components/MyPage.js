import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="text-center">
            <img
              src="/images/logo_yoko.png"
              height="150"
              alt="Cloud Management Logo"
            />
          </h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Cloud Providers</Card.Title>
              <Card.Text>Manage your cloud providers here.</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleNavigation("/cloud-providers")}
              >
                Manage Cloud Providers
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Data Centers</Card.Title>
              <Card.Text>Manage your data centers here.</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleNavigation("/data-centers")}
              >
                Manage Data Centers
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Cloud Pools</Card.Title>
              <Card.Text>Manage your cloud pools here.</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleNavigation("/cloud-pools")}
              >
                Manage Cloud Pools
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Virtual Machines</Card.Title>
              <Card.Text>Manage your virtual machines here.</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleNavigation("/virtual-machines")}
              >
                Manage Virtual Machines
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>Manage users here.</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleNavigation("/users")}
              >
                Manage Users
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Units</Card.Title>
              <Card.Text>Manage units here.</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleNavigation("/units")}
              >
                Manage Units
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Storage Devices</Card.Title>
              <Card.Text>Manage storage devices here.</Card.Text>
              <Button
                variant="primary"
                onClick={() => handleNavigation("/storages")}
              >
                Manage Storage Devices
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Operating Systems</Card.Title>
              <Card.Text>Manage operating systems here.</Card.Text>
              <Button variant="primary" onClick={() => handleNavigation("/os")}>
                Manage Operating Systems
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPage;
