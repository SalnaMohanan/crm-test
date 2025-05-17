import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getLeadByIdAPI } from "../../services/allAPI"; // Import API function

const LeadView = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get lead ID from URL
  const [leadData, setLeadData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchLead = async () => {
        try {
          const data = await getLeadByIdAPI(id);
          if (!data) {
            setError("lead not found");
          } else {
            setLeadData(data);
          }
        } catch (error) {
          console.error("Error fetching lead:", error);
          setError("Failed to fetch lead data");
        } finally {
          setLoading(false);
        }
      };
  
      fetchLead();
    }, [id]);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4" style={{ width: "40rem" }}>
        <Card.Body>
          <h2 className="text-center text-primary fw-bold mb-3">👤 Lead Details</h2>

          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <>
              <Row className="mb-3">
                <Col xs={4}>
                  <strong>Name:</strong>
                </Col>
                <Col xs={8}>{leadData.name}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={4}>
                  <strong>Email:</strong>
                </Col>
                <Col xs={8}>{leadData.email}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={4}>
                  <strong>Phone:</strong>
                </Col>
                <Col xs={8}>{leadData.phone}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={4}>
                  <strong>Source:</strong>
                </Col>
                <Col xs={8}>{leadData.source}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={4}>
                  <strong>Status:</strong>
                </Col>
                <Col xs={8}>
                  <span
                    className={`badge ${
                      leadData.status === "New"
                        ? "bg-warning"
                        : leadData.status === "Contacted"
                        ? "bg-info"
                        : "bg-success"
                    }`}
                  >
                    {leadData.status}
                  </span>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={4}>
                  <strong>Assigned To:</strong>
                </Col>
                <Col xs={8}>{leadData.assignedTo || "Unassigned"}</Col>
              </Row>

              {/* <Row className="mb-3">
                <Col xs={4}>
                  <strong>Created On:</strong>
                </Col>
                <Col xs={8}>{new Date(leadData.createdAt).toLocaleDateString()}</Col>
              </Row> */}

              {/* Back Button */}
              {/* <div className="text-center mt-3">
                <Button variant="secondary" onClick={() => navigate(-1)}>
                  Back to Leads
                </Button>
              </div> */}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LeadView;
