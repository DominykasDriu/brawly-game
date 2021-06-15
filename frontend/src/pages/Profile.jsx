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
      {profile &&
       <div>
          <div className="profile-info">
            <img src={profile.image}/>
            <h1>Name: {profile.username}</h1>
            <p>Health: {profile.health}</p>
            <p>Gold: {profile.gold}</p>
          </div>
          <div className="inventory">
            <p>User items:</p>
            {profile.inventory.map(e => (
              <ItemCard {...e} key={e.id}/>
            ))}
          </div>
       </div>
      }
      <Link to="/menu">Back to Menu</Link>
    </main>
  )
}
