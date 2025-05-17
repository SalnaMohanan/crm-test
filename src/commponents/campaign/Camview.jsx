import React, { useEffect, useState } from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { getCampaignByIdAPI } from '../../services/allAPI'

const Camview = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await getCampaignByIdAPI(id)
        if (!data) {
          setError('Campaign not found')
        } else {
          setCampaign(data)
        }
      } catch (error) {
        console.error('Error fetching campaign:', error)
        setError('Failed to fetch campaign data')
      } finally {
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [id])

  if (loading) return <p className="text-center mt-4">Loading...</p>
  if (error) return <p className="text-danger text-center mt-4">{error}</p>

  return (
    <Container className="p-4">
      <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
        {/* {campaign?.image ? (
          <div className="text-center bg-light">
            <img
              src={campaign.image}
              alt="Campaign"
              className="img-fluid rounded-top"
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="text-center py-4 bg-light">No Image Available</div>
        )} */}

        <Card.Body className="p-4">
          <h2 className="text-primary fw-bold text-center">
            {campaign?.campaignname}
          </h2>

          <Row className="mb-3">
            <Col md={6}>
              <p className="fw-semibold">
                <strong className="text-muted">Type:</strong> {campaign?.type}
              </p>
            </Col>
            <Col md={6}>
              <p className="fw-semibold">
                <strong className="text-muted">Status:</strong>{' '}
                <span
                  className={`badge px-3 py-2 fs-6 ${
                    campaign?.status === 'Active'
                      ? 'bg-success'
                      : 'bg-secondary'
                  }`}>
                  {campaign?.status}
                </span>
              </p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <p className="fw-semibold">
                <strong className="text-muted">Begin Date:</strong>{' '}
                {new Date(campaign?.beginDate).toLocaleDateString()}
              </p>
            </Col>
            <Col md={6}>
              <p className="fw-semibold">
                <strong className="text-muted">End Date:</strong>{' '}
                {new Date(campaign?.endDate).toLocaleDateString()}
              </p>
            </Col>
          </Row>

          <p className="fw-semibold">
            <strong className="text-muted">Description:</strong>{' '}
            {campaign?.description}
          </p>

          <div className="text-center mt-4">
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              className="px-4">
              ⬅ Back
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Camview
