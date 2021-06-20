import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../App';
import ItemCard from '../compoenents/ItemCard';

export default function Shop() {
  const [items, setItems] = useState(null)

  const userState = useContext(UserContext)

  useEffect(() => {
    fetch('items.json')
    .then(res => res.json())
    .then(data => setItems(data))
  }, [])
  console.log(items);
  const buyItem = (item) => {
    let id = String(Date.now()) + String(Math.floor(Math.random() * 1000));
    fetch('http://localhost:3001/api/buy', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': userState.token
      },
      body: JSON.stringify({...item, id})
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
      <div className="container shop">
        <h2>Shop</h2>
        <p className="shop_gold">Your gold: {userState.user.gold}</p>
        <div className="shop-items">
          <div className="inventory">
            {items && items.map((e) => (
              <ItemCard {...e} btn={`Buy for ${e.price}`} fnc={buyItem} key={e.id} disabled={userState.user.gold >= e.price ? false : true}/>
            ))}
          </div>
        </div>
        <Link className="btn" to="/menu">Back to Menu</Link>
      </div>
    </main>
  )
}
