import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../App';
import HealthBar from '../compoenents/HealthBar';

export default function Arena() {
  const userState = useContext(UserContext)

  const [monsters, setMonsters] = useState(null)
  const [currentMonster, setCurrentMonster] = useState({})

  useEffect(() => {
    fetch('monsters.json')
    .then(res => res.json())
    .then(data => setMonsters(data))
  }, [])

  useEffect(() => {
    setMonster()
  }, [monsters])

  const setMonster = () => {
    if (monsters) {
      let rnd = Math.floor(Math.random() * 3)
      setCurrentMonster({...monsters[rnd], hp: 100})
    }
  }

  return (
    <main>
      <div className="combat-window">
        <div className="user">
          <div>
            <HealthBar hp={userState.user.health}/>
            <img src={userState.user.image} alt="profile-img" />
            <h3>{userState.user.username}</h3>
          </div>
        </div>
        <div className="monster">
          {currentMonster && 
          <div>
            <HealthBar hp={currentMonster.hp}/>
            <img src={currentMonster.image} alt={currentMonster.name} />
            <h3>{currentMonster.name}</h3>
            <p>Damage {currentMonster.damage}</p>
          </div>
          }
        </div>
      </div>
      <button>Attack</button>
      <div className="inventory">
        
      </div>
      <Link to="/menu">Run Away!</Link>
    </main>
  )
}
