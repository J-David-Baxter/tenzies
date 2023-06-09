import React, { useEffect, useState } from "react";
import Dice from "./Dice";
import Confetti from "react-confetti";
import "./style.css";

function assignValue(die) {
  let randomNumber = Math.floor(Math.random() * 6 + 1);
  die.value = randomNumber;
  return die;
}

const initialArray = Array(10).fill({frozen: false, locked: false});
const initalState = initialArray.map(die => assignValue({...die}));

const App = () => {
  const [dice, setDice] = useState(initalState);
  const [wonGame, setWonGame] = useState(false);
  const [numRolls, setNumRolls] = useState(0);

  function freezeDie(index) {
    setDice(dice.map((die, i) => {
      return i === index ? {...die, frozen: !die.frozen} : die;
    }))
  }

  function handleRoll() {
    setNumRolls(prevNumRolls => prevNumRolls + 1)
    setDice(prevDice => {
      return prevDice.map(die => {
        return !die.frozen ? assignValue({...die}) : die;
      })
    })
  }

  function resetGame() {
    setDice(initalState);
    setWonGame(false);
    setNumRolls(0);
  }

  useEffect(() => {
    dice.every(die => die.frozen === true) &&
    dice.every(die => die.value === dice[0].value) && 
    setWonGame(true);
  }, [dice])
  
  return (
    <main>
      {wonGame && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="text">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dice.map((die, i) => (
          <Dice 
            key={i}
            {...die}
            freezeDie={() => freezeDie(i)}
          />
          ))}
      </div>
      <p className="text">Number of Rolls: {numRolls}</p>
      {wonGame ? <button className="btn" onClick={resetGame}>Reset</button> : <button className="btn" onClick={handleRoll}>Roll</button>}
    </main>
  );
}

export default App;
