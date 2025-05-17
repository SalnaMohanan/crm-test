// src/hooks/useAxiosAuth.js
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const useAxiosAuth = () => {
  const { token } = useContext(AuthContext)

  const instance = axios.create({
    baseURL: 'http://localhost:3000',
  })

  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  return instance
}

export default useAxiosAuth
