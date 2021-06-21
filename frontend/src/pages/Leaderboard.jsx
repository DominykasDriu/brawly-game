import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from "react-router-dom";
import { UserContext } from '../App';

export default function Leaderboard() {
  const userState = useContext(UserContext)
  const [leaders, setLeaders] = useState(null)
  const history = useHistory()
  // Get all registered users
  useEffect(() => {
    fetch('http://localhost:3001/api/leaderboard')
    .then(res => res.json())
    .then(data => {
      // Before 
      let sorted = data.result.sort((a, b) => a.gold + b.gold)
      setLeaders(sorted)
    })
  }, [])
  // After clicking on user send to user profile page
  const handleClick = (username) => {
    history.push(`/profile/${username}`)
  }

  return (
    <main>
      <div className="container leaderboard">
      {/* Decide on heading from the user state */}
      <h2>{userState.user ? 'Leaderboard' : 'Register and join the heroes!'}</h2>
        <div className="leaderboard_container">
          {/* Render all the users */}
          {!leaders ? 'Loading...' : leaders.map((e, index) => (
            // Wrap users in redirect function
            <div className="leaderboard_container__card" key={index} onClick={() => handleClick(e.username)}>
              <div className="left">
                <p>{index + 1}.</p>
                <p>{e.username}</p>
              </div>
              <p>Gold: {e.gold}</p>
            </div>
          ))}
        </div>
        {/* Decide on button from the user state */}
        { userState.user ? 
          <Link className="btn" to="/menu">Back to Menu</Link>
          :
          <Link className="btn" to="/signup">Register Now!</Link>
        }
      </div>
    </main>
  )
}
