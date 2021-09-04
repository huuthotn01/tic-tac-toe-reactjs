import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Container } from 'react-bootstrap';

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
      board_length: this.props.boardLength, 
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
    const board_length = this.state.board_length;
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
      board_length: this.props.boardLength,
      stepNumber: 0,
      xIsNext: true,
      endgame: false,
    }
    this.check_clicked = false; // determine whether time travel state is selected or not
  }

  changeBtnColor(over, event) {
    if (over) event.target.variant = "info";
    else event.target.variant = "light";
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
      endgame: (calculateWinner(squares, i, this.state.board_length) ? true : false),
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
    const winner = calculateWinner(current.squares, current.move, this.state.board_length);

    let position = -1;
    const move = history.map((step, move) => {
      let desc = "";
      if (move) {
        let player = "";
        for (let a = 0; a < this.state.board_length * this.state.board_length; a++) {
          if (history[move].squares[a] !== history[move - 1].squares[a]) {
            player = history[move].squares[a];
            position = a;
            break;
          }
        }
        desc = "Go to move #" + move + ": Player " + player 
              + " moved (" + (Math.floor(position / this.state.board_length)).toString() + ", " + (position % this.state.board_length).toString() + ")";
      } else desc = "Go to game start";

      return (
        <div key={move}>
          <li id={"move" + move}>
            <Button 
              variant="outline-success" 
              onMouseEnter={(event) => {
                this.btnMouseEnter(move, event);
              }}
            >{desc}</Button>
          </li>
          <br />
        </div>
      );
    });

    let status;
    if (winner) status = 'Winner: ' + (winner[0] === 'X' ? this.props.xName : this.props.oName);
    else status = 'Next player: ' + (this.state.xIsNext ? this.props.xName + " (plays X)" : this.props.oName + " (plays O)");
    return (
      <Container>
        <div className="game">
          <div className="game-board">
            <Board 
              historyPos={this.state.history[this.state.stepNumber].move} // position played at the move
              winner={winner} // determine squares led to victory
              boardLength={this.state.board_length}
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <Form.Label>{status}</Form.Label>
            <ol>{move}</ol>
          </div>
        </div>
      </Container>
    );
  }
}

// ==================================================================================================

class StartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board_length: 0,
      x_name: "X",
      o_name: "O",
    }
    this.onXChange = this.onXChange.bind(this);
    this.onOChange = this.onOChange.bind(this);
    this.onLengthChange = this.onLengthChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onNameXChange(this.state.x_name);
    this.props.onNameOChange(this.state.o_name);
    this.props.onLengthChange(this.state.board_length);
  }

  onXChange(event) {
    this.setState({
      x_name: event.target.value,
    });
  }

  onOChange(event) {
    this.setState({
      o_name: event.target.value,
    });
  }

  onLengthChange(event) {
    this.setState({
      board_length: event.target.value,
    });
  }

  render() {
    return (
      <Container>
        <Form onSubmit={(event) => this.onSubmit(event)} >
          <Form.Group>
            <Form.Label>Name of player 1 (plays X): </Form.Label>
            <Form.Control type="text" placeholder="X" onChange={this.onXChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name of player 2 (plays O): </Form.Label>
            <Form.Control type="text" placeholder="O" onChange={this.onOChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Length of board: </Form.Label>
            <Form.Control type="number" min="5" onChange={this.onLengthChange} />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board_length: 0,
      x_player: "X",
      o_player: "O",
    };
    this.onLengthChange = this.onLengthChange.bind(this);
    this.onNameXChange = this.onNameXChange.bind(this);
    this.onNameOChange = this.onNameOChange.bind(this);
  }

  onLengthChange(length) {
    if (length < 5) return;
    this.setState({
      board_length: length,
    });
  }

  onNameXChange(x_name) {
    this.setState({
      x_player: x_name,
    });
  }

  onNameOChange(o_name) {
    this.setState({
      o_player: o_name,
    });
  }

  render() {
    if (this.state.board_length === 0) {
      return <StartForm 
        onLengthChange={this.onLengthChange}
        onNameXChange={this.onNameXChange}
        onNameOChange={this.onNameOChange}
      />
    } else {
      return <Game 
        boardLength={this.state.board_length}
        xName={this.state.x_player}
        oName={this.state.o_player}
      />
    }
  }
}
  
// ===============================================================================================
  
ReactDOM.render(
  <HomePage />,
  document.getElementById('root')
);  

// ===============================================================================================

function calculateWinner(squares, last_move, board_length) {
  /* TODO */
  /* 
    Assume the board is a Oxy coordinate, the most up-left square is the root
    From the root, down to the most down-left square is Ox, and to the most up-right square is Oy. Position is displayed as (x_pos, y_pos)
    To determine whether the winner exists, we get the last move from players, because it's the move which leads to victory if winner exists
    There are at most 8 directions to move for each square, and two opposite ones form a pair of direction. We will iterate through each direction pair 
    If the iteration indicates there exists at least five consecutive points of the same player, then that player is the winner 
  */
  const player = squares[last_move];
  if (player == null) return null;
  const [x_pos, y_pos] = [Math.floor(last_move / board_length), last_move % board_length];
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
      if (x_dest < 0 || x_dest > board_length || y_dest < 0 || y_dest > board_length) continue;
      if (squares[x_dest * board_length + y_dest] === player) {
        num_point++;
        ret_val.push(x_dest * board_length + y_dest);
      }
      else break;
    }
    let r;
    for (r = -1; r >= -5; r--) {
      let [x_dest, y_dest] = [x_pos + unit_move[i][0] * r, y_pos + unit_move[i][1] * r];
      if (x_dest < 0 || x_dest > board_length || y_dest < 0 || y_dest > board_length) continue;
      if (squares[x_dest * board_length + y_dest] === player) {
        num_point++;
        ret_val.push(x_dest * board_length + y_dest);
      }
      else break;
    }
    if (num_point >= 5) return ret_val;
  }
  return null;
}