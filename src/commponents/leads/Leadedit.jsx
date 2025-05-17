import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getLeadByIdAPI, updateLeadAPI } from "../../services/allAPI";

const LeadEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get lead ID from URL params

  const initialLead = {
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "",
    assignedTo: "",
  };

  const [leadData, setLeadData] = useState(initialLead);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const data = await getLeadByIdAPI(id);
        setLeadData(data);
      } catch (error) {
        console.error("Error fetching lead:", error);
      }
    };
    fetchLead();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData({ ...leadData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!leadData.name.trim()) newErrors.name = "Name is required";
    if (!leadData.email.trim() || !/\S+@\S+\.\S+/.test(leadData.email))
      newErrors.email = "Valid email is required";
    if (!leadData.phone.trim() || !/^\d{10}$/.test(leadData.phone))
      newErrors.phone = "Valid 10-digit phone number required";
    if (!leadData.source.trim()) newErrors.source = "Source is required";
    if (!leadData.status.trim()) newErrors.status = "Status is required";
    if (!leadData.assignedTo.trim()) newErrors.assignedTo = "Assigned To is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const updatedLead = await updateLeadAPI(id, leadData);
      console.log("Lead updated:", updatedLead);
      alert("Lead details updated successfully!");
      navigate("/leads");
    } catch (error) {
      alert("Failed to update lead. Please try again.");
    }
  };

  return (
    <Container className="p-4">
      <h2 className="text-center text-warning fw-bold">✏️ Edit Lead</h2>
      <Card className="shadow-lg border-0 rounded-4 p-4">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="leadName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={leadData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="leadEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={leadData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="leadPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={leadData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="leadSource">
                <Form.Label>Lead Source</Form.Label>
                <Form.Control
                  type="text"
                  name="source"
                  value={leadData.source}
                  onChange={handleChange}
                  isInvalid={!!errors.source}
                />
                <Form.Control.Feedback type="invalid">{errors.source}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="leadStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={leadData.status}
                  onChange={handleChange}
                  isInvalid={!!errors.status}
                >
                  <option value="">Select Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="leadAssignedTo">
                <Form.Label>Assigned To</Form.Label>
                <Form.Control
                  type="text"
                  name="assignedTo"
                  value={leadData.assignedTo}
                  disabled // This makes the field non-editable
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3 d-flex justify-content-center">
            <Col md={4}>
              <Button variant="primary" type="submit" className="w-100">
                Save Changes
              </Button>
            </Col>
            <Col md={4}>
              <Button variant="secondary" className="w-100" onClick={() => navigate("/leads")}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default LeadEdit;