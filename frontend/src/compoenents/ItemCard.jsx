import React from 'react'

export default function ItemCard({name, image, level, type, id, btn, fnc}) {

  return (
    <div className="item-card">
      <img src={image} alt="" />
      <h3>{name}</h3>
      <p>Lvl. {level} {type}</p>
      {/* If button text is passed render it */}
      {btn && <button onClick={() => fnc(id)}>{btn}</button>}
    </div>
  )
}
