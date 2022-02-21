import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var letters = [];
for (let i = 0; i < 9; i++){
  letters.push({'A': 1})
}
for (let i = 0; i < 2; i++){
  letters.push({'B': 3})
}
for (let i = 0; i < 2; i++){
  letters.push({'C': 3})
}
for (let i = 0; i < 4; i++){
  letters.push({'D': 2})
}
for (let i = 0; i < 12; i++){
  letters.push({'E': 1})
}
for (let i = 0; i < 2; i++){
  letters.push({'F': 4})
}
for (let i = 0; i < 3; i++){
  letters.push({'G': 2})
}
for (let i = 0; i < 2; i++){
  letters.push({'H': 4})
}
for (let i = 0; i < 9; i++){
  letters.push({'I': 1})
}
letters.push({'J': 8});
letters.push({'K': 5});
for (let i = 0; i < 4; i++){
  letters.push({'L': 1})
}
for (let i = 0; i < 2; i++){
  letters.push({'M': 3})
}
for (let i = 0; i < 6; i++){
  letters.push({'N': 1})
}
for (let i = 0; i < 8; i++){
  letters.push({'O': 1})
}
for (let i = 0; i < 2; i++){
  letters.push({'P': 3})
}
letters.push({'Q': 10});
for (let i = 0; i < 6; i++){
  letters.push({'R': 1})
}
for (let i = 0; i < 4; i++){
  letters.push({'S': 1})
}
for (let i = 0; i < 6; i++){
  letters.push({'T': 1})
}
for (let i = 0; i < 4; i++){
  letters.push({'U': 1})
}
for (let i = 0; i < 2; i++){
  letters.push({'V': 4})
}
for (let i = 0; i < 2; i++){
  letters.push({'W': 4})
}
letters.push({'X': 8});
for (let i = 0; i < 2; i++){
  letters.push({'Y': 4})
}
letters.push({'Z': 10});
for (let i = 0; i < 2; i++){
  letters.push({' ': 0})
}

var player1letters = [];
for (let i = 0; i < 7; i++){
  let letterIndex = Math.round(Math.random() * letters.length);
  player1letters.push(letters[letterIndex]);
  letters.splice(letterIndex, 1);
}

console.log(letters);

class Square extends React.Component {
  render(){
    return(
      <button className='square'></button>
    );
  }
}

class TileSlot extends React.Component {
  render(){
    return(
      <div className = 'tile-slot'></div>
      )
  }
}

class Tile extends React.Component {
  render(){
    return(
      <div className = 'tile' draggable = 'true'>
        <div className = 'tile-letter'>{Object.keys(letters[0])[0]}</div>
        <div className = 'tile-points'>{letters[0].A}</div>
      </div>
      )
  }
}

class Rack extends React.Component {
  renderTileSlot(){
    return <TileSlot />;
  }

  render(){
    return(
      <div>
        {this.renderTileSlot()}
        {this.renderTileSlot()}
        {this.renderTileSlot()}
        {this.renderTileSlot()}
        {this.renderTileSlot()}
        {this.renderTileSlot()}
        {this.renderTileSlot()}
        {this.renderTileSlot()}
      </div>
      );
  }
}

class Board extends React.Component {
  renderSquare(){
    return <Square />;
  }

  render(){
    const status = 'Next player: X';

    return(
      <div>
        <div className='status'>{status}</div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className='board-row'>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
      </div>
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
          <Tile />
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