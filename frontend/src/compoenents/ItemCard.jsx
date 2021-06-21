import React from 'react'
import ReactTooltip from 'react-tooltip';

export default function ItemCard(item) {

  return (
    <div className="item-card" data-tip={item.description}>
      <img src={item.image} alt="item"/>
      <p className="item-card_name">{item.name}</p>
      <p className="item-card_level">Lvl. {item.level} {item.type}</p>
      {/* If button text is passed render the button*/}
      {item.btn && <button className="btn small" disabled={item.disabled} onClick={() => item.fnc(item)}>{item.btn}</button>}
      <ReactTooltip/>
    </div>
  )
}
