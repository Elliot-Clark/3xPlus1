import './App.css';

state = {
  outputs : []
}

let inputNumber = 0;

let init = () => {
  outputs = [];
  inputNumber = document.getElementById("inputNumber").value;
  outputs.push(parseInt(inputNumber));
  main();
}


let main = () => {
  if (inputNumber === 1) {
    outputs.push(inputNumber);
    console.log(outputs);
    return
  }
  if (inputNumber % 2 > 0) {
    inputNumber = inputNumber * 3 + 1;
    outputs.push(inputNumber);
    main();
  }
  if (inputNumber % 2 === 0) {
    inputNumber = inputNumber / 2;
    outputs.push(inputNumber);
    main();
  }
}


function App() {
  return (
    <div className="App">
      <input id="inputNumber"></input>
      <button onClick={init}>Do Math</button>
      <div>{outputs}</div>
    </div>
  );
}

export default App;
