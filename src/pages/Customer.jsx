import React, { useState, useEffect } from 'react'
import { Container, Table, Button, Pagination } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCustomerAPI, getCustomersAPI } from '../services/allAPI'

const Customer = () => {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [currentPage, setCurrentPage] = useState(1) // Pagination state
  const [itemsPerPage] = useState(5) // Items per page

  const role = sessionStorage.getItem('role')

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomersAPI()
        setCustomers(response?.data || [])
      } catch (err) {
        console.error('Error fetching customers:', err)
        setError('Failed to fetch customers.')
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  // Handle customer deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomerAPI(id)
        setCustomers((prev) => prev.filter((customer) => customer._id !== id))
        alert('Customer deleted successfully!')
      } catch (error) {
        alert('Failed to delete customer.')
      }
    }
  }

  // Pagination Logic
  const totalPages = Math.ceil(customers.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <Container className="p-4">
      <Link to={role === 'manager' ? '/manager-dashboard' : '/sale-dashboard'}>
        Go Back
      </Link>

      <h2 className="text-center mb-4 text-primary fw-bold">
        Customer Management
      </h2>

      {loading ? (
        <p className="text-center">Loading customers...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : customers.length > 0 ? (
        <Table
          striped
          bordered
          hover
          responsive
          className="shadow-sm text-center">
          <thead className="bg-dark text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr key={customer._id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      variant="info"
                      onClick={() =>
                        navigate(`/customer-view/${customer._id}`)
                      }>
                      <i className="fa-solid fa-eye"></i>
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() =>
                        navigate(`/customer-edit/${customer._id}`)
                      }>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleDelete(customer._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center mt-4">No customers found.</p>
      )}

      {/* Pagination Controls */}
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
        />
      </Pagination>
    </Container>
  )
}

export default Customer
