import React from 'react'

const Dice = ({ value, frozen, locked, freezeDie }) => {
  const styles = {
    backgroundColor: frozen && "#59E391",
    pointerEvents: locked && "none"
  }
  
  return (
    <div style={styles} className='die' onClick={freezeDie}>
        <h4 className='die-value'>{value}</h4>
    </div>
  )
}

export default Dice