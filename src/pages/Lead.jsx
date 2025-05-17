// Lead.jsx
import React, { useEffect, useState } from 'react'
import { Button, Container, Table, Pagination } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { deleteLeadAPI, getLeadsAPI } from '../services/allAPI'

const Lead = ({ insidemanager }) => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  const navigate = useNavigate()
  const location = useLocation()
  const role = localStorage.getItem('role')

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true)
      setError(null)
      try {
        const allLeads = await getLeadsAPI()
        const userRole = localStorage.getItem('role')
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
        const salespersonName = storedUser.username?.trim().toLowerCase() || ''

        let filteredLeads = []
        if (userRole === 'manager') {
          filteredLeads = allLeads
        } else {
          filteredLeads = allLeads.filter(
            (lead) => lead.assignedTo?.trim().toLowerCase() === salespersonName
          )
        }
        setLeads(filteredLeads)
      } catch (err) {
        setError('Failed to fetch leads. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchLeads()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await deleteLeadAPI(id)
        setLeads((prev) => prev.filter((lead) => lead._id !== id))
        alert('Lead deleted successfully!')
      } catch (error) {
        alert('Failed to delete lead.')
      }
    }
  }

  const handleConvert = (lead) => {
    sessionStorage.setItem(`converted_${lead._id}`, true)
    navigate('/customer-add', {
      state: {
        fromLead: true,
        convertedLeadId: lead._id,
        leadData: lead,
      },
    })
  }

  const totalPages = Math.ceil(leads.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentLeads = leads.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  if (error) {
    return (
      <Container className="p-4">
        <p className="text-danger">{error}</p>
      </Container>
    )
  }

  return (
    <Container className="p-4">
      <Link to={role === 'manager' ? '/manager-dashboard' : '/sale-dashboard'}>
        Go Back
      </Link>

      <h2 className="text-center mb-4 text-primary fw-bold">Leads</h2>

      {insidemanager && (
        <Link to="/lead-add">
          <Button className="btn btn-success mb-3" style={{ width: '200px' }}>
            Add Leads ➕
          </Button>
        </Link>
      )}

      {loading ? (
        <p className="text-center">Loading leads...</p>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="text-center shadow-sm p-3 bg-white rounded">
          <thead className="bg-dark text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Actions</th>
              {role === 'salesperson' && <th>Convert</th>}
            </tr>
          </thead>
          <tbody>
            {currentLeads.length > 0 ? (
              currentLeads.map((lead, index) => {
                const isConverted =
                  location.state?.convertedLeadId === lead._id ||
                  sessionStorage.getItem(`converted_${lead._id}`)

                return (
                  <tr key={lead._id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone}</td>
                    <td>{lead.assignedTo}</td>
                    <td>{lead.status}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Link to={`/lead-view/${lead._id}`}>
                          <Button className="btn btn-info">
                            <i className="fa-regular fa-eye"></i>
                          </Button>
                        </Link>
                        {insidemanager && (
                          <>
                            <Link to={`/lead-edit/${lead._id}`}>
                              <Button className="btn btn-warning">
                                <i className="fa-solid fa-pen-to-square"></i>
                              </Button>
                            </Link>
                            <Button
                              className="btn btn-danger"
                              onClick={() => handleDelete(lead._id)}>
                              <i className="fa-solid fa-trash"></i>
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                    {role === 'salesperson' && (
                      <td className="text-center">
                        {isConverted ? (
                          <Button variant="success" disabled>
                            Converted
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={() => handleConvert(lead)}>
                            Convert to Customer
                          </Button>
                        )}
                      </td>
                    )}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

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

export default Lead
