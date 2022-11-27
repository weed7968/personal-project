import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();

  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [7, 8, 9],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagnol: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        }
      });
    }
  };

  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("이미 클릭함");
      return;
    }

    let squares = [...cells];

    if (turn === "X") {
      squares[num] = "X";
      setTurn("O");
    } else {
      squares[num] = "O";
      setTurn("X");
    }

    checkForWinner(squares);
    setCells(squares);
  };

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  return (
    <div className="container">
      <table>
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
        Turn: {turn}
      </table>
      {winner && (
        <>
          <p>{winner} 이 승리하였습니다!</p>
          <button
            onClick={() => {
              handleRestart();
            }}
          >
            다시하기
          </button>
        </>
      )}
    </div>
  );
};

export default TicTacToe;
