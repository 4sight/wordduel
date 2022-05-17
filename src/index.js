import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
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

Object.keys(allLetters).forEach(letter => {
  for (let i = 0; i < allLetters[letter]['tiles']; i += 1){
    tiles.push({'letter': letter, 'points': allLetters[letter]['points']});
  }
});

var playersTiles = [];

for (let i = 0; i < 7; i++){
  let tilePicker = Math.round(Math.random() * (tiles.length - 1));
  playersTiles.push(tiles[tilePicker]);
  playersTiles[i].index = i;
  tiles.splice(tilePicker, 1);
}

console.log(playersTiles);

class Square extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dragOver: false,
      drop:     null
    };
    this.handleDragOver = this.handleDragOver.bind(this);
    this.drop = this.drop.bind(this);
  }

  handleDragOver(e){
    this.setState({
      dragOver: !this.state.dragOver
    });
    console.log('dragover');
  }

  handleDragOverCursor(e){
    e.preventDefault();
  }

  drop(e){
    this.setState({
      dragOver: !this.state.dragOver
    });
    e.preventDefault();
  }

  render(){
    return(
      <button
        className = {(() => {
          if (this.state.dragOver)
            { return this.props.className + ' hover' } else {
              if (this.state.drop)
                { return 'dropped' } else {
              return this.props.className }}})()}
        onDrop =        {this.drop}
        onMouseUp =     {this.drop}
        onDragEnter =   {this.handleDragOver}
        onDragOver =    {this.handleDragOverCursor}
        onDragLeave =   {this.handleDragOver}
      >
        {(() => {if (this.state.drop) { return <div>{this.state.drop}</div> } else {
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
          }}
        })()
      }
      </button>
    )
  }
}

class Tile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      relX: 0,
      relY: 0,
      x: props.x,
      y: props.y,
      currentDroppable: null,
      elemBelow: null,
      droppableBelow: null
    };
    this.gridX = props.gridX || 1;
    this.gridY = props.gridY || 1;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  static propTypes = {
    onMove: PropTypes.func,
    onStop: PropTypes.func,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    gridX: PropTypes.number,
    gridY: PropTypes.number
  }; 
  onStart(e){
    // e.dataTransfer.setData('letter', e.target.firstChild.textContent);
    console.log(e.target.dataset.id);
    const ref = ReactDOM.findDOMNode(this.handle);
    const body = document.body;
    const box = ref.getBoundingClientRect();
    this.setState({
        relX: e.pageX - (box.left + body.scrollLeft - body.clientLeft),
        relY: e.pageY - (box.top + body.scrollTop - body.clientTop)
    });
    e.preventDefault();
  }
  onMove(e){
    const x = Math.trunc((e.pageX - this.state.relX) / this.gridX) * this.gridX;
    const y = Math.trunc((e.pageY - this.state.relY) / this.gridY) * this.gridY;
    if (x !== this.state.x || y !== this.state.y){
        this.setState({
            x,
            y
        });
        this.props.onMove && this.props.onMove(this.state.x, this.state.y);
    }
  }
  onMouseDown(e){
    if (e.button !== 0) return;
    this.onStart(e);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }
  onMouseUp(e){
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.props.onStop && this.props.onStop(this.state.x, this.state.y);
    e.preventDefault();
    e.target.style.display = 'none';
    this.state.elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    console.log(this.state.elemBelow);
    if (this.state.elemBelow.className !== "game" || this.state.elemBelow.className !== "game"){
      console.log('on board');
      this.state.elemBelow.innerText = e.target.innerText;
    } else {
      e.target.style.display = 'initial';
    }
  }
  onMouseMove(e){
    this.onMove(e);
    e.preventDefault();
  }
  onTouchStart(e){
    this.onStart(e.touches[0]);
    document.addEventListener('touchmove', this.onTouchMove, {passive: false});
    document.addEventListener('touchend', this.onTouchEnd, {passive: false});
    e.preventDefault();
  }
  onTouchMove(e){
    this.onMove(e.touches[0]);
    e.preventDefault();
  }
  onTouchEnd(e){
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
    this.props.onStop && this.props.onStop(this.state.x, this.state.y);
    e.preventDefault();
  }

  render(){
    return(
      <button
      onMouseDown = {this.onMouseDown}
      onTouchStart = {this.onTouchStart}
      onDragStart = {this.onStart}
      draggable
      className = 'tile'
      data-id = {this.props.dataId}
      style = {{
        position: 'absolute',
        left: this.state.x,
        top: this.state.y,
        touchAction: 'none'
      }}
      ref={(div) => { this.handle = div; }}
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
        return <Tile
          key = {tile['index']}
          dataId = {tile['index']}
          letter = {tile['letter']}
          points = {tile['points']}
          x = {tile['index'] * 50 + 10}
          y = {320}
        />
      })
    )
  }
}

const board = [
  'TW', 'normal', 'normal', 'DL', 'normal', 'normal', 'normal', 'TW', 'normal', 'normal', 'normal', 'DL', 'normal', 'normal', 'TW',
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