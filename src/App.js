import React, { Component } from "react";
import './App.css';


class App extends Component {
  
  state = {
    inputNumber: '',
    outputs : []
  }

  init = () => {
    let userInputtedNumber = parseInt(document.getElementById("inputNumber").value);
    this.setState({ 
      inputNumber: userInputtedNumber,
      outputs: [userInputtedNumber]
    }, () => {
      this.main();
    });
  }


  main = () => {
    console.log(this.state.outputs);
    if (this.state.inputNumber === 1) {
      this.state.outputs.push(1);
      return
    }
    if (this.state.inputNumber % 2 > 0) {
      //Odd Number
      this.setState({
        inputNumber: (this.state.inputNumber * 3 + 1),
      }, () => {
        this.state.outputs.push(this.state.inputNumber);
        this.main();
      });
    }
    if (this.state.inputNumber % 2 === 0) {
      //Even Number
      this.setState({
        inputNumber: (this.state.inputNumber / 2),
      }, () => {
        this.state.outputs.push(this.state.inputNumber);
        this.main();
      });
    }
  }


  render() {
    return (
      <div className="App">
        <input id="inputNumber"></input>
        <button onClick={this.init}>Do Math</button> <br></br>
        {this.state.inputNumber} <br></br>
        {this.state.output}
      </div>
    );
  }

}
export default App;
