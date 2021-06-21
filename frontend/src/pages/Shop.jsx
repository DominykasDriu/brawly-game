import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../App';
import ItemCard from '../compoenents/ItemCard';

export default function Shop() {
  const [items, setItems] = useState(null)

  const userState = useContext(UserContext)
  // Get all available items
  useEffect(() => {
    fetch('items.json')
    .then(res => res.json())
    .then(data => setItems(data))
  }, [])
  // Buy items logic for API
  const buyItem = (item) => {
    // Generate an ID for the bought item
    let id = String(Date.now()) + String(Math.floor(Math.random() * 1000));
    fetch('http://localhost:3001/api/buy', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': userState.token
      },
      // Send bought item object with ID
      body: JSON.stringify({...item, id})
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // Set user with the new item in inventory
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
            {/* Render all available items */}
            {items && items.map((e) => (
              // If price is to high for user show diabled buy button
              <ItemCard {...e} btn={`Buy for ${e.price}`} fnc={buyItem} key={e.id} disabled={userState.user.gold >= e.price ? false : true}/>
            ))}
          </div>
        </div>
        <Link className="btn" to="/menu">Back to Menu</Link>
      </div>
    </main>
  )
}
