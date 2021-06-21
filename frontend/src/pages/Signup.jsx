import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

export default function Signup() {
  let history = useHistory()
  // Form input values
  const [form, setForm] = useState({
    username: '',
    passwordOne: '',
    passwordTwo: '',
    image: ''
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
    if (form.username && form.passwordOne && form.passwordTwo && form.image) {
      fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // If success redirect to login page
          history.push('/login')
        } else {
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
      <div className="container signup">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" name="username" onChange={handleChange}/>
          <label>Password</label>
          <input type="password" name="passwordOne" onChange={handleChange}/>
          <label>Repeat Password</label>
          <input type="password" name="passwordTwo" onChange={handleChange}/>
          <small>Passwords must match</small>
          <label>Profile image</label>
          <input type="text" name="image" onChange={handleChange}/>
          <small>Provide a URL to image</small>
          <button className="btn" type="submit">Submit</button>
        </form>
        <div className="errors">
          {/* Render errors if there are any */}
          {!errors ? '' :
          errors.map(e => (
            <p>{e}</p>
          ))
          }
        </div>
      </div>
    </main>
  )
}
