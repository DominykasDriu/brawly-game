import React from 'react'

export default function ItemCard(item) {

  return (
    <div className="item-card">
      <img src={item.image} alt="" />
      <h3>{item.name}</h3>
      <p>Lvl. {item.level} {item.type}</p>
      {/* If button text is passed render it */}
      {item.btn && <button onClick={() => item.fnc(item)}>{item.btn}</button>}
    </div>
  )
}
