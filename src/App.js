import React, { useState } from "react";
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
  
  return (
    <div className="App">
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="text">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          
        </div>
      </main>
    </div>
    
  );
}

export default App;
