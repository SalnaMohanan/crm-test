import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import crm1 from "../assets/crm1.svg";
import crm2 from "../assets/crm2.svg";
import crm3 from "../assets/crm3.svg";
import { Card, Col, Container, Row } from 'react-bootstrap';
import './home.css'
import Footer from '../commponents/Footer';
import Header from '../commponents/Header';



const Home = () => {
  return (
  
    <>
    <Header/>
     
        <div className="home-page">
        {/* <h1 className="welcome">Welcome to Smart </h1> */}
        <p className="para">
          The ultimate CRM solution designed to help small businesses manage customers, sales, and growth with ease.
        </p>
        <br />
        <Link to={'./register'}>  <button  className="homebtn">Sign in</button>
        </Link>
    </div>
        

     

      {/* Features Section */}
      <Container className="text-center my-5">
        <h3 className="fw-bold">Why Choose Smart CRM?</h3>
        <Row className="justify-content-center my-4">
          <Col md={4}>
            <Card className="shadow-sm p-3">
              <Card.Img variant="top" src={crm1} height="150px" />
              <Card.Body>
                <Card.Title className="fw-bold">Easy to Use</Card.Title>
                <Card.Text>
                  Our intuitive interface allows anyone to start using the CRM instantly.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm p-3">
              <Card.Img variant="top" src={crm2} height="150px" />
              <Card.Body>
                <Card.Title className="fw-bold">Expert Support</Card.Title>
                <Card.Text>
                  Get professional assistance whenever you need it, with dedicated support.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm p-3">
              <Card.Img variant="top" src={crm3} height="150px" />
              <Card.Body>
                <Card.Title className="fw-bold">Secure & Reliable</Card.Title>
                <Card.Text>
                  Your data is safe with us—built on a strong technology stack.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
<Footer/>
      
    </>
  );
};



export default Home