import React from "react";
import "./App.css";
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from "./sketch";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <>
          <ReactP5Wrapper sketch={sketch} />
        </>
      </header>
    </div>
  );
}
/*class Title extends React.Component() {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      (<p> Pomodoro Technique Schedule</p>),
      (
        <p>
          List the tasks you have and press start! (Divided into 25 min
          increments with 5 min breaks)
        </p>
      )
    );
  }
}*/
export default App;
