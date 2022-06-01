import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = (props) => {
    return (
      <button className="square" onClick={()=>props.onClick()}>
        { props.value }
      </button>
    );
  }


const Board = (props) => {
  
  
      return (
      <div>
        <div className="status"></div>
        <div className="board-row">
          <Square value={ props.gameState[0] } onClick= {()=> props.handleClick(0)}/>
          <Square value={ props.gameState[1] } onClick= {()=> props.handleClick(1)}/>
          <Square value={ props.gameState[2] } onClick= {()=> props.handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={ props.gameState[3] } onClick= {()=> props.handleClick(3)}/>
          <Square value={ props.gameState[4] } onClick= {()=> props.handleClick(4)}/>
          <Square value={ props.gameState[5] } onClick= {()=> props.handleClick(5)}/>
        </div>
        <div className="board-row">
          <Square value={ props.gameState[6] } onClick= {()=> props.handleClick(6)}/>
          <Square value={ props.gameState[7] } onClick= {()=> props.handleClick(7)}/>
          <Square value={ props.gameState[8] } onClick= {()=> props.handleClick(8)}/>
        </div>
      </div>
    );
  }


const Game = () => {

  const [gameHistory, SetGameHistory] = useState( Array( 9 ).fill( null ) )
  const [ gameState, setGameState ] = useState( Array( 9 ).fill( null ) );
  const [ turnXState, setTurnXState ] = useState( true );
  
  const winner = calculateWinner( gameState )
  let status
  if ( winner ) {
    status = "The winner is: " + winner;
  } else {
    status = "Next player: " + ( turnXState ? "X" : "O" );
  }
  
  
  
  const handleClick = ( clickLocation ) => {
    const squaresArray = gameState.slice()
    squaresArray[ clickLocation ] = turnXState ? "X" : "O"
    setGameState( squaresArray )
    setTurnXState( !turnXState )
  }
  return (
      <div className="game">
        <div className="game-board">
        <Board gameState={ gameState } handleClick={handleClick} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }


// ========================================


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
