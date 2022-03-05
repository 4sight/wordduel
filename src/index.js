import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const allLetters = {
  'A': { 'points':  1, 'tiles':  9 },
  'B': { 'points':  3, 'tiles':  2 },
  'C': { 'points':  3, 'tiles':  2 },
  'D': { 'points':  2, 'tiles':  4 },
  'E': { 'points':  1, 'tiles': 12 },
  'F': { 'points':  4, 'tiles':  2 },
  'G': { 'points':  2, 'tiles':  3 },
  'H': { 'points':  4, 'tiles':  2 },
  'I': { 'points':  1, 'tiles':  9 },
  'J': { 'points':  8, 'tiles':  1 },
  'K': { 'points':  5, 'tiles':  1 },
  'L': { 'points':  1, 'tiles':  4 },
  'M': { 'points':  3, 'tiles':  2 },
  'N': { 'points':  1, 'tiles':  6 },
  'O': { 'points':  1, 'tiles':  8 },
  'P': { 'points':  3, 'tiles':  2 },
  'Q': { 'points': 10, 'tiles':  1 },
  'R': { 'points':  1, 'tiles':  6 },
  'S': { 'points':  1, 'tiles':  4 },
  'T': { 'points':  1, 'tiles':  6 },
  'U': { 'points':  1, 'tiles':  4 },
  'V': { 'points':  4, 'tiles':  2 },
  'W': { 'points':  4, 'tiles':  2 },
  'X': { 'points':  8, 'tiles':  1 },
  'Y': { 'points':  4, 'tiles':  2 },
  'Z': { 'points': 10, 'tiles':  1 },
  '‏‏‎ ‎': { 'points': 0, 'tiles': 2 }
}

let tiles = [];

Object.keys(allLetters).forEach(letter => {
  for (let i = 0; i < allLetters[letter]['tiles']; i += 1){
    tiles.push({'letter': letter, 'points': allLetters[letter]['points']});
  }
});

var playersTiles = [];
for (let i = 0; i < 7; i++){
  let tileIndex = Math.round(Math.random() * (tiles.length - 1));
  playersTiles.push(tiles[tileIndex]);
  tiles.splice(tileIndex, 1);
}

console.log(playersTiles);

class Square extends React.Component {
  render(){
    return(
      <button className = 'square'></button>
    );
  }
}

class Tile extends React.Component {
  render(){
    return(
      <button className='tile'>
        {this.props.letter}
        <div className = 'points'>{this.props.points}</div>
      </button>
    );
  }
}

class Rack extends React.Component {
  render(){
    return(
      playersTiles.map(function(tile, index){
        return <Tile key = {index} letter = {tile['letter']} points = {tile['points']}/>
      })
    )
  }
}

const board = ['3W', 'normal', 'normal', '2L', 'normal', 'normal', 'normal', '3W', 'normal', 'normal', 'normal', '2L', 'normal', 'normal', '3W', 'normal', '2W', 'normal', 'normal', 'normal', '3L', 'normal', 'normal', 'normal', '3L', 'normal', 'normal', 'normal', '2W', 'normal', 'normal', 'normal', '2W', 'normal', 'normal', 'normal', '2L', 'normal', '2L', 'normal', 'normal', 'normal', '2W', 'normal', 'normal', '2L', 'normal', 'normal', '2W', 'normal', 'normal', 'normal', '2L', 'normal', 'normal', 'normal', '2W', 'normal', 'normal', '2L', 'normal', 'normal', 'normal', 'normal', '2W', 'normal', 'normal', 'normal', 'normal', 'normal', '2W', 'normal', 'normal', 'normal', 'normal', 'normal', '3L', 'normal', 'normal', 'normal', '3L','normal', 'normal', 'normal', '3L', 'normal', 'normal', 'normal', '3L', 'normal', 'normal', 'normal', '2L','normal', 'normal', 'normal', '2L','normal', '2L','normal', 'normal', 'normal', '2L','normal', 'normal', '3W', 'normal', 'normal', '2L', 'normal', 'normal', 'normal', '2W','normal', 'normal', 'normal', '2L','normal', 'normal', '3W'];

class Board extends React.Component {
  render(){
    return(
      board.map(function(square, index){
        return <Square key = {index} className = {square} />
      })
    );
  }
}

class Game extends React.Component {
  render(){
    return(
      <div className='game'>
        <div className='game-board'>
          <Board />
        </div>
        <div className='rack'>
          <Rack />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);