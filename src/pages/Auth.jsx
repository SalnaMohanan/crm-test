import React, { useState, useContext } from 'react'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'
import { loginAPI, registerAPI } from '../services/allAPI'
import { AuthContext } from '../context/AuthContext'

const Auth = ({ insideRegister }) => {
  const navigate = useNavigate()
  const { setUser, setToken, setRole, setUserId } = useContext(AuthContext)

  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  })

  const [isLogined, setIsLogined] = useState(false)

  // Register function
  const handleRegister = async (e) => {
    e.preventDefault()

    if (
      inputData.username &&
      inputData.email &&
      inputData.password &&
      inputData.role
    ) {
      try {
        const result = await registerAPI(inputData)

        if (result?.message) {
          navigate('/login')
          setInputData({ username: '', email: '', password: '', role: '' })
        }
      } catch (err) {
        console.error(err)
        if (err.response?.status === 406) {
          alert(err.response.data)
        } else {
          alert('Registration failed. Please try again.')
        }
        setInputData({ username: '', email: '', password: '', role: '' })
      }
    } else {
      alert('Please fill out the form completely.')
    }
  }

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault()

    if (inputData.email && inputData.password) {
      try {
        setIsLogined(true)

        const result = await loginAPI(inputData)

        setIsLogined(false)

        if (result?.status === 200) {
          const { user, token } = result.data

          setUser(user)
          setToken(token)
          setRole(user.role)
          setUserId(user._id)

          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('token', token)
          localStorage.setItem('role', user.role)
          localStorage.setItem('userId', user._id)

          // Navigate based on role
          if (user.role === 'manager') {
            navigate('/manager-dashboard')
          } else if (user.role === 'salesperson') {
            navigate('/sale-dashboard')
          }

          setInputData({ username: '', email: '', password: '', role: '' })
        }
      } catch (err) {
        setIsLogined(false)
        console.error(err)
        alert('Login failed. Please check your credentials and try again.')
      }
    } else {
      alert('Please fill out the email and password fields.')
    }
  }

  return (
    <div className="login-page">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div
          className="shadow card p-2 bg-transparent"
          style={{ width: '400px' }}>
          <h5 className="text-center text-light">CRM</h5>
          <h6 className="text-center text-light">
            Sign {insideRegister ? 'up' : 'in'} to your Account
          </h6>

          {insideRegister && (
            <>
              <FloatingLabel
                controlId="floatingUserName"
                label="UserName"
                className="mb-3">
                <Form.Control
                  onChange={(e) =>
                    setInputData({ ...inputData, username: e.target.value })
                  }
                  value={inputData.username}
                  type="text"
                  placeholder="Username"
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingrole"
                label="Role"
                className="mb-3">
                <Form.Select
                  onChange={(e) =>
                    setInputData({ ...inputData, role: e.target.value })
                  }
                  value={inputData.role}
                  required>
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="manager">Manager</option>
                  <option value="salesperson">Salesperson</option>
                </Form.Select>
              </FloatingLabel>
            </>
          )}

          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3">
            <Form.Control
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
              value={inputData.email}
              type="email"
              placeholder="name@example.com"
              required
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3">
            <Form.Control
              onChange={(e) =>
                setInputData({ ...inputData, password: e.target.value })
              }
              value={inputData.password}
              type="password"
              placeholder="Password"
              required
            />
          </FloatingLabel>

          {insideRegister ? (
            <div className="m-3">
              <button onClick={handleRegister} className="btn btn-warning mb-2">
                Register
              </button>
              <p className="text-light">
                Already a user? Please click here to{' '}
                <Link to={'/login'} className="link-warning">
                  Login
                </Link>
              </p>
            </div>
          ) : (
            <div className="m-3">
              <button
                onClick={handleLogin}
                className="btn btn-warning mb-2 w-100"
                disabled={isLogined}>
                {isLogined ? (
                  <>
                    <Spinner animation="border" size="sm" variant="light" />{' '}
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>

              <p className="text-light text-center">
                New user? Please click here to{' '}
                <Link to={'/register'} className="link-warning">
                  Register
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth
