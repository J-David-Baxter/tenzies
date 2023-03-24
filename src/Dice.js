import React from 'react'

const Dice = ({index, value, frozen, locked, freezeDie}) => {
  const styles = {
    backgroundColor: frozen && "#59E391",
    pointerEvents: locked && "none"
  }
  
  return (
    <div style={styles} className='die' onClick={() => freezeDie(index)}>
        <h4 className='die-value'>1</h4>
    </div>
  )
}

export default Dice