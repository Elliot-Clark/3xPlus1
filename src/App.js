import React, { Component } from "react";
import Canvas from './Canvas'
import './App.css';

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

  //This function signals the start of every caculation to run, clearing previous inits if started from user input 
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

  //This is the main function responsible for determining every number you see graphed on the screen
  mainComputation = () => {
    let count = this.state.inputNumber
    if (count < 1) {
      return
    }
    let outputs = [count];
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
      //This is done by condensing the array of all numbers into a single number then count how many digits are in it. 
      //The exact amount of digits is dependant on screen width
      //This also helps fit displays where the user enters huge numbers 
      if (outputs.join().replace(/,/g, '').split('').length > (window.innerWidth / 18)) {
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
    length++;
    if (currentNumber === 1) {
      this.setState({ 
        highestNumber: highestSoFar,
        lengthOfSequence: length
      }, () => {
        return
      });
    }
    //If the number is ODD multipy it by 3 and add 1
    else if (currentNumber % 2 > 0 && !this.state.highestNumber) {
      currentNumber = currentNumber * 3 + 1;
      if (currentNumber > highestSoFar) {
        highestSoFar = currentNumber;
      }
      this.secondaryComputation(highestSoFar, currentNumber, length);
    }
    //If the number is EVEN divide by 2
    else if (currentNumber % 2 === 0 && !this.state.highestNumber) {
      currentNumber = currentNumber / 2;
      this.secondaryComputation(highestSoFar, currentNumber, length);
    }
  } 

  randomButton = () => {
    let randomNumber = Math.floor(Math.random() * 5999);
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
    //Setting the Enter key to run the program
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
              <span>Input:</span>
              <p>{this.state.initialInputNumber}</p>
            </ul>
            <ul>
              <span>Highest:</span>
              <p>{this.state.highestNumber}</p>
            </ul>
            <ul>
              <span>Length:</span>
              <p>{this.state.lengthOfSequence}</p>
            </ul>
            <ul id="buttonContainer">
              <button onClick={this.randomButtom}>Random</button>
            </ul>
          </div>
        </div>
        <div id="rightWrapper">
          <p>Input any postive interger then hit Enter</p>
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
              <br></br><br></br>
              The conjecture has also been referred to as the simplest math problem no one can solve. 
              For years mathematicians have tried to find a number that did not eventually reduce down to 1. 
              If you can find that fabled number, I will give you a dollar.
              <br></br><br></br>
              Further information can be found in a detailed explaination video of the Collatz conjecture here: <a href="https://www.youtube.com/watch?v=094y1Z2wpJg">YouTube</a>
            </p>
          </div>
        </div>

        
      </div>
    );
  }

}
export default App;
