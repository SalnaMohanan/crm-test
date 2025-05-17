import React from "react";
import SideBar from "../commponents/Sidebar";
import Header from "../commponents/Header";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const SalespersonDashboard = () => {
  // Fetch user details from sessionStorage
  const user = JSON.parse(localStorage.getItem('user')) || {}
  const role = localStorage.getItem('role') || 'Salesperson' // Default role if not found

  return (
    <>
      <Header insideDashboard={true}/>
      <Container fluid>
        <Row className="min-vh-100">
          {/* Sidebar (Fixed Full Height) */}
          <Col md={2} className="bg-primary p-0 min-vh-100 d-flex">
            <SideBar />
          </Col>

          {/* Main Content */}
          <Col md={10} className="p-4 d-flex flex-column">
            <Card className="p-4 shadow-lg flex-grow-1">
              <Card.Body>
                <Card.Title>
                <h2>
                    Welcome, <span className="text-primary fw-bold"> 
                      {user.username || "Salesperson"} ({role})
                    </span>
                  </h2>
                </Card.Title>

                {/* Dashboard Stats Cards */}
                <Row className="mt-5 g-4">
                  {[
                    { title: "Campaign", path: "/user-campaign" },
                    { title: "Lead", path: "/user-leads" },
                    { title: "Followup", path: "/follow-user" },
                    // { title: "Customer", path: "/customer" },
                  ].map((item, index) => (
                    <Col md={3} key={index}>
                      <Card className="p-3 shadow-sm border-0">
                        <Card.Body className="text-center">
                          <Card.Title className="fw-bold">{item.title}</Card.Title>
                          <Card.Text>
                           
                            <br />
                            <Link to={item.path} className="text-primary fw-bold fs-5">
                              <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SalespersonDashboard;
