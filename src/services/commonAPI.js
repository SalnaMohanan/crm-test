// // src/services/commonAPI.js
// import axios from 'axios'

// const commonAPI = async (method, url, body) => {
//   try {
//     const response = await axios({
//       method: method,
//       url: url,
//       data: body,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })

//     return response
//   } catch (error) {
//     throw error
//   }
// }

// export default commonAPI


// src/services/commonAPI.js
// src/services/commonAPI.js
import axios from 'axios'

const commonAPI = async (method, url, body, headers = {}) => {
  try {
    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        ...headers, // merge custom headers like Authorization
      },
    }

    if (body !== null && body !== undefined) {
      config.data = body
    }

    const response = await axios(config)
    return response
  } catch (error) {
    throw error
  }
}

export default commonAPI
