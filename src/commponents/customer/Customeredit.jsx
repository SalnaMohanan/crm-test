import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Spinner,
} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getCustomerByIdAPI,
  updateCustomerByIdAPI,
} from '../../services/allAPI'

const CustomerEdit = ({ insideadmin = false }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    address: '',
  }

  const [customerData, setCustomerData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        console.log('Customer ID from URL:', id)
        const response = await getCustomerByIdAPI(id)
        console.log('Full API response:', response)

        // Adjust depending on API structure
        const customer = response?.data || response || null

        if (!customer) {
          throw new Error('Customer not found.')
        }

        setCustomerData(customer)
      } catch (err) {
        console.error('Error fetching customer:', err)
        setError('Customer not found.')
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [id])

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    let newErrors = {}

    if (!customerData.name?.trim()) newErrors.name = 'Name is required'
    if (!customerData.email?.trim() || !/\S+@\S+\.\S+/.test(customerData.email))
      newErrors.email = 'Valid email required'
    if (!customerData.phone?.trim() || !/^\d{10}$/.test(customerData.phone))
      newErrors.phone = 'Valid 10-digit phone required'
    if (!customerData.company?.trim()) newErrors.company = 'Company required'
    if (!customerData.industry?.trim()) newErrors.industry = 'Industry required'
    if (!customerData.address?.trim()) newErrors.address = 'Address required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await updateCustomerByIdAPI(id, customerData)
      alert('Customer details updated successfully!')
      navigate(insideadmin ? '/user/customer' : '/customers')
    } catch (err) {
      console.error('Error updating customer:', err)
      setError('Failed to update customer.')
    }
  }

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-danger">{error}</p>
      </Container>
    )
  }

  if (!customerData) return null

  return (
    <Container className="p-4">
      <h2 className="text-center text-warning fw-bold">✏️ Edit Customer</h2>
      <Card className="shadow-lg border-0 rounded-4 p-4">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="customerName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={customerData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="customerEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={customerData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="customerPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={customerData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="customerIndustry">
                <Form.Label>Industry</Form.Label>
                <Form.Control
                  type="text"
                  name="industry"
                  value={customerData.industry}
                  onChange={handleChange}
                  isInvalid={!!errors.industry}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.industry}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="customerCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  value={customerData.company}
                  onChange={handleChange}
                  isInvalid={!!errors.company}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.company}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="customerAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  rows={3}
                  value={customerData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3 d-flex justify-content-center">
            <Col md={4}>
              <Button variant="secondary" className="w-100" type="submit">
                Save Changes
              </Button>
            </Col>
            <Col md={4}>
              <Button
                variant="danger"
                className="w-100"
                type="button"
                onClick={() =>
                  navigate(insideadmin ? '/user/customer' : '/customers')
                }>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  )
}

export default CustomerEdit
