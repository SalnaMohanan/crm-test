import React, { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Table,
  Pagination,
  Spinner,
  Alert,
  Modal,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deleteCampaignAPI, fetchCampaignsAPI } from '../services/allAPI'

const Campaign = ({ insidemanager }) => {
  // Stores the list of campaigns fetched from the backend.
  const [campaigns, setCampaigns] = useState([])

  const [currentPage, setCurrentPage] = useState(1) // Pagination state
  const [itemsPerPage] = useState(5) // Items per page

  const [isLoading, setIsLoading] = useState(false) // Loading state
  const [error, setError] = useState(null) // Error state
  const [showDeleteModal, setShowDeleteModal] = useState(false) // Delete modal state
  const [campaignToDelete, setCampaignToDelete] = useState(null) // Campaign to delete

  // Fetches the role of the logged-in user from localStorage (to manage routing/permissions).
  const role = localStorage.getItem('role')

  useEffect(() => {
    const loadCampaigns = async () => {
      setIsLoading(true)
      setError(null)

      // Log the token to the console to see if it's being retrieved properly
      const token = localStorage.getItem('token')
      console.log('Auth Token:', token) // To debug token availability

      if (!token) {
        console.log('No token found. Please login again.')
      }

      try {
        const data = await fetchCampaignsAPI()
        setCampaigns(data)
      } catch (error) {
        setError('Failed to load campaigns.')
        console.error('Error loading campaigns:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadCampaigns()
  }, [])

  const handleDelete = async () => {
    try {
      await deleteCampaignAPI(campaignToDelete)
      setCampaigns((prev) =>
        prev.filter((campaign) => campaign._id !== campaignToDelete)
      )
      alert('Campaign deleted successfully!')
    } catch (error) {
      console.error('Error deleting campaign:', error)
      alert('Failed to delete campaign.')
    }
    setShowDeleteModal(false)
  }

  // Pagination logic
  const totalPages = Math.ceil(campaigns.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCampaigns = campaigns.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <Container className="p-4">
      <Link to={role === 'manager' ? '/manager-dashboard' : '/sale-dashboard'}>
        Go Back
      </Link>
      <h2 className="text-center mb-4 text-primary fw-bold">Campaigns</h2>

      {/* Add New Campaign Button (Only for Managers) */}
      {insidemanager && (
        <Link to="/campaign-add">
          <Button className="btn btn-success mb-3" style={{ width: '200px' }}>
            Add New Campaign ➕
          </Button>
        </Link>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="d-flex justify-content-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Error Message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Campaign Table */}
      {!isLoading && !error && (
        <Table
          striped
          bordered
          hover
          responsive
          className="text-center shadow-sm bg-white rounded">
          <thead className="bg-dark text-white">
            <tr>
              <th>#</th>
              <th>Campaign Name</th>
              <th>Campaign Type</th>
              <th>Begin Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCampaigns.length > 0 ? (
              currentCampaigns.map((campaign, index) => (
                <tr key={campaign._id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{campaign.campaignname}</td>
                  <td>{campaign.type}</td>
                  <td>{new Date(campaign.beginDate).toLocaleDateString()}</td>
                  <td>{new Date(campaign.endDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        campaign.status === 'Active'
                          ? 'bg-success'
                          : 'bg-secondary'
                      }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                      }}>
                      {/* View Button */}
                      <Link to={`/campaign-view/${campaign._id}`}>
                        <Button className="btn btn-info">
                          <i className="fa-regular fa-eye"></i>
                        </Button>
                      </Link>

                      {/* Edit & Delete (Only for Managers) */}
                      {insidemanager && (
                        <>
                          <Link to={`/campaign-edit/${campaign._id}`}>
                            <Button className="btn btn-warning">
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Button>
                          </Link>
                          <Button
                            className="btn btn-danger"
                            onClick={() => {
                              setCampaignToDelete(campaign._id)
                              setShowDeleteModal(true)
                            }}>
                            <i className="fa-solid fa-trash"></i>
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No campaigns found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Pagination Controls */}
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
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
          disabled={currentPage === totalPages}
        />
      </Pagination>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this campaign?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Campaign
