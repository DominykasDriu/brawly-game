import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../App';
import HealthBar from '../compoenents/HealthBar';
import ItemCard from '../compoenents/ItemCard';
import Modal from '../compoenents/Modal';
import fightCalculator from '../hooks/fightCalculator'

export default function Arena() {
  const userState = useContext(UserContext)

  const [monsters, setMonsters] = useState(null)
  const [currentMonster, setCurrentMonster] = useState({})
  const [selectedArmor, setSelectedArmor] = useState(null)
  const [selectedWeapon, setSelectedWeapon] = useState(null)
  const [modal, setModal] = useState({
    on: true,
    title: 'Tip',
    body: 'Equip a weapon and armor before the fight!'
  })
  // Ref for monster image
  const monsterImage = useRef(null)

  // Fetching monster data
  useEffect(() => {
    fetch('monsters.json')
    .then(res => res.json())
    .then(data => setMonsters(data))
  }, [])

  // Wait for the monsters data to come then run monster randomizer to select enemy
  useEffect(() => {
    setMonster()
  }, [monsters])
  // Random monster setter
  const setMonster = () => {
    if (monsters) {
      let rnd = Math.floor(Math.random() * 3)
      setCurrentMonster({...monsters[rnd], hp: 100})
    }
  }
  // Health managing trough API
  const updateHealth = (action, val, item) => {
    // Building endpoint with arguments
    fetch(`http://localhost:3001/api/health/${action}/${val}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'token': userState.token
      },
      // If item argument exists send it as well so backend could delete the potion form inventory
      body: JSON.stringify({id: item ? item.id : null})
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data.success) {
        // Update user state
        userState.setUser(prevState => {return {...prevState, user: data.user}})
      } else {
        console.log(data)
      }
    })
  }
  // Using an item in arena logic
  const useItem = (item) => {
    if (item.type === 'potion') {
      // Use potion
      updateHealth('add', item.stat, item)
    } else if (item.type === 'armor') {
      // Set selected armor
      setSelectedArmor({...item})
    } else {
      // -''-
      setSelectedWeapon({...item})
    }
  }
  // Update users gold
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
        // Update user state
        userState.setUser(prevState => {return {...prevState, user: data.user}})
      } else {
        console.log(data)
      }
    })
  }

  const fight = () => {
    // Check if user equiped items before the fight
    if (selectedArmor, selectedWeapon) {
      // Run fight calculator hook and store the outcome in result variable
      let result = fightCalculator(currentMonster, selectedArmor, selectedWeapon)
      // If wand was used and it triggered special update health
      if (result.userHeal) updateHealth('add', 10)
      // Remove monster damage from user health
      updateHealth('remove', result.monsterDmg)
      // If after this user does not have anymore HP show modal with message
      if (userState.user.health <= 0) {
        return setModal({
          on: true,
          title: 'Warning',
          body: 'You died, replenish your HP with potions before continuing the fight!',
          func: null,
          closeModal: setModal
        })
      }
      // Add gold to user
      addLoot(result.userLoot)
      // Calculate monster final hp
      let monsterHpAfterHit = currentMonster.hp - result.userDmg
      // If monster is still alive add class to the image so it would shake
      if (monsterHpAfterHit >= 1) {
        monsterImage.current.classList.add('shake')
        setTimeout(()=> {
          monsterImage.current.classList.remove('shake')
        }, 500)
        setCurrentMonster(prev => {return {...prev, hp: monsterHpAfterHit}})
      } else {
        // If monster is dead set next monster
        setMonster()
      }
    }
  }

  return (
    <main>
      <div className="container arena">
        <div className="arena_combat-wrapper">
          <div className="user">
              {/* Healthbar */}
              <HealthBar hp={userState.user.health}/>
              <div className="profile-image">
                <img src={userState.user.image} alt="profile-img" />
              </div>
              <div>
                {/* Users name and how much damage he will deal with current weapon */}
                <h3>{userState.user.username}</h3>
                <p>Damage {selectedWeapon ? selectedWeapon.stat : 0}</p>
              </div>
          </div>
          <div className="arena_combat-wrapper__cta">
            {/* disable fight button if armor or weapon is not equiped */}
            <button className="btn" disabled={selectedWeapon && selectedArmor ? false : true} onClick={() => fight()}>Attack</button>
            <Link className="btn" to="/menu">Run Away!</Link>
          </div>
          <div className="monster">
            {/* Render monster card */}
            {currentMonster && 
            <div className="monster_card">
              <HealthBar hp={currentMonster.hp}/>
              <img ref={monsterImage} src={currentMonster.image} alt={currentMonster.name} />
              <h3>{currentMonster.name}</h3>
              <p>Damage {currentMonster.damage}</p>
            </div>
            }
          </div>
        </div>
        <div className="items">
          <div className="items_current">
            {/* Seleceted items */}
            <div className="items_current__armor">
              <h3>Armor</h3>
              {selectedArmor ? <ItemCard {...selectedArmor} btn={null}/> : (<div className="empty-slot"></div>)}
            </div>
            <div className="items_current__weapon">
              <h3>Weapon</h3>
              {selectedWeapon ? <ItemCard {...selectedWeapon} btn={null}/> : (<div className="empty-slot"></div>)}
            </div>
          </div>
          {/* Users inventory */}
          <div className="items_inventory inventory big">
            {userState.user.inventory.map(e => (
              <ItemCard {...e} btn={'Use'} fnc={useItem} key={e.id}/>
            ))}
          </div>
        </div>
      </div>
      {/* Modal Comp */}
      <Modal {...modal} closeModal={setModal}/>
    </main>
  )
}
