import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

export default function Signup() {
  let history = useHistory()

  const [form, setForm] = useState({
    username: '',
    passwordOne: '',
    passwordTwo: '',
    image: ''
  })
  const [errors, setErrors] = useState(null)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
          history.push('/login')
        } else {
          setErrors(data.errors)
        }
      })
    } else {
      setErrors(['No input fields can be empty'])
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange}/>
        <label>Password</label>
        <input type="password" name="passwordOne" onChange={handleChange}/>
        <label>Repeat Password</label>
        <input type="password" name="passwordTwo" onChange={handleChange}/>
        <label>Profile image</label>
        <input type="text" name="image" onChange={handleChange}/>
        <small>Provide a URL to image</small>
        <button type="submit">Submit</button>
      </form>
      <div className="errors">
        {!errors ? '' :
        errors.map(e => (
          <p>{e}</p>
        ))
        }
      </div>
    </main>
  )
}
