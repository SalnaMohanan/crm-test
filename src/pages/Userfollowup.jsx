import React, { useState } from "react";
import { Container, Button, Card, Row, Col, Modal } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa"; // Adding an icon for better UI
import { Link } from "react-router-dom";

const UserFollowupPage = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const role = localStorage.getItem('role')


  return (
    <Container className="p-4">
            <Link to={role === "manager" ? "/manager-dashboard" : "/sale-dashboard"}>Go Back</Link>
      
      <Row className="text-center mb-4">
        <Col>
          <h1 className="text-primary fw-bold">User Follow-up</h1>
          <p className="text-muted">Track and manage follow-ups with ease</p>
        </Col>
      </Row>

      {/* Center the Card and Button */}
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={12} sm={8} md={6}>
          <Card className="shadow-lg p-4">
            <Card.Body className="text-center">
              <p className="mb-4">Click the button below to add a new follow-up</p>

              {/* Add Follow-up Button inside the Card */}
              <Button
                variant="success"
                className="w-50 me-5"
                size="lg"
                style={{
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }} 
                onClick={handleShow} // Open modal on button click
              >
                <FaPlusCircle className="me-2" />
                Add New Follow-up
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Adding New Follow-up */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaPlusCircle className="me-2" />
            Add New Follow-up
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Modal content can be placed here */}
          <p>Click the button below to proceed with adding a new follow-up.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to="/followup-add">
            <Button variant="success" onClick={handleClose}>
              Proceed to Add
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserFollowupPage;
