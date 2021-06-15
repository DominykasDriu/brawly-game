import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../App';
import HealthBar from '../compoenents/HealthBar';
import ItemCard from '../compoenents/ItemCard';
import fightCalculator from '../hooks/fightCalculator'

export default function Arena() {
  const userState = useContext(UserContext)

  const [monsters, setMonsters] = useState(null)
  const [currentMonster, setCurrentMonster] = useState({})
  const [selectedArmor, setSelectedArmor] = useState(null)
  const [selectedWeapon, setSelectedWeapon] = useState(null)

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

  const updateHealth = (action, val, item) => {
    fetch(`http://localhost:3001/api/health/${action}/${val}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'token': userState.token
      },
      body: JSON.stringify({id: item ? item.id : null})
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data.success) {
        userState.setUser(prevState => {return {...prevState, user: data.user}})
      } else {
        console.log(data)
      }
    })
  }

  const useItem = (item) => {
    if (item.type === 'potion') {
      updateHealth('add', item.stat, item)
    } else if (item.type === 'armor') {
      setSelectedArmor(<ItemCard {...item} btn={null}/>)
    } else {
      setSelectedWeapon(<ItemCard {...item} btn={null}/>)
    }
  }

  const addLoot = (val) => {
    fetch(`http://localhost:3001/api/gold/${val}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'token': userState.token
      }
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data.success) {
        userState.setUser(prevState => {return {...prevState, user: data.user}})
      } else {
        console.log(data)
      }
    })
  }

  const fight = () => {
    if (selectedArmor, selectedWeapon) {
      let result = fightCalculator(currentMonster, selectedArmor, selectedWeapon)
      if (result.userHeal) updateHealth('add', 10)
      updateHealth('remove', result.monsterDmg)
      addLoot(result.userLoot)
      let monsterHpAfterHit = currentMonster.hp - result.userDmg
      if (monsterHpAfterHit >= 1) {
        setCurrentMonster(prev => {return {...prev, hp: monsterHpAfterHit}})
      } else {
        setMonster()
      }
    } else {
      alert('You need to equip some gear before heading in to arena!')
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
      <button onClick={() => fight()}>Attack</button>
      <div className="items">
        <div className="items_current">
          <div className="items_current__armor">
            <h3>Armor</h3>
            {selectedArmor}
          </div>
          <div className="items_current__weapon">
            <h3>Weapons</h3>
            {selectedWeapon}
          </div>
        </div>
        <div className="items_inventory">
          inventory:
          {userState.user.inventory.map(e => (
            <ItemCard {...e} btn={'Use'} fnc={useItem} key={e.id}/>
          ))}
        </div>
      </div>
      <Link to="/menu">Run Away!</Link>
    </main>
  )
}
