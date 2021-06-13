import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

export default function Signup() {
  let history = useHistory()

  const [form, setForm] = useState({
    username: '',
    password: '',
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
        console.log(data);
        if (data.success) {
          history.push('/menu')
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
        <input type="password" name="password" onChange={handleChange}/>
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
