import React, { useEffect, useState } from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { getFollowupByIdAPI } from '../../services/allAPI'

const Followview = ({ insideadmin }) => {
  const { id } = useParams() // Get the follow-up ID from the URL
  const [followUpData, setFollowUpData] = useState(null) // State for follow-up data
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState(null) // Error state
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFollowup = async () => {
      try {
        const response = await getFollowupByIdAPI(id) // Fetch follow-up data by ID
        if (response && response._id) {
          // Checking if the response contains the follow-up ID
          setFollowUpData(response) // Update state with response data
        } else {
          setError('Follow-up not found')
        }
      } catch (err) {
        setError('Error fetching follow-up data')
      } finally {
        setLoading(false)
      }
    }

    fetchFollowup()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4" style={{ width: '40rem' }}>
        <Card.Body>
          <h2 className="text-center text-primary fw-bold mb-3">
            👤 Follow-up Details
          </h2>

          <Row className="mb-3">
            <Col xs={4}>
              <strong>Name:</strong>
            </Col>
            <Col xs={8}>{followUpData.name}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4}>
              <strong>Email:</strong>
            </Col>
            <Col xs={8}>{followUpData.email}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4}>
              <strong>Phone:</strong>
            </Col>
            <Col xs={8}>{followUpData.phone}</Col>
          </Row>

          <Row className="mb-3">
            <Col xs={4}>
              <strong>Status:</strong>
            </Col>
            <Col xs={8}>
              <span
                className={`badge ${
                  followUpData.status === 'Pending'
                    ? 'bg-warning'
                    : 'bg-success'
                }`}>
                {followUpData.status}
              </span>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4}>
              <strong>Submitted By:</strong>
            </Col>
            <Col xs={8}>{followUpData.submittedby}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4}>
              <strong>Notes:</strong>
            </Col>
            <Col xs={8}>{followUpData.notes}</Col>
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="secondary"
              className="w-25"
              onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Followview
