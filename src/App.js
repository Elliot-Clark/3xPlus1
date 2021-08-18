import React, { Component } from "react";
import Canvas from './Canvas'
import './App.css';

// Show inputted number 
// Show highest number
// Show length of sequences
// Button for Random

class App extends Component {
  
  //inputNumber is the starting number for all graphing sequences. Not always the number the user input. If the 'forward' button is clicked, this will be the first number in the new sequence
  //previousNumbers is a list of previous inputNumbers so the app can recall them when the user returns to previous numbers in a sequence above Max Length.
  //numberCollection is the calculated list of all numbers set to be graphed, in the order they appear on screen.
  //aboveMaxLength is turned true if there are more than 100 seperate digits on the graph at one time. Prevents overcrowding the screen, and signals for further calculations to be done to finish the sequence. Enables the forward button to see them.
  //initialInputNumber is the number the user input for display purposes. Will not change until another is input by user.
  //highestNumber is simply the highest number in the entire sequence, not just the display set
  //lengthofSequence is the length of the entire sequence, not just the display set

  state = {
    inputNumber: '',
    previousNumbers: [],
    numberCollection : [],
    aboveMaxLength: false,
    initialInputNumber: '',
    highestNumber: "",
    lengthOfSequence: ""
  }

  init = (ele) => {
    let userInputtedNumber;
    if (ele) {
      userInputtedNumber = ele;
    } else {
      userInputtedNumber = parseInt(document.getElementsByClassName("inputNumber")[0].value);
      this.setState({ 
        previousNumbers: [],
        initialInputNumber: userInputtedNumber,
        highestNumber: "",
        lengthOfSequence: ""
      });
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
        if (this.state.previousNumbers.length === 0) {
          this.setState({ 
            highestNumber: Math.max.apply(Math, outputs),
            lengthOfSequence: outputs.length
          });
        }
        return
      }
      //While not infinite, some numbers can have a sequence far to long to display so we limit the sequence
      //This is done by condensing the array of all numbers into a single number then count how many digits are in it. No more than 100 on screen at a time.
      //This also helps fit displays where the user enters huge numbers 
      if (outputs.join().replace(/,/g, '').split('').length > 100) {
        this.setState({ 
          aboveMaxLength: true
        }, () => {
          if (!this.state.highestNumber) {
            this.secondaryComputation(Math.max.apply(Math, outputs), outputs[outputs.length-1], outputs.length);
          }
        });
        return
      }
      else if (count % 2 > 0) {
        //Odd Number. Multiply the number by 3 and add 1 then run method again.
        count = count * 3 + 1;
        outputs.push(count);
          calculate();
      }
      else if (count % 2 === 0) {
        //Even Number. Divide the number by 2 and run method again.
        count = count / 2;
        outputs.push(count);
        calculate();
      }
    }
    calculate();
    this.setState({numberCollection: outputs});
  }

  //In the event of a sequence being to long this function finishes the calculation in order to display the largest number in the entire sequence.
  secondaryComputation = (highestSoFar, currentNumber, length) => {
    console.log(length);
    length++;
    if (currentNumber === 1) {
      this.setState({ 
        highestNumber: highestSoFar,
        lengthOfSequence: length
      }, () => {
        return
      });
    }
    else if (currentNumber % 2 > 0 && !this.state.highestNumber) {
      currentNumber = currentNumber * 3 + 1;
      if (currentNumber > highestSoFar) {
        highestSoFar = currentNumber;
      }
      this.secondaryComputation(highestSoFar, currentNumber, length);
    }
    else if (currentNumber % 2 === 0 && !this.state.highestNumber) {
      currentNumber = currentNumber / 2;
      this.secondaryComputation(highestSoFar, currentNumber, length);
    }
  } 

  doRandom = () => {
    let randomNumber = Math.floor(Math.random() * 9999);
    this.setState({ initialInputNumber: randomNumber});
    document.getElementsByClassName("inputNumber")[0].value = randomNumber
    this.init();
    document.getElementsByClassName('inputNumber')[0].value = ''
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
  }

  render() {
    return (
      <div className="App">

        <div id="leftsidebar">
          <div id="logo">3x + 1</div>
          <div id="stats">
            <ul>
              <span>Input Number</span>
              <p>{this.state.initialInputNumber}</p>
            </ul>
            <ul>
              <span>Highest</span>
              <p>{this.state.highestNumber}</p>
            </ul>
            <ul>
              <span>Length</span>
              <p>{this.state.lengthOfSequence}</p>
            </ul>
            <ul id="buttonContainer">
              <button onClick={this.doRandom}>Random</button>
            </ul>
          </div>
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
            <p>
              The Collatz conjecture is a conjecture in mathematics that concerns sequences defined as follows: start with any positive integer <i>n</i>. 
              Then each term is obtained from the previous term as follows: if the previous term is even, the next term is one half of the previous term. 
              If the previous term is odd, the next term is 3 times the previous term plus 1. 
              The conjecture is that no matter what value of n, the sequence will always reach 1.

            </p>
          </div>
        </div>

        
      </div>
    );
  }

}
export default App;
