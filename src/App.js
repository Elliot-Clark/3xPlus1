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
      //When the sequence eventually reduces down to 1, the recursive process ends.
      //In the event you discover a number that doesn't reduce down to the 4,2,1 loop, contact your local mathematician. They should be very interested to hear about it.
      this.state.outputs.push(1);
      return
    }
    if (this.state.outputs.length > 25) {
      //While not infinite, some numbers can have a sequence far to long to display so we limit it to 25 before ending.
      (console.log("Sequence to long"));
      return
    }
    if (this.state.inputNumber % 2 > 0) {
      //Odd Number. Divide the number by 2 and run method again.
      this.setState({
        inputNumber: (this.state.inputNumber * 3 + 1),
      }, () => {
        this.state.outputs.push(this.state.inputNumber);
        this.main();
      });
    }
    if (this.state.inputNumber % 2 === 0) {
      //Even Number. Multiply the number by 3 and add 1 then run method again.
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
