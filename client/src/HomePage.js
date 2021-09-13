import React from 'react';
import { Start } from './Start.js';
import { Game } from './Game.js';

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
      return <Start 
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

export { HomePage };