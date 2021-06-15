import React, { useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import { UserContext } from '../App';

export default function Signup() {
  let history = useHistory()
  const user = useContext(UserContext)

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
        if (data.success) {
          user.setUser({user: data.user, token: data.token})
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
        errors.map((e, index) => (
          <p key={index}>{e}</p>
        ))
        }
      </div>
    </main>
  )
}
