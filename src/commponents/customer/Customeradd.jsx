import React, { useState } from 'react'
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { addCustomerAPI } from '../../services/allAPI'

const CustomerAdd = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const initialLeadData = location.state?.leadData

  const [customerData, setCustomerData] = useState({
    name: initialLeadData?.name || '',
    email: initialLeadData?.email || '',
    phone: initialLeadData?.phone || '',
    address: initialLeadData?.address || '',
    company: initialLeadData?.company || '',
    industry: '',
    website: '',
    notes: '',
  })

  const [errors, setErrors] = useState({})
  const [showAlert, setShowAlert] = useState(false)

  const validateForm = () => {
    let newErrors = {}

    if (!customerData.name.trim()) newErrors.name = 'Name is required!'
    if (!customerData.email.trim()) newErrors.email = 'Email is required!'
    else if (!/\S+@\S+\.\S+/.test(customerData.email))
      newErrors.email = 'Invalid email format!'

    if (!customerData.phone.trim())
      newErrors.phone = 'Phone number is required!'
    else if (!/^\d{10,15}$/.test(customerData.phone))
      newErrors.phone = 'Phone must be 10-15 digits only!'

    if (!customerData.address.trim()) newErrors.address = 'Address is required!'
    if (!customerData.company.trim()) newErrors.company = 'Company is required!'
    if (!customerData.industry.trim())
      newErrors.industry = 'Industry is required!'
    if (!customerData.website.trim()) newErrors.website = 'Website is required!'
    else if (!/^https?:\/\/.+\..+/.test(customerData.website))
      newErrors.website = 'Enter a valid URL (e.g., https://example.com)'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await addCustomerAPI(customerData)
        if (response.status === 201) {
          setShowAlert(true)
          setTimeout(() => {
            setShowAlert(false)
            alert('Customer added successfully')
            navigate('/user-leads')
          }, 2000)
        } else {
          alert('Failed to add customer. Please try again.')
        }
      } catch (error) {
        console.error('Error:', error)
        alert('Failed to add customer. Please try again.')
      }
    }
  }

  return (
    <Container className="p-4">
      <h2 className="text-center mb-4 text-primary fw-bold">
        Add New Customer
      </h2>

      {location.state?.fromLead && initialLeadData?.name && (
        <Alert variant="info">Converting lead: {initialLeadData.name}</Alert>
      )}

      {showAlert && (
        <Alert variant="success">Customer added successfully!</Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name *</Form.Label>
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

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
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

            <Form.Group className="mb-3">
              <Form.Label>Phone *</Form.Label>
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

            <Form.Group className="mb-3">
              <Form.Label>Company *</Form.Label>
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

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={customerData.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Industry *</Form.Label>
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

            <Form.Group className="mb-3">
              <Form.Label>Website *</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={customerData.website}
                onChange={handleChange}
                isInvalid={!!errors.website}
              />
              <Form.Control.Feedback type="invalid">
                {errors.website}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="notes"
                value={customerData.notes}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center">
          <Button variant="success" type="submit" className="me-2">
            Save Customer
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default CustomerAdd
