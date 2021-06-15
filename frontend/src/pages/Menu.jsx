import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../App';

export default function Menu() {
  const userState = useContext(UserContext)

  return (
    <main>
      {userState &&
      <div>
        <img src={userState.user.image} alt="profile-img" />
        <p>Name: {userState.user.username}</p>
        <p>Health: {userState.user.health}</p>
        <p>Gold: {userState.user.gold}</p>
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
