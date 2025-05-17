import React, { useEffect, useState } from 'react'
import { Container, Card, Button, Row, Col, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { getCustomerByIdAPI } from '../../services/allAPI'

const CustomerView = ({ insideadmin }) => {
  const navigate = useNavigate()
  const { id } = useParams() // Get customer ID from URL params
  const [customerData, setCustomerData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getCustomerByIdAPI(id) // ✅ Fix: get data directly
        setCustomerData(data) // ✅ No more .data
      } catch (err) {
        console.error('Error fetching customer:', err)
        setError('Customer not found.')
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [id])

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    )
  }

  if (error || !customerData) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-danger">{error}</p>
      </Container>
    )
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4" style={{ width: '40rem' }}>
        <Card.Body>
          <h2 className="text-center text-primary fw-bold mb-3">
            👤 Customer Details
          </h2>

          <Row className="mb-3">
            <Col xs={4}>
              <strong>Name:</strong>
            </Col>
            <Col xs={8}>{customerData.name}</Col>
          </Row>

          <Row className="mb-3">
            <Col xs={4}>
              <strong>Email:</strong>
            </Col>
            <Col xs={8}>{customerData.email}</Col>
          </Row>

          <Row className="mb-3">
            <Col xs={4}>
              <strong>Phone:</strong>
            </Col>
            <Col xs={8}>{customerData.phone}</Col>
          </Row>

          <Row className="mb-3">
            <Col xs={4}>
              <strong>Source:</strong>
            </Col>
            <Col xs={8}>{customerData.source || 'N/A'}</Col>
          </Row>

          <Row className="mb-3">
            <Col xs={4}>
              <strong>Status:</strong>
            </Col>
            <Col xs={8}>
              <span
                className={`badge ${
                  customerData.status === 'Converted'
                    ? 'bg-success'
                    : 'bg-secondary'
                }`}>
                {customerData.status || 'Unknown'}
              </span>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={4}>
              <strong>Company:</strong>
            </Col>
            <Col xs={8}>{customerData.company || 'N/A'}</Col>
          </Row>

          <Row className="mb-3">
            <Col xs={4}>
              <strong>Industry:</strong>
            </Col>
            <Col xs={8}>{customerData.industry || 'N/A'}</Col>
          </Row>

          <Row className="mb-3">
            <Col xs={4}>
              <strong>Address:</strong>
            </Col>
            <Col xs={8}>{customerData.address || 'N/A'}</Col>
          </Row>

          <Row className="mb-3">
            <Col xs={4}>
              <strong>Notes:</strong>
            </Col>
            <Col xs={8}>{customerData.notes || 'N/A'}</Col>
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="secondary"
              className="w-25"
              onClick={() =>
                navigate(insideadmin ? '/user/customer' : '/customers')
              }>
              Cancel
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default CustomerView
