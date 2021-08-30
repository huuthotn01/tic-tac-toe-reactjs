import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery'

function Square(props) {
  return (
    <button 
      style={props.style}
      className="square" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {
  renderSquare(i) {
    let style = {};
    if (this.props.winner) {
      for (let x = 1; x < 4; x++) if (i === this.props.winner[x]) style = {"backgroundColor": "cyan"};
    } else if (this.props.historyPos === i) style = {"backgroundColor": "red"};
    return (
      <Square 
        style={style}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
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
    }
  }

  changeBtnColor(over, event) {
    if (over) event.target.style.backgroundColor = "cyan";
    else event.target.style.backgroundColor = "rgb(239, 239, 239)";
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        move: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext, 
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let position = -1;
    const move = history.map((step, move) => {
      let desc = "";
      if (move) {
        let player = "";
        for (let a = 0; a < 9; a++) {
          if (history[move].squares[a] !== history[move - 1].squares[a]) {
            player = history[move].squares[a];
            position = a;
            break;
          }
        }
        desc = "Go to move #" + move + ": Player " + player + " moved (" + (Math.floor(position / 3)).toString() + ", " + (position % 3).toString() + ")";
      } else desc = "Go to game start";
      return (
        <div>
          <li id={"move" + move} key={move}>
            <button 
              onMouseEnter={(event) => {
                this.jumpTo(move);
                this.changeBtnColor(true, event);
                let btn = "#move" + move + ":first-child";
                let check_clicked = false;
                $(btn).on({
                  click: () => {
                    this.changeBtnColor(false, event);
                    check_clicked = true;
                  }, 
                  mouseleave: () => {
                    this.changeBtnColor(false, event);
                    if (!check_clicked) this.jumpTo(this.state.history.length - 1);
                  }
                });
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b, c];
    }
  }
  return null;
}