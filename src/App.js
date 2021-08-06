import React, { Component } from "react";
import './App.css';


class App extends Component {
  
  state = {
    inputNumber: '',
    numberCollection : []
  }

  init = () => {
    let userInputtedNumber = parseInt(document.getElementById("inputNumber").value);
    this.setState({ 
      inputNumber: userInputtedNumber,
      numberCollection: [userInputtedNumber]
    }, () => {
      this.mainComputation();
    });
  }

  mainComputation = () => {
    let count = this.state.inputNumber
    let outputs = []
    const calculate = () => {
      if (count === 1) {
        //When the sequence eventually reduces down to 1, the recursive process ends.
        //In the event you discover a number that doesn't reduce down to the 4,2,1 loop, contact your local mathematician. They should be very interested to hear about it.
        return
      }
      //While not infinite, some numbers can have a sequence far to long to display so we limit it to 25 before ending.
      if (count % 2 > 0 && outputs.length < 25) {
        //Odd Number. Multiply the number by 3 and add 1 then run method again.
        count = count * 3 + 1;
        outputs.push(count);
          calculate();
      }
      if (count % 2 === 0 && outputs.length < 25) {
        //Even Number. Divide the number by 2 and run method again.
        count = count / 2;
        outputs.push(count);
        calculate();
      }
    }
    calculate();
    this.setState({numberCollection: outputs}, () => {
      console.log(this.state.numberCollection);
    });
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
