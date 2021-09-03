import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery'

function Square(props) {
  return (
    <button 
      position={props.position}
      style={props.style}
      className="square" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 5, 
    }
  }

  renderSquare(i) {
    let style = {};
    if (this.props.winner) {
      for (let x = 1; x <= 5; x++) if (i === this.props.winner[x]) style = {"backgroundColor": "cyan"};
    } else if (this.props.historyPos === i) style = {"backgroundColor": "red"};
    return (
      <Square
        position={i}
        style={style}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  
  render() {
    const board_length = this.state.length;
    let rows = [];
    for (let r = 0; r < board_length; r++) {
      let squares = [];
      for (let s = 0; s < board_length; s++) {
        squares.push(<span key={r*board_length + s}>{this.renderSquare(r*board_length + s)}</span>);
      }
      rows.push(<div key={r} className="board-row">
        {squares}
      </div>)
    }
    return (
      <div id="board">
        {rows}
      </div>
    );
  }
}
  
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        move: -1,
      }],
      stepNumber: 0,
      xIsNext: true,
      endgame: false,
    }
    this.check_clicked = false; // determine whether time travel state is selected or not
  }

  changeBtnColor(over, event) {
    if (over) event.target.style.backgroundColor = "cyan";
    else event.target.style.backgroundColor = "rgb(239, 239, 239)";
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.state.endgame || squares[i]) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        move: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext, 
      endgame: (calculateWinner(squares, i) ? true : false),
    });
  }

  jumpTo(step) {
    if (step === this.state.stepNumber) return;
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      endgame: false,
    });
  }

  btnMouseEnter(move, event) {
    if (!this.check_clicked) this.jumpTo(move);
    this.changeBtnColor(true, event);
    let btn = "#move" + move + " button";
    $(btn).on({
      click: () => {
        this.jumpTo(move);
        this.changeBtnColor(false, event);
        this.check_clicked = true;
      }, 
      mouseleave: () => {
        this.changeBtnColor(false, event);
        if (!this.check_clicked) this.jumpTo(this.state.history.length - 1);
      }
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares, current.move);

    let position = -1;
    const move = history.map((step, move) => {
      let desc = "";
      if (move) {
        let player = "";
        for (let a = 0; a < 25; a++) {
          if (history[move].squares[a] !== history[move - 1].squares[a]) {
            player = history[move].squares[a];
            position = a;
            break;
          }
        }
        desc = "Go to move #" + move + ": Player " + player + " moved (" + (Math.floor(position / 5)).toString() + ", " + (position % 5).toString() + ")";
      } else desc = "Go to game start";

      return (
        <div key={move}>
          <li id={"move" + move}>
            <button 
              onMouseEnter={(event) => {
                this.btnMouseEnter(move, event);
              }}
            >{desc}</button>
          </li>
          <br />
        </div>
      );
    });

    let status;
    if (winner) status = 'Winner: ' + winner[0];
    else status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            historyPos={this.state.history[this.state.stepNumber].move} // position played at the move
            winner={winner} // determine squares led to victory
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{move}</ol>
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

function calculateWinner(squares, last_move) {
  const player = squares[last_move];
  if (player == null) return null;
  const [x_pos, y_pos] = [Math.floor(last_move / 5), last_move % 5];
  const unit_move = [
    [-1, 0], // up
    [-1, 1], // up right
    [0, 1], // right
    [1, 1], // down right
  ];
  for (let i = 0; i < unit_move.length; i++) {
    let ret_val = [player, last_move];
    let num_point = 1;
    let d;
    for (d = 1; d <= 5; d++) {
      let [x_dest, y_dest] = [x_pos + unit_move[i][0] * d, y_pos + unit_move[i][1] * d];
      if (x_dest < 0 || x_dest > 5 || y_dest < 0 || y_dest > 5) continue;
      if (squares[x_dest * 5 + y_dest] === player) {
        num_point++;
        ret_val.push(x_dest * 5 + y_dest);
      }
      else break;
    }
    let r;
    for (r = -1; r >= -5; r--) {
      let [x_dest, y_dest] = [x_pos + unit_move[i][0] * r, y_pos + unit_move[i][1] * r];
      if (x_dest < 0 || x_dest > 5 || y_dest < 0 || y_dest > 5) continue;
      if (squares[x_dest * 5 + y_dest] === player) {
        num_point++;
        ret_val.push(x_dest * 5 + y_dest);
      }
      else break;
    }
    if (num_point >= 5) return ret_val;
  }
  return null;
}