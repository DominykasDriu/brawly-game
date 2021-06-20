import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App';

export default function Header() {
  let history = useHistory()
  const user = useContext(UserContext)
  
  const handleLogOut = () => {
    user.setUser(null)
    history.push('/leaderboard')
  }

  return (
    <header>
      <h1 className="logo">Brawly</h1>
      {!user.user ? 
      <div className="user-managment">
        <Link className="btn" to="/signup">Sign Up</Link>
        <Link className="btn" to="/login">Log In</Link>
      </div>
      :
      <div className="user-managment">
        <button className="btn" onClick={handleLogOut}>Log Out</button>
      </div>
      }
    </header>
  )
}
