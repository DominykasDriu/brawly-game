import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../App';

export default function Menu() {
  const userState = useContext(UserContext)

  return (
    <main>
      <div className="container menu">
        <h2>Menu</h2>
        {userState &&
        <div className="user-stats">
          <div className="user-stats_image profile-image">
            <img src={userState.user.image} alt="profile-img" />
          </div>
          <div className="user-stats_text-container">
            <p className="user-stats_text-container__text">{userState.user.username}</p>
            <p className="user-stats_text-container__text"><img src="https://i.ibb.co/MGMrp82/heart.png"/> {userState.user.health}</p>
            <p className="user-stats_text-container__text"><img src="https://i.ibb.co/6yRysPV/coin.png"/> {userState.user.gold}</p>
          </div>
        </div>
        }
        <div className="menu">
          <Link className="btn" to="/inventory">Inventory</Link>
          <Link className="btn" to="/shop">Shop</Link>
          <Link className="btn" to="/leaderboard">Leaderboard</Link>
          <Link className="btn" to="/arena">Arena</Link>
        </div>
      </div>
    </main>
  )
}
