import { WINNER_COMBOS } from "../constants";

export const checkWinnerForm = (boardToCheck) => {
    //revisamos todas las opciones ganadoras
    // para ver si x u o gano
    for( const combo of WINNER_COMBOS){
      const [a,b,c] = combo;
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //si no hay ganador
    return null;
  }


  export const checkEndGame = (newBoard) => {
    //revisamos si hay un empate
    // si no hay mas espacios vacios
    // en el tablero
    return newBoard.every((Square) => Square !== null)
  }