import confetti from 'canvas-confetti'
import {Square} from'./components/Square.jsx' 
import { TURNS } from './constants.js';
import { checkWinnerForm, checkEndGame} from './logic/board.js';
import{WinnerModal} from './components/WinnerModal.jsx'
import { useState } from 'react';
import './index.css'

function App() {
  //el estado inicial 
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  } );
  const [turn, setTurn] = useState( ()=> {
    const turnFromStorage = window.localStorage.getItem('turn');
    // console.log(turnFromStorage);
    return turnFromStorage ?? TURNS.X ;
  });

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }
  
  const updateBoard = (index) => {
    //no actualizamos estapocision si ya hay algo 
    // console.log(index);
    if(board[index] || winner) return
    // actualizar el tablero
    console.log(...board);
    const newBoard = [...board];
     console.log(newBoard);
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // guardar aqui partida
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);
    //revisamos si hay un ganador
    const newWinner = checkWinnerForm(newBoard);

    if(newWinner) {
      confetti()
      setWinner(newWinner);
    } else if ( checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <>
    <main className='board'>

   
      <h1>tic tac toe</h1>
      <button onClick={resetGame}>Reset el juego</button>
      <section className='game'>
        {
          board.map((square1, index) => {
            // console.log(square1);
            return (
             
              <Square key={index} 
              index={index}
              updateBoardy={updateBoard}
              > {square1} </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected ={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected = {turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <section className='turnito'>
        <Square isSelected ={turn === TURNS.X}>Jug.1</Square>
        <Square isSelected = {turn === TURNS.O}>jug.2</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
      </main>
    </>
  )
}

export default App
