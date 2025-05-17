import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getCampaignByIdAPI, updateCampaignAPI } from "../../services/allAPI";

const Camedit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    campaignname: "",
    type: "",
    beginDate: "",
    endDate: "",
    status: "",
    description: "",
    image: "", // Will be used only for fetching, not editing
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Fetch campaign data on mount
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await getCampaignByIdAPI(id);
        if (data) {
          setFormData({
            campaignname: data.campaignname || "",
            type: data.type || "",
            beginDate: data.beginDate || "",
            endDate: data.endDate || "",
            status: data.status || "",
            description: data.description || "",
            image: data.image || "", // Keep image but do not allow edits
          });
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.campaignname.trim()) newErrors.campaignname = "Campaign name is required.";
    if (!formData.type.trim()) newErrors.type = "Campaign type is required.";
    if (!formData.beginDate) newErrors.beginDate = "Begin date is required.";
    if (!formData.endDate) {
      newErrors.endDate = "End date is required.";
    } else if (formData.beginDate && formData.endDate < formData.beginDate) {
      newErrors.endDate = "End date cannot be before begin date.";
    }
    if (!formData.status) newErrors.status = "Please select a status.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent updates to the image field
    if (name === "image") return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Before Submission:", formData);

    if (validateForm()) {
      try {
        // Remove image before sending update request
        const { image, ...updatedFormData } = formData;

        console.log("Sending to API:", updatedFormData);
        await updateCampaignAPI(id, updatedFormData);
        console.log("Update successful!");
        navigate(-1);
      } catch (error) {
        console.error("Error updating campaign:", error);
      }
    } else {
      console.log("Form validation failed:", errors);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <Container className="p-4">
      <h2 className="text-center mb-4">Edit Campaign</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="campaignName">
              <Form.Label>Campaign Name</Form.Label>
              <Form.Control
                type="text"
                name="campaignname"
                value={formData.campaignname}
                onChange={handleChange}
                isInvalid={!!errors.campaignname}
              />
              <Form.Control.Feedback type="invalid">{errors.campaignname}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="campaignType">
              <Form.Label>Campaign Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                isInvalid={!!errors.type}
              />
              <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="beginDate">
              <Form.Label>Begin Date</Form.Label>
              <Form.Control
                type="date"
                name="beginDate"
                value={formData.beginDate}
                onChange={handleChange}
                isInvalid={!!errors.beginDate}
              />
              <Form.Control.Feedback type="invalid">{errors.beginDate}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                isInvalid={!!errors.endDate}
              />
              <Form.Control.Feedback type="invalid">{errors.endDate}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="campaignStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
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
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons */}
        <Row className="d-flex justify-content-between mt-3">
          <Col md={4}>
            <Button variant="secondary" onClick={() => navigate(-1)} className="w-100">
              ⬅ Back
            </Button>
          </Col>
          <Col md={4}>
            <Button onClick={handleSubmit} variant="primary" type="submit" className="w-100">
              Save Changes
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Camedit;
