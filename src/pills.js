import React from 'react'
import "./pills.css"

function Pills({firstname,onClick}) {
  return (
    <span className='pills' onClick={onClick}>{firstname}</span>
  )
}

export default Pills