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
      <h1>Brawly</h1>
      {!user.user ? 
      <div>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
      :
      <button onClick={handleLogOut}>Log Out</button>
      }
    </header>
  )
}
