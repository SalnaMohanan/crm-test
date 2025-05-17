import SERVER_URL from './serverURL.js'
import commonAPI from './commonAPI'
import axios from 'axios'

// Utility to get JWT token from localStorage
const getToken = () => {
  return localStorage.getItem('authToken')
}

// Register API
export const registerAPI = async (reqBody) => {
  return await commonAPI('POST', `${SERVER_URL}/register`, reqBody)
}

// Login API - Store JWT token after successful login
export const loginAPI = async (reqBody) => {
  try {
    const response = await commonAPI('POST', `${SERVER_URL}/login`, reqBody);

    if (response?.data?.token) {
      localStorage.setItem('authToken', response.data.token); // Store token
    }

    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};


// API to add a new campaign (Protected)
export const addCampaignAPI = async (formData) => {
  const token = localStorage.getItem('token') // ✅ Fixed here

  if (!token) {
    throw new Error('No token found. Please login again.')
  }

  return await axios.post(`${SERVER_URL}/add-campaign`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  })
}


// Fetch all campaigns (Protected)
// Assuming fetchCampaignsAPI is defined somewhere like this
export const fetchCampaignsAPI = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found. Please login again.')
    }

    console.log('Token:', token) // Log the token to ensure it's being retrieved

    const response = await fetch(`${SERVER_URL}/campaigns`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Add token to headers
      },
    })

    console.log('Response Status:', response.status) // Log the status for better debugging

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching campaigns:', error.message)
    return []
  }
}


// Delete campaign (Protected)


export const deleteCampaignAPI = async (id) => {
  try {
    const token = getToken()

    const response = await commonAPI(
      'DELETE',
      `${SERVER_URL}/campaigns/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    return response?.data || { message: 'No data received.' }
  } catch (error) {
    console.error('Error deleting campaign:', error)

    // Improve error clarity
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Unknown error occurred'

    throw new Error(errorMessage)
  }
}



// Fetch campaign by ID (Protected)
export const getCampaignByIdAPI = async (id) => {
  try {
    const token = getToken()
    console.log('Token in API call:', token) // Debugging the token
    if (!token) {
      throw new Error('Authorization token not found.')
    }

    const response = await axios.get(`${SERVER_URL}/campaigns/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || error.message || 'Unknown error'
    console.error('Error fetching campaign by ID:', errorMsg)
    throw new Error(errorMsg)
  }
}





// Edit campaign (Protected)
export const updateCampaignAPI = async (id, updatedData) => {
  const token = getToken()
  await fetch(`${SERVER_URL}/campaigns/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Attach JWT token in header
    },
    body: JSON.stringify(updatedData),
  })
}

// Add lead (Protected)
export const addLeadAPI = async (reqBody) => {
  const token = getToken()
  console.log('Using token:', token) // Debug: check what token is being used

  return await axios.post(`${SERVER_URL}/add-lead`, reqBody, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

// Get all leads (Protected)
export const getLeadsAPI = async () => {
  try {
    const token = getToken()
    const response = await axios.get(`${SERVER_URL}/all-leads`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach JWT token in header
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching leads:', error)
    throw error
  }
}

// Fetch salespersons (Protected)
export const getSalespersonsAPI = async () => {
  try {
    const token = getToken()
    const response = await axios.get(`${SERVER_URL}/salespersons`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach JWT token in header
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching salespersons:', error)
    throw error
  }
}

// Get lead by ID (Protected)
export const getLeadByIdAPI = async (id) => {
  try {
    const token = getToken()
    const response = await axios.get(`${SERVER_URL}/lead-view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach JWT token in header
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching lead:', error)
    throw error
  }
}

// Delete lead (Protected)

export const deleteLeadAPI = async (id) => {
  try {
    const token = getToken()

    const response = await commonAPI(
      'DELETE',
      `${SERVER_URL}/leads/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    return response?.data || { message: 'No data received.' }
  } catch (error) {
    console.error('Error deleting lead:', error)

    // Improve error clarity
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Unknown error occurred'

    throw new Error(errorMessage)
  }
}


// Edit lead (Protected)
export const updateLeadAPI = async (id, updatedData) => {
  const token = getToken()
  await fetch(`${SERVER_URL}/leads/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Attach JWT token in header
    },
    body: JSON.stringify(updatedData),
  })
}

// Add customer (Protected)

export const addCustomerAPI = async (reqBody) => {
  const token = getToken()
  console.log('Using token:', token) // Debug: check what token is being used

  return await axios.post(`${SERVER_URL}/customer-add`, reqBody, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

// Get all customers (Protected)

export const getCustomersAPI = async () => {
  const token = localStorage.getItem('token'); // or use context/provider if you store it there
  return axios.get(`${SERVER_URL}/customers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
};

// Get customer by ID (Protected)


export const getCustomerByIdAPI = async (id) => {
  try {
    const token = getToken()
    const response = await axios.get(`${SERVER_URL}/customer-view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach JWT token in header
      },
    })
    return response.data // ✅ This returns the actual customer object
  } catch (error) {
    console.error('Error fetching customer:', error)
    throw error
  }
}
// Update customer by ID (Protected)

export const updateCustomerByIdAPI = async (id, customerData) => {
  const token = getToken()
  await fetch(`${SERVER_URL}/customer-edit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Attach JWT token in header
    },
    body: JSON.stringify(customerData),
  })
}
// Delete customer (Protected)

export const deleteCustomerAPI = async (id) => {
  try {
    const token = getToken()

    const response = await commonAPI(
      'DELETE',
      `${SERVER_URL}/customer-delete/${id}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    return response?.data || { message: 'No data received.' }
  } catch (error) {
    console.error('Error deleting customer:', error)

    // Improve error clarity
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      'Unknown error occurred'

    throw new Error(errorMessage)
  }
}
// Add contact (Protected)
export const contactAPI = async (reqBody) => {
  const token = getToken()
  return await commonAPI('POST', `${SERVER_URL}/contact`, reqBody, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach JWT token in header
    },
  })
}

// Add follow-up (Protected)

export const addFollowupAPI = async (followupData) => {
  const token = getToken()
  console.log('Using token:', token) // Debug: check what token is being used

  return await axios.post(`${SERVER_URL}/followup-add`, followupData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

// Get follow-ups (Protected)
export const getFollowupAPI = async () => {
  try {
    const token = getToken() // Get token from localStorage
    const response = await axios.get(`${SERVER_URL}/follow-up`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach JWT token in header
      },
    })
    return response.data // Return the response data
  } catch (error) {
    console.error('Error fetching follow-up data:', error) // Log any errors
    throw error // Re-throw error to handle it in the calling function
  }
}


// Get follow-up by ID (Protected)

export const getFollowupByIdAPI = async (followupId) => {
  try {
    const token = getToken() // Get token from localStorage or context
    const response = await axios.get(
      `${SERVER_URL}/followup-view/${followupId}`, // Your backend URL endpoint
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach JWT token in header
        },
      }
    )
    return response.data // ✅ Return the actual follow-up object
  } catch (error) {
    console.error('Error fetching follow-up data:', error)
    throw error // You can throw an error or return an error response
  }
}
