import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)
  const [userId, setUserId] = useState(null)

  // Restore from localStorage on page reload
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    const storedRole = localStorage.getItem('role')
    const storedUserId = localStorage.getItem('userId')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    if (storedToken) {
      setToken(storedToken)
    }
    if (storedRole) {
      setRole(storedRole)
    }
    if (storedUserId) {
      setUserId(storedUserId)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        role,
        setRole,
        userId,
        setUserId,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
  