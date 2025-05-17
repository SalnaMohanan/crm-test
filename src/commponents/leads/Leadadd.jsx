import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { addLeadAPI, getSalespersonsAPI } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";

const LeadAdd = () => {
  const navigate=useNavigate()
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "",
    assignedTo: "",
    notes: "",
  });
  const [salespersons, setSalespersons] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSalespersons = async () => {
      try {
        const data = await getSalespersonsAPI();
        setSalespersons(data);
      } catch (error) {
        console.error("Error fetching salespersons:", error);
      }
    };
    fetchSalespersons();
  }, []);

  // Validation function
  const validateForm = (data) => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!data.name.trim()) newErrors.name = "Lead Name is required!";
    if (!data.email.trim() || !emailRegex.test(data.email))
      newErrors.email = "Valid Email is required!";
    if (!data.phone.trim() || !phoneRegex.test(data.phone))
      newErrors.phone = "Valid 10-digit Phone Number is required!";
    if (!data.source.trim()) newErrors.source = "Lead Source is required!";
    if (!data.status) newErrors.status = "Status selection is required!";
    if (!data.assignedTo.trim()) newErrors.assignedTo = "Assigned To is required!";
    if (!data.notes.trim()) newErrors.notes = "Notes are required!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change and validate in real-time
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...leadData, [name]: value };
    setLeadData(newData);
    validateForm(newData); // Validate on change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm(leadData)) return

    setLoading(true)
    try {
      await addLeadAPI(leadData)
      alert('Lead added successfully!')
      navigate('/leads')
    } catch (error) {
      console.error('Error adding lead:', error.response?.data || error.message)
      alert('Failed to add lead. Please try again.')
    }
    setLoading(false)
  }

  

  return (
    <Container className="p-4">
      <h2 className="text-center mb-4 text-primary fw-bold">📝 Add New Lead</h2>
      <Form onSubmit={handleSubmit}>
        {/* Name & Email */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Lead Name</Form.Label>
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
            <Form.Group>
              <Form.Label className="fw-bold">Email</Form.Label>
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

        {/* Phone & Source */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Phone Number</Form.Label>
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
            <Form.Group>
              <Form.Label className="fw-bold">Lead Source</Form.Label>
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

        {/* Status & Assigned To */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold">Status</Form.Label>
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
          <Form.Group>
               <Form.Label className="fw-bold">Assigned To</Form.Label>
               <Form.Select name="assignedTo" value={leadData.assignedTo} onChange={handleChange} required>
                 <option value="">Select Salesperson</option>
                 {salespersons.length > 0 ? (
                   salespersons.map((person) => (
                     <option key={person.id} value={person.username}>
                       {person.name} {person.username}
                     </option>
                   ))
                 ) : (
                   <option disabled>No salespersons found</option>
                 )}
               </Form.Select>
             </Form.Group>
          </Col>
        </Row>

        {/* Notes */}
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label className="fw-bold">Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="notes"
                value={leadData.notes}
                onChange={handleChange}
                isInvalid={!!errors.notes}
              />
              <Form.Control.Feedback type="invalid">{errors.notes}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <Button variant="primary" type="submit" disabled={loading || Object.keys(errors).length > 0}>
            {loading ? "Adding Lead..." : "Add Lead"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default LeadAdd;





