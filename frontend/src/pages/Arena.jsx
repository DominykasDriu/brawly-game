import React, { useEffect, useState, useContext, useRef } from 'react'
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

  const monsterImage = useRef(null)

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
      setSelectedArmor({...item})
    } else {
      setSelectedWeapon({...item})
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
        monsterImage.current.classList.add('shake')
        setTimeout(()=> {
          monsterImage.current.classList.remove('shake')
        }, 500)
        console.log(monsterImage);
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
      <div className="container arena">
        <div className="arena_combat-wrapper">
          <div className="user">
              <HealthBar hp={userState.user.health}/>
              <div className="profile-image">
                <img src={userState.user.image} alt="profile-img" />
              </div>
              <div>
                <h3>{userState.user.username}</h3>
                <p>Damage {selectedWeapon ? selectedWeapon.stat : 0} - Special effect: {selectedWeapon && selectedWeapon.description}</p>
              </div>
          </div>
          <div className="arena_combat-wrapper__cta">
            <button className="btn" disabled={selectedWeapon && selectedArmor ? false : true} onClick={() => fight()}>Attack</button>
            <Link className="btn" to="/menu">Run Away!</Link>
          </div>
          <div className="monster">
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
            <div className="items_current__armor">
              <h3>Armor</h3>
              {selectedArmor ? <ItemCard {...selectedArmor} btn={null}/> : (<div className="empty-slot"></div>)}
            </div>
            <div className="items_current__weapon">
              <h3>Weapon</h3>
              {selectedWeapon ? <ItemCard {...selectedWeapon} btn={null}/> : (<div className="empty-slot"></div>)}
            </div>
          </div>
          <div className="items_inventory inventory big">
            {userState.user.inventory.map(e => (
              <ItemCard {...e} btn={'Use'} fnc={useItem} key={e.id}/>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
