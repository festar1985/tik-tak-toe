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

const Reset = (props) => {
  return (
    <button className="button" onClick={()=>props.onReset()}>
      Reset Game
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

  const [ gameHistory, setGameHistory ] = useState([Array( 9 ).fill( null )]);
  const [ gameState, setGameState ] = useState( Array( 9 ).fill( null ) );
  const [ turnXState, setTurnXState ] = useState( true );
  const [ currentMove, setCurrentMove ] = useState( 0 );
  const [ winnerState, setWinnerState ] = useState( false );
  
  if ( !winnerState ) { calculateWinner( gameState, setWinnerState ) }
  
  let status

  if ( winnerState ) {
    status = "The winner is: " + winnerState;
  } else if ( currentMove === 9 ) {
    status = " It is a tie no one wins"
  }else {
    status = "Next player: " + ( turnXState ? "X" : "O" );
  }
  
  
  
  const handleClick = ( clickLocation ) => {
    if ( gameState[ clickLocation ] !== null || winnerState !==false) {
      return
    }
    const squaresArray = gameState.slice()
    const tempHistoryArray = gameHistory.slice()
    squaresArray[ clickLocation ] = turnXState ? "X" : "O"
    setGameState( squaresArray )
    tempHistoryArray.push( squaresArray )
    setGameHistory( tempHistoryArray )
    setTurnXState( !turnXState )
    setCurrentMove(currentMove+1)
  }


  const resetGame = () => {
    setGameState( Array( 9 ).fill( null ) )
    setGameHistory( [ Array( 9 ).fill( null ) ] )
    setCurrentMove(0)
    setTurnXState( true )
    setWinnerState(false)
  }

  const moves = gameHistory.map( ( move, moveIndex ) => {
    
    const description = "Go to move N:" +moveIndex

    if ( moveIndex === 0 ) {
        return null
    }
    else return (
      <li key={ moveIndex }>
        <button className="button" onClick={() => jumpTo(moveIndex)} >{description}</button>
      </li>
    )

    })
  
  const jumpTo = (index) => {
    setCurrentMove( index )
    setTurnXState( ( index % 2 ? false : true ) )
    setGameHistory( gameHistory.slice( 0, index + 1 ) )
    setGameState( gameHistory[ index ] )
    setWinnerState(false)
  }

  return (
      <div className="game">
        <div className="game-board">
        <Board gameState={ gameState } handleClick={handleClick} />
        </div>
        <div className="game-info">
        <div>{ status }</div>
          <p>Return to a previous move:</p>
        <ol>{moves}</ol>
        <Reset onReset={resetGame}/>
        </div>
      </div>
    );
  }


// ========================================


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1 className="header">Tic-Tac-Toe</h1>
    <Game />
  </React.StrictMode>
);

function calculateWinner(squares,setWinnerState) {
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
    if ( squares[ a ] && squares[ a ] === squares[ b ] && squares[ a ] === squares[ c ] ) {
      setWinnerState(squares[a])
      return ;
    }
  }
  return null;
}
