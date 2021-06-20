import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import ItemCard from '../compoenents/ItemCard';

export default function Profile() {
  const {name} = useParams()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3001/api/user/${name}`)
    .then(res => res.json())
    .then(data => setProfile(data))
  }, [])

  return (
    <main>
      <div className="container profile">
        <h2>{profile && profile.username}</h2>
        {profile &&
        <div className="profile_wrapper">
          <div className="user-stats">
            <div className="user-stats_image profile-image">
              <img src={profile.image} alt="profile-img" />
            </div>
            <div className="user-stats_text-container">
              <p className="user-stats_text-container__text"><img src="https://i.ibb.co/MGMrp82/heart.png"/> {profile.health}</p>
              <p className="user-stats_text-container__text"><img src="https://i.ibb.co/6yRysPV/coin.png"/> {profile.gold}</p>
            </div>
          </div>
          <div className={'inventory ' + (profile.inventory.length >= 10 && 'scroll w-btn')}>
            {profile.inventory.map(e => (
              <ItemCard {...e} key={e.id} btn={null}/>
            ))}
          </div>
        </div>
        }
        <Link className="btn" to="/leaderboard">Back to Leaderboard</Link>
      </div>
    </main>
  )
}
