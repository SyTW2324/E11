import React from 'react'
import { useRef, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import '../../styles/LoginRegister.css'

const Login = () => {
  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  const [login, { isLoading}] = useLoginMutation()
  const dispatch = useDispatch()
  
  useEffect(() => {
      userRef.current?.focus()
  },[])

  useEffect(() => {
    setErrMsg(" ")
  }, [user,password])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const userData = await login({user, password}).unwrap()
      dispatch(setCredentials({...userData, user}))
      setUser("")
      setPassword("")
      navigate("/welcome")
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No response from server")
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid username or password")
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized")
      } else {
        setErrMsg("Unknown error")
      }
      errRef.current?.focus();
    }
  }

  const handleUserInput = (e: any) => { setUser(e.target.value) }
  const handlePasswordInput = (e: any) => { setPassword(e.target.value) }

  const content = isLoading ? <h1>Loading...</h1> : (
    <div className="login-container">
    <form onSubmit={handleSubmit}>
      <div className="login-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={user}
          onChange={handleUserInput}
          autoComplete='off'
          required
        />
      </div>
      <div className="login-form">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordInput}
          required
        />
      </div>
      <div className="login-form">
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>
  )

  return content
}

export default Login