import React, { useState } from "react";
import Board from "./Board";
import Info from "./Info";
import Header from "./Header";
import "../css/App.css";

function App() {
  const [reset, setReset] = useState(false);
  const [winner, setWinner] = useState("");

  const resetBoard = () => {
    setReset(true);
  };

  return (
    <div className="App">
        <Header />
        {winner && (
            <div className="winner">
            <div className="winner-text">{winner}</div>
            <button onClick={resetBoard}>Reset Board</button>
            </div>
        )}
        <Board reset={reset} setReset={setReset} setWinner={setWinner} winner={winner} />
        <Info />
</div>
    
  );
}

export default App;
