import React, { useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import { UserContext } from '../App';

export default function Signup() {
  let history = useHistory()
  const user = useContext(UserContext)
  // Form input values
  const [form, setForm] = useState({
    username: '',
    password: '',
  })
  // Errors state that stores all error
  const [errors, setErrors] = useState(null)
  // Set form state on inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  // Send form values to backend
  const handleSubmit = (e) => {
    e.preventDefault()
    // Check if inputs are not empty
    if (form.username && form.password) {
      fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // If login is success set user state and redirect user
          user.setUser({user: data.user, token: data.token})
          history.push('/menu')
        } else {
          // If login failed fill in error state
          setErrors(data.errors)
        }
      })
    } else {
      // If any fields are empty add error
      setErrors(['No input fields can be empty'])
    }
  }

  return (
    <main>
      <div className="container login">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" name="username" onChange={handleChange}/>
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange}/>
          <button className="btn" type="submit">Submit</button>
        </form>
        <div className="errors">
          {/* Render errors if there are any */}
          {!errors ? '' :
          errors.map((e, index) => (
            <p key={index}>{e}</p>
          ))
          }
        </div>
      </div>
    </main>
  )
}
