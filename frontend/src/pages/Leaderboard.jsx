import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from "react-router-dom";
import { UserContext } from '../App';

export default function Leaderboard() {
  const userState = useContext(UserContext)
  const [leaders, setLeaders] = useState(null)
  const history = useHistory()

  useEffect(() => {
    fetch('http://localhost:3001/api/leaderboard')
    .then(res => res.json())
    .then(data => {
      let sorted = data.result.sort((a, b) => a.gold + b.gold)
      setLeaders(sorted)
    })
  }, [])

  const handleClick = (username) => {
    history.push(`/profile/${username}`)
  }

  return (
    <main>
      <h1>{userState.user ? 'Leaderboard' : 'Register and join the heroes!'}</h1>
      <div className="users-container">
        {!leaders ? 'Loading' : leaders.map((e, index) => (
          <div className="user" key={index} onClick={() => handleClick(e.username)}>
            <p>{e.username}</p>
            <span>Gold: {e.gold}</span>
          </div>
        ))}
      </div>
      <Link to="/menu">Back to Menu</Link>
    </main>
  )
}
