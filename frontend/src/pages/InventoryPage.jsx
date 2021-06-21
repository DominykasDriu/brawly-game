import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../App';
import ItemCard from '../compoenents/ItemCard';

export default function InventoryPage() {
  const userState = useContext(UserContext)
  // Sell items API function
  const sellItem = (item) => {
    fetch('http://localhost:3001/api/sell', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': userState.token
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
      <div className="container inventory-page">
        <h2>Inventory</h2>
        <p className="inventory-page_gold">Your gold: {userState.user.gold}</p>
        <div className={'inventory ' + (userState.user.inventory.length >= 10 && 'scroll')}>
          {userState.user.inventory.map(e => (
            <ItemCard {...e} btn={`Sell for ${e.sell}`} fnc={sellItem} key={e.id}/>
          ))}
          {userState.user.inventory.length <= 0 && (<h3>Buy items in the shop!</h3>)}
        </div>
        <Link className="btn" to="/menu">Back to Menu</Link>
      </div>
    </main>
  )
}
