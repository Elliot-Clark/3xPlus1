import React, { Component } from "react";
import Canvas from './Canvas'
import './App.css';

// Show inputted number 
// Show highest number
// Show length of sequences
// Button for Random

class App extends Component {
  
  state = {
    inputNumber: '',
    numberCollection : [],
    idle: true,
    aboveMaxLength: false,
    previousNumbers: []
  }

  init = (ele) => {
    let userInputtedNumber;
    if (ele) {
      userInputtedNumber = ele;
    } else {
      userInputtedNumber = parseInt(document.getElementsByClassName("inputNumber")[0].value);
      this.setState({ previousNumbers: [] });
    }
    this.setState({ 
      inputNumber: userInputtedNumber,
      aboveMaxLength: false,
      idle: false
    }, () => {
      this.mainComputation();
    });
  }

  mainComputation = () => {
    let count = this.state.inputNumber
    if (count < 1) {
      return
    }
    let outputs = [count]
    const calculate = () => {
      if (count === 1 && outputs.length > 10) {
        //When the sequence eventually reduces down to 1, the recursive process ends.
        //In the event you discover a number that doesn't reduce down to the 4,2,1 loop, contact your local mathematician. They should be very interested to hear about it.
        return
      }
      //While not infinite, some numbers can have a sequence far to long to display so we limit the sequence
      //This is done by condensing the array of all numbers into a single number then count how many digits are in it. No more than 100 on screen at a time.
      //This also helps fit displays where the user enters huge numbers 
      if (outputs.join().replace(/,/g, '').split('').length > 100) {
        this.setState({ aboveMaxLength: true});
        return
      }
      if (count % 2 > 0) {
        //Odd Number. Multiply the number by 3 and add 1 then run method again.
        count = count * 3 + 1;
        outputs.push(count);
          calculate();
      }
      if (count % 2 === 0) {
        //Even Number. Divide the number by 2 and run method again.
        count = count / 2;
        outputs.push(count);
        calculate();
      }
    }
    calculate();
    this.setState({numberCollection: outputs});
  }

  nextButton = () => {
    this.state.previousNumbers.push(this.state.numberCollection[0]);
    this.setState({
      inputNumber: this.state.numberCollection[this.state.numberCollection.length - 1],
    }, () => {
      this.init(this.state.inputNumber);
    });

  }

  backButton = () => {
    this.setState({
      numberCollection: []
    }, () => {
      this.init(this.state.previousNumbers[this.state.previousNumbers.length - 1]);
      this.state.previousNumbers.pop();
    });
  }

  componentDidMount() {
    const runStart = () => {
      this.init();
    }
    document.getElementsByClassName('inputNumber')[0].addEventListener("keyup",function(e){
      if (e.keyCode === 13) {
        runStart();
        document.getElementsByClassName('inputNumber')[0].value = '';
      }
    });

    // setInterval(() =>{
    //   if (this.state.idle) {
    //     let randomNumber = Math.floor(Math.random() * 999 + 10);
    //   this.setState({ 
    //     inputNumber: randomNumber,
    //   }, () => {
    //     this.mainComputation();
    //   });
    //   }
    // }, 
    //   4000
    // );
  }

  render() {

    return (
      <div className="App">

        <div id="sidebar">
          <div id="logo">3x + 1</div>
          <div id="stats"></div>
            
        </div>
        <div id="rightWrapper">
          <div id="inputWrapper">
            <input className="inputNumber" title="Input any positive integer and press Enter to run" placeholder="Enter..."></input>
          </div>
          <div id="graphWrapper">
            <div id="forwardBack">
              <span>
            {this.state.previousNumbers.length ? (
                <button id="back" onClick={this.backButton}> &#60; </button>
              ) : ('')}
              </span>
              <span>
              {this.state.aboveMaxLength ? (
                <button id="forward" onClick={this.nextButton}> &#62; </button>
              ) : ('')}
              </span>

            </div>
            <Canvas 
              numberCollection = {this.state.numberCollection}
            />
          </div>
          <div id="infoText">
            <p>The Collatz conjecture is a conjecture in mathematics that concerns sequences defined as follows: start with any positive integer <i>n</i>. Then each term is obtained from the previous term as follows: if the previous term is even, the next term is one half of the previous term. If the previous term is odd, the next term is 3 times the previous term plus 1. The conjecture is that no matter what value of n, the sequence will always reach 1.</p>
          </div>
        </div>

        
      </div>
    );
  }

}
export default App;
