import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../App';

export default function Shop() {
  const [items, setItems] = useState(null)

  const userState = useContext(UserContext)

  useEffect(() => {
    fetch('items.json')
    .then(res => res.json())
    .then(data => setItems(data))
  }, [])

  const buyItem = (type, level, price) => {
    fetch('http://localhost:3001/api/buy', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': userState.user.token
      },
      body: JSON.stringify({
        item: {type, level},
        price
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        userState.setUser(prevState => {return {...prevState, user: data.user}})
      } else {
        console.log(data)
      }
    })
  }

  return (
    <main>
      <div className="shop-items">
        <div className="armors">
          {items && items.armors.map((e, index) => (
            <div key={index} style={{display: userState.user.user.inventory.armors.includes(e.level) && 'none'}}>
              <p>{e.name}</p>
              <p>Price: {e.price}$</p>
              <button 
              disabled={userState.user.user.gold <= e.price}
              onClick={() => buyItem(e.type, e.level, e.price)}
              >BUY</button>
            </div>
          ))}
        </div>
        <div className="weapons">
          {items && items.weapons.map((e, index) => (
            <div key={index}>
              <p>{e.name}</p>
              <p>Price: {e.price}$</p>
              <button 
              disabled={userState.user.user.gold <= e.price}
              onClick={() => buyItem(e.type, e.level, e.price)}
              >BUY</button>
            </div>
          ))}
        </div>
        <div className="potions">
          {items && items.potions.map((e, index) => (
            <div key={index}>
              <p>{e.name}</p>
              <p>Price: {e.price}$</p>
              <button 
              disabled={userState.user.user.gold <= e.price}
              onClick={() => buyItem(e.type, e.level, e.price)}
              >BUY</button>
            </div>
          ))}
        </div>
      </div>
      <Link to="/menu">Back to Menu</Link>
    </main>
  )
}
