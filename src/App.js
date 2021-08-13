import React, { Component } from "react";
import Canvas from './Canvas'
import './App.css';

// Show inputted number 
// Show highest number
// Show length of seuqnece
// Information

class App extends Component {
  
  state = {
    inputNumber: '',
    numberCollection : [],
    idle: true,
  }

  init = () => {
    let userInputtedNumber = parseInt(document.getElementsByClassName("inputNumber")[0].value);
    this.setState({ 
      inputNumber: userInputtedNumber,
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
      //While not infinite, some numbers can have a sequence far to long to display so we limit it to 30 before ending.
      if (count % 2 > 0 && outputs.length < 30) {
        //Odd Number. Multiply the number by 3 and add 1 then run method again.
        count = count * 3 + 1;
        outputs.push(count);
          calculate();
      }
      if (count % 2 === 0 && outputs.length < 30) {
        //Even Number. Divide the number by 2 and run method again.
        count = count / 2;
        outputs.push(count);
        calculate();
      }
    }
    calculate();
    this.setState({numberCollection: outputs});
  }

  componentDidMount() {
    const runStart = () => {
      this.init();
    }
    document.getElementsByClassName('inputNumber')[0].addEventListener("keyup",function(e){
      if (e.keyCode === 13) {
        runStart();
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
 
    // let items = []
    // for (const [index, value] of this.state.numberCollection.entries()) {
    //   items.push(<li key={index}>{value}</li>)
    // }

    return (
      <div className="App">

        <div id="sidebar">
          <div id="logo">Logo Placeholder</div>
            fewfwf
        </div>
        <div id="rightWrapper">
          <div id="inputWrapper">
            <input className="inputNumber" title="Input any positive integer and press Enter to run"></input>
          </div>
          <Canvas 
            numberCollection = {this.state.numberCollection}
          />
          <div id="infoText"></div>
        </div>

        
      </div>
    );
  }

}
export default App;
