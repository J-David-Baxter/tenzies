import React, { useEffect, useState } from "react";
import Dice from "./Dice";
import "./style.css"

function assignValue(die) {
  let randomNumber = Math.floor(Math.random() * 6 + 1);
  die.value = randomNumber;
  return die;
}

const initialArray = Array(10).fill({frozen: false, locked: false});
const initalState = initialArray.map((die, i) => i < 10 && assignValue({...die}));

function App() {
  const [dice, setDice] = useState(initalState);
  const [wonGame, setWonGame] = useState(false);

  function freezeDie(index) {
    setDice(dice.map((die, i) => {
      return i === index ? {...die, frozen: !die.frozen} : die
    }))
  }

  function handleRoll() {
    setDice(prevDice => {
      return prevDice.map(die => {
        return !die.frozen ? assignValue({...die}) : die
      })
    })
  }

  function resetGame() {
    setDice(initalState)
  }

  useEffect(() => {
    let diceValues = dice.map(die => die.value);
    diceValues.every(value => value === diceValues[0]) && setWonGame(true)
  }, [dice])

  useEffect(() => {
    if (wonGame) {
      setDice(dice.map(die => ({...die, frozen: true, locked: true})))
    }
  }, [wonGame])
  
  return (
    <div className="App">
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="text">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {dice.map((die, i) => (
            <Dice 
              key={i}
              index={i}
              {...die}
              freezeDie={freezeDie}
            />
          ))}
        </div>
        {wonGame ? <button className="btn" onClick={resetGame}>Reset</button> : <button className="btn" onClick={handleRoll}>Roll</button>}
      </main>
    </div>
    
  );
}

export default App;
