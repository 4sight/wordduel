import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

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
let index = 0;

Object.keys(allLetters).forEach(letter => {
  for (let i = 0; i < allLetters[letter]['tiles']; i += 1){
    tiles.push({'letter': letter, 'points': allLetters[letter]['points'], 'index': index});
    index++;
  }
});

var playersTiles = [];
for (let i = 0; i < 7; i++){
  let tilePicker = Math.round(Math.random() * (tiles.length - 1));
  playersTiles.push(tiles[tilePicker]);
  tiles.splice(tilePicker, 1);
}

console.log(playersTiles);

class Square extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dragOver: false
    };
    this.handleDragOver = this.handleDragOver.bind(this);
    this.drop = this.drop.bind(this);
  }

  handleDragStart(e){
    e.dataTransfer.setData('drag-item', this.props.dataItem);
  }

  handleDragOver(e){
    this.setState({
      dragOver: !this.state.dragOver
    });
  }

  handleDragOverCursor(e){
    e.preventDefault();
  }

  drop(e){
    this.setState({
      dragOver: !this.state.dragOver
    });
    const droppedItem = e.dataTransfer.getData('letter');
    if (droppedItem){
      this.props.onItemDropped(droppedItem);
    }
  }

  render(){
    return(
      <button
        className =     {this.state.dragOver ? this.props.className + ' hover' : this.props.className}
        onDrop =        {this.drop}
        onDragStart =   {this.handleDragStart}
        onDragEnter =   {this.handleDragOver}
        onDragOver =    {this.handleDragOverCursor}
        onDragLeave =   {this.handleDragOver}
        onItemDropped = {this.itemDropped}
      >
        {(() => {
          switch (this.props.className){
            case 'first':
              return <div>★</div>
            case 'TW':
              return <div>3W</div>
            case 'DW':
              return <div>2W</div>
            case 'TL':
              return <div>3L</div>
            case 'DL':
              return <div>2L</div>
            default:
              return <div></div>
          }
        })()
      }
      </button> 
    )
  }
}

class Tile extends React.Component {
  handleDragStart(e, index){
    e.dataTransfer.setData('drag-item', this.props.letter);
  }

  handleDragEnd(e, index){
    this.style.opacity = '1';
  }

  render(){
    return(
      <button
      className = 'tile'
      draggable
      onDragStart = {this.handleDragStart}
      >
        {this.props.letter}
      {(() => {
        if (this.props.points === 0){
          return(
            <div className = 'points'>‏‏‎ ‎</div>
          )
        } else {
          return (
            <div className = 'points'>{this.props.points}</div>
          )
        }
      })()}
      </button>
    );
  }
}

class Rack extends React.Component {
  render(){
    return(
      playersTiles.map(function(tile){
        return <Tile key = {tile['index']} letter = {tile['letter']} points = {tile['points']}/>
      })
    )
  }
}

const board = ['TW', 'normal', 'normal', 'DL', 'normal', 'normal', 'normal', 'TW', 'normal', 'normal', 'normal', 'DL', 'normal', 'normal', 'TW',
  'normal', 'DW', 'normal', 'normal', 'normal', 'TL', 'normal', 'normal', 'normal', 'TL', 'normal', 'normal', 'normal', 'DW', 'normal',
  'normal', 'normal', 'DW', 'normal', 'normal', 'normal', 'DL', 'normal', 'DL', 'normal', 'normal', 'normal', 'DW', 'normal', 'normal',
  'DL', 'normal', 'normal', 'DW', 'normal', 'normal', 'normal', 'DL', 'normal', 'normal', 'normal', 'DW', 'normal', 'normal', 'DL',
  'normal', 'normal', 'normal', 'normal', 'DW', 'normal', 'normal', 'normal', 'normal', 'normal', 'DW', 'normal', 'normal', 'normal', 'normal',
  'normal', 'TL', 'normal', 'normal', 'normal', 'TL', 'normal', 'normal', 'normal', 'TL', 'normal', 'normal', 'normal', 'TL', 'normal',
  'normal', 'normal', 'DL', 'normal', 'normal', 'normal', 'DL', 'normal', 'DL', 'normal', 'normal', 'normal', 'DL', 'normal', 'normal',
  'TW', 'normal', 'normal', 'DL', 'normal', 'normal', 'normal', 'first', 'normal', 'normal', 'normal', 'DL', 'normal', 'normal', 'TW',
  'normal', 'normal', 'DL', 'normal', 'normal', 'normal', 'DL', 'normal', 'DL', 'normal', 'normal', 'normal', 'DL', 'normal', 'normal',
  'normal', 'TL', 'normal', 'normal', 'normal', 'TL', 'normal', 'normal', 'normal', 'TL', 'normal', 'normal', 'normal', 'TL', 'normal',
  'normal', 'normal', 'normal', 'normal', 'DW', 'normal', 'normal', 'normal', 'normal', 'normal', 'DW', 'normal', 'normal', 'normal', 'normal',
  'DL', 'normal', 'normal', 'DW', 'normal', 'normal', 'normal', 'DL', 'normal', 'normal', 'normal', 'DW', 'normal', 'normal', 'DL',
  'normal', 'normal', 'DW', 'normal', 'normal', 'normal', 'DL', 'normal', 'DL', 'normal', 'normal', 'normal', 'DW', 'normal', 'normal',
  'normal', 'DW', 'normal', 'normal', 'normal', 'TL', 'normal', 'normal', 'normal', 'TL', 'normal', 'normal', 'normal', 'DW', 'normal',
  'TW', 'normal', 'normal', 'DL', 'normal', 'normal', 'normal', 'TW', 'normal', 'normal', 'normal', 'DL', 'normal', 'normal', 'TW',];

class Board extends React.Component {
  handleDrop(e, index, targetName){
    let target = this.state[targetName];
    if (target[index]) return;
  }

  render(){
    return(
      board.map(function(square, index){
        return <Square key = {index} className = {square}
        onDrop = {(e) => this.handleDrop(e, index)}
        />
      })
    )    
  }
}

class Game extends React.Component {
  state = {
    player1points: 0,
    player2points: 0,
    lastPriority: 1
  };

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