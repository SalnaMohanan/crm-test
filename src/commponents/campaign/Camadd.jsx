import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addCampaignAPI } from "../../services/allAPI";

const Camadd = () => {
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState({
    campaignname: "", // Changed from name to match backend
    type: "",
    beginDate: "",
    endDate: "",
    status: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  const validateForm = (data) => {
    let newErrors = {};

    if (!data.campaignname.trim()) newErrors.campaignname = "Campaign name is required.";
    if (!data.type.trim()) newErrors.type = "Campaign type is required.";
    if (!data.beginDate) newErrors.beginDate = "Begin date is required.";
    if (!data.endDate) newErrors.endDate = "End date is required.";
    if (data.beginDate && data.endDate && new Date(data.endDate) < new Date(data.beginDate)) {
      newErrors.endDate = "End date cannot be before begin date.";
    }
    if (!data.status) newErrors.status = "Please select a status.";
    if (!data.description.trim()) newErrors.description = "Description is required.";

    setErrors(newErrors);
    setFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...campaignData, [name]: value };
    setCampaignData(updatedData);
    validateForm(updatedData);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCampaignData({ ...campaignData, image: file });
    validateForm({ ...campaignData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid) {
        try {
            const formData = new FormData();
            formData.append("campaignname", campaignData.campaignname);
            formData.append("type", campaignData.type);
            formData.append("beginDate", campaignData.beginDate);
            formData.append("endDate", campaignData.endDate);
            formData.append("status", campaignData.status);
            formData.append("description", campaignData.description);
            if (campaignData.image) {
                formData.append("image", campaignData.image);
            }

            console.log("Submitting formData:", [...formData.entries()]); // Debugging log

            const response = await addCampaignAPI(formData);
            console.log("Campaign Added:", response.data);
            alert("Campaign added successfully!");

            setCampaignData({
                campaignname: "",
                type: "",
                beginDate: "",
                endDate: "",
                status: "",
                description: "",
                image: "",
            });

            setErrors({});
            setFormValid(false);
            navigate("/campaign");

        } catch (error) {
            console.error("Error adding campaign:", error.response?.data || error.message);
            alert("Failed to add campaign. Please try again.");
        }
    }
};


  return (
    <Container className="p-4">
      <h2 className="text-center mb-4 text-primary fw-bold"> Create a Campaign</h2>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Campaign Name</Form.Label>
              <Form.Control
                type="text"
                name="campaignname"
                value={campaignData.campaignname}
                onChange={handleChange}
                isInvalid={!!errors.campaignname}
              />
              <Form.Control.Feedback type="invalid">{errors.campaignname}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Campaign Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={campaignData.type}
                onChange={handleChange}
                isInvalid={!!errors.type}
              />
              <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Begin Date</Form.Label>
              <Form.Control
                type="date"
                name="beginDate"
                value={campaignData.beginDate}
                onChange={handleChange}
                isInvalid={!!errors.beginDate}
              />
              <Form.Control.Feedback type="invalid">{errors.beginDate}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={campaignData.endDate}
                onChange={handleChange}
                isInvalid={!!errors.endDate}
              />
              <Form.Control.Feedback type="invalid">{errors.endDate}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={campaignData.status}
                onChange={handleChange}
                isInvalid={!!errors.status}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Planned">Planned</option>
                <option value="Completed">Completed</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Campaign Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={campaignData.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <div className="text-center mt-4">
          <Button variant="primary" type="submit" className="me-2" disabled={!formValid}>
             Add Campaign
          </Button>
          <Button variant="secondary" onClick={() => navigate("/campaign")}>
                      Cancel
                    </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Camadd;
