import React, { useState } from "react";
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
      </main>
    </div>
    
  );
}

export default App;
