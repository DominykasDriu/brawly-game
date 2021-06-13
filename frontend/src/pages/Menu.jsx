import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../App';

export default function Menu() {
  const data = useContext(UserContext)
  let user = data.user.user || null

  return (
    <main>
      {user &&
      <div>
        <img src={user.image} alt="profile-img" />
        <p>Name: {user.username}</p>
        <p>Health: {user.health}</p>
        <p>Gold: {user.gold}</p>
      </div>
      }
      <div className="menu">
        <Link to="/inventory">Inventory</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/arena">Arena</Link>
      </div>
    </main>
  )
}
