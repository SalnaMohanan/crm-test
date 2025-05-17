import React, { useEffect, useState } from 'react'
import { Container, Table, Button, Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getFollowupAPI } from '../services/allAPI'

const Followup = ({ insidemanager }) => {
  const [followup, setFollowup] = useState([]) // State to store follow-up data
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState(null) // Error state
  const [currentPage, setCurrentPage] = useState(1) // State to manage current page
  const [itemsPerPage] = useState(5) // Number of items per page

  const role = localStorage.getItem('role')

  useEffect(() => {
    const fetchFollowups = async () => {
      try {
        const response = await getFollowupAPI()

        // Assuming the response is directly an array, so no need to access .data
        if (Array.isArray(response)) {
          setFollowup(response) // Set the response data directly
        } else {
          console.error('Unexpected response format', response)
          setError('Unexpected response format')
        }
      } catch (err) {
        console.error('Error fetching follow-up data:', err) // Log the error
        setError('Error fetching data')
      } finally {
        setLoading(false)
      }
    }


    fetchFollowups()
  }, []) // Empty dependency array to run once when the component mounts

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  // Pagination Logic
  const totalPages = Math.ceil(followup.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = followup.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <Container className="p-4">
      <Link to={role === 'manager' ? '/manager-dashboard' : '/sale-dashboard'}>
        Go Back
      </Link>

      <h1 className="text-center mb-4 text-primary fw-bold">Follow-Up</h1>

      {/* Show "Add New Follow-up" button only if user is a salesperson */}
      {!insidemanager && (
        <div className="text-end">
          <Link to="/followup-add">
            <Button className="btn btn-success mb-3" style={{ width: '200px' }}>
              Add New Follow-up ➕
            </Button>
          </Link>
        </div>
      )}

      {/* Show Follow-up Table only if `insidemanager` is true */}
      {insidemanager && (
        <Table
          striped
          bordered
          hover
          responsive
          className="text-center shadow-sm bg-white rounded">
          <thead className="bg-dark text-white">
            <tr>
              <th>#</th>
              <th>Contact Name</th>
              <th>Submitted By</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((followup, index) => (
              <tr key={followup.id}>
                {' '}
                {/* Use 'id' as the key */}
                <td>{indexOfFirstItem + index + 1}</td>
                <td>
                  <Link
                    to={`/followup-view/${followup._id}`}
                    className="text-primary fw-bold text-decoration-none">
                    {followup.name}
                  </Link>
                </td>
                <td>{followup.submittedby}</td>
                <td>{followup.date}</td>
                <td>
                  <span
                    className={`badge ${
                      followup.status === 'Pending'
                        ? 'bg-warning'
                        : 'bg-success'
                    }`}>
                    {followup.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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

export default Followup
