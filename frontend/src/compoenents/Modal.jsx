import React from 'react'

export default function Modal({on, title, body, closeModal}) {
  return (
    <div className="modal" style={{display: on ? 'block' : 'none'}}>
      <div className="container">
        <h3>{title}</h3>
        <p>{body}</p>
        <button className="btn" onClick={() => closeModal({on: false})}>Ok!</button>
        </div>
      </div>
  )
}
