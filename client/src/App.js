import React, { Component} from 'react';
import { HomePage } from './HomePage.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOK: false,
    };
  }

  componentDidMount() {
    this.callBackendAPI()
        .then(res => this.setState({isOK: res.check_status}))
        .catch(err => console.log(err)); 
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error("Error");
    }
    return body;
  };

  render() {
    if (this.state.isOK) {
      return (
        <HomePage />
      );
    } else {
      return (
        <h1>Error occurred, try again!</h1>
      );
    }
  }
}

export default App;
