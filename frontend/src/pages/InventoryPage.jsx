import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../App';
import ItemCard from '../compoenents/ItemCard';

export default function InventoryPage() {
  const userState = useContext(UserContext)

  const sellItem = (item) => {
    fetch('http://localhost:3001/api/sell', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': userState.user.token
      },
      body: JSON.stringify(item)
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
      <h1>{userState.user.user.username} inventory</h1>
      <p>Gold: {userState.user.user.gold}</p>
      <div className="items">
        {userState.user.user.inventory.map(e => (
          <ItemCard {...e} btn={`Sell for ${e.price}`} fnc={sellItem} key={e.id}/>
        ))}
      </div>
      <Link to="/menu">Back to Menu</Link>
    </main>
  )
}
