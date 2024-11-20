import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const UserLogin = (props) => {
  const [user, setUser] = useState({ email: '', password: '' });
  const host = 'http://localhost:5000';
  let navigate = useNavigate();

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    //get User
    const url = host + '/api/auth/login';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email, password: user.password }),
    });
    const json = await res.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      navigate('/')
      props.showAlert("User Loggedin Successfully", "success")
    } else {
      props.showAlert("Invalid Credentials", "danger")
    }
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email'
            value={user.email} placeholder="name@example.com" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" name='password' className="form-control" aria-describedby="passwordHelpBlock" placeholder="Enter Password"
            value={user.password} onChange={onChange} minLength={6} maxLength={18} required />
          <div id="passwordHelpBlock" className="form-text">
            Your password must be 6-18 characters long.
          </div>
        </div>
        <button disabled={user.password.length > 18 || user.password.length < 5} type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default UserLogin