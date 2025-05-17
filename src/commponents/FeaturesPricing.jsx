import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const FeaturesPricing = () => {
  return (
    <Container className="my-5">
      
      {/* Features Section */}
      <h2 className="text-center fw-bold mb-4">Powerful CRM Features</h2>
      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <Card className="shadow-sm p-3">
            <Card.Body>
              <Card.Title className="fw-bold">Lead Management</Card.Title>
              <Card.Text>Track and nurture leads efficiently to improve conversions.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm p-3">
            <Card.Body>
              <Card.Title className="fw-bold">Task Automation</Card.Title>
              <Card.Text>Automate repetitive tasks to save time and focus on growth.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm p-3">
            <Card.Body>
              <Card.Title className="fw-bold">Analytics & Reports</Card.Title>
              <Card.Text>Gain insights into customer behavior with detailed reports.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Pricing Section */}
      <h2 className="text-center fw-bold mt-5 mb-4">Choose Your Plan</h2>
      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <Card className="shadow-lg text-center p-4">
            <Card.Body>
              <h4 className="fw-bold">Basic Plan</h4>
              <h3 className="text-primary">$9.99/month</h3>
              <p>✔ Lead Management <br />✔ Basic Reporting <br />✔ Email Support</p>
              <Button variant="primary">Get Started</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="shadow-lg text-center p-4 border border-warning">
            <Card.Body>
              <h4 className="fw-bold">Pro Plan</h4>
              <h3 className="text-warning">$19.99/month</h3>
              <p>✔ All Basic Features <br />✔ Task Automation <br />✔ Priority Support</p>
              <Button variant="warning">Get Started</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="shadow-lg text-center p-4 border border-success">
            <Card.Body>
              <h4 className="fw-bold">Enterprise Plan</h4>
              <h3 className="text-success">$49.99/month</h3>
              <p>✔ All Pro Features <br />✔ Advanced Analytics <br />✔ Dedicated Account Manager</p>
              <Button variant="success">Get Started</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturesPricing;
