import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Container } from 'react-bootstrap';

class Start extends React.Component {
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

export { Start };