import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [user, setUser] = useState({ name: '', email: '', password: '', cnfpassword: '' });
    const host = 'http://localhost:5000';
    let navigate = useNavigate();

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = user;
        //Create User
        const url = host + '/api/auth/createUser';
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await res.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            props.showAlert("User Created Successfully", "success")
            navigate('/')
        } else {
            props.showAlert("Invalid Details", "danger")
        }
    }

    return (
        <div className='mt-3'>
            <h2 className='my-3'>SignUp to iNotebook</h2>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name'
                        value={user.name} placeholder="Enter Name" onChange={onChange} required />
                </div>
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
                <div className="mb-3">
                    <label htmlFor="cnfpassword" className="form-label">Confirm Password</label>
                    <input type="password" id="cnfpassword" name='cnfpassword' className="form-control" aria-describedby="passwordHelpBlock" placeholder="Enter Confirm Password"
                        value={user.cnfpassword} onChange={onChange} minLength={6} maxLength={18} required />
                </div>
                <button disabled={user.password.length > 18 || user.password.length < 6 || user.name.length < 6} type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup