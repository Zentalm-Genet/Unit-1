import React, { useState, useEffect, useRef } from "react";
import Square from "./Square";
import "../css/Board.css";

const Board = ({ reset, setReset, winner, setWinner }) => {
  const [turn, setTurn] = useState(0);
  const [data, setData] = useState(Array(9).fill(""));
  const boardRef = useRef(null);

  const draw = (index) => {
    if (data[index - 1] === "" && winner === "") {
      const current = turn === 0 ? "X" : "O";
      const newData = [...data];
      newData[index - 1] = current;
      setData(newData);
      setTurn((prevTurn) => (prevTurn === 0 ? 1 : 0));
    }
  };

  useEffect(() => {
    if (reset) {
      setData(Array(9).fill(""));
      setTurn(0);
      setWinner("");
      setReset(false);
    }
  }, [reset, setReset, setWinner]);

  useEffect(() => {
    const checkRow = () => {
      for (let i = 0; i < 9; i += 3) {
        if (data[i] === data[i + 1] && data[i] === data[i + 2] && data[i] !== "") {
          return true;
        }
      }
      return false;
    };

    const checkCol = () => {
      for (let i = 0; i < 3; i++) {
        if (data[i] === data[i + 3] && data[i] === data[i + 6] && data[i] !== "") {
          return true;
        }
      }
      return false;
    };

    const checkDiagonal = () => {
      return (
        (data[0] === data[4] && data[0] === data[8] && data[0] !== "") ||
        (data[2] === data[4] && data[2] === data[6] && data[2] !== "")
      );
    };

    const checkWin = () => {
      return checkRow() || checkCol() || checkDiagonal();
    };

    const checkTie = () => {
      return data.every((cell) => cell !== "") && !checkWin();
    };

    if (checkWin()) {
      setWinner(turn === 0 ? "Player 2 Wins!" : "Player 1 Wins!");
    } else if (checkTie()) {
      setWinner("It's a Tie!");
    }
  }, [data, turn, setWinner]);

  return (
    <div ref={boardRef} className="board">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
        <Square key={index} value={data[index - 1]} onClick={() => draw(index)} />
      ))}
    </div>
  );
};

export default Board;
