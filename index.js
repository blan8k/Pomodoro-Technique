import React from "react";
import ReactDOM from "react-dom";
import Sketch from "react-p5";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ReactP5Wrapper } from "react-p5-wrapper";
import "p5/lib/addons/p5.sound";
import Alarm from "./Alarm.mp3";
import Ding from "./Ding.mp3";
var countDown;
let baseTime;
let time;
var sound;
var audio1;
class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio(Alarm),
      ding: new Audio(Ding),
      isPlaying: false,
      countDown: -1,
      baseTime: 25 * 60,
      time: 25 * 60,
      //baseTime: 5,
      //time: 10,
      break: false,
      sessions: 0,
    };
  }
  /*loop() {
    setInterval(() => {
      var num = 0;
      const ol = document.getElementById("List");
      const checkbox = ol.getElementsByTagName("input");
      var length = ol.childNodes.length;

      for (var i = 0; i < length; i++) {
        if (checkbox[i].checked) {
          num++;
        }
      }
      document.getElementById("Sessions").innerText =
        "Number of Sessions: " + num;
      this.setState({
        sessions: num,
      });
    }, 1000);
  }*/
  reset() {
    const ol = document.getElementById("List");
    ol.innerHTML = "";
  }
  stop1() {
    //var sound = document.getElementById("Alarm");

    audio1.pause();
    //sound.stop(time + 1);
    //stop.style.display = "none";
    this.setState({
      isPlaying: false,
    });
  }

  start() {
    //sound;
    var num = 0;
    const ol = document.getElementById("List");
    const checkbox = ol.getElementsByTagName("input");
    var length = ol.childNodes.length;
    var timer = document.getElementById("Timer");
    for (var i = 0; i < length; i++) {
      if (checkbox[i].checked) {
        num++;
      }
    }
    if (num == length && timer.textContent == "25:00") {
      alert("You are done!");
      return;
    }
    var list = document.getElementById("List");
    var listCheck = list.getElementsByTagName("input");

    //var sound = document.getElementById("Alarm");

    var stop = document.getElementById("Stop");
    let min = Math.floor(this.state.time / 60);
    let sec = this.state.time % 60;

    setInterval(() => {
      //if(!sound.paused || (sound.currentTime && !sound.ended )){
      if (this.state.isPlaying) {
        stop.style.display = "inline";
      } else {
        stop.style.display = "none";
      }
    }, 1000);

    if (
      document.getElementById("Start").innerText == "Start!" &&
      listCheck.length > 0 &&
      !this.state.isPlaying
    ) {
      var startM = Math.floor(this.state.baseTime / 60);
      var startS = this.state.baseTime % 60;
      if (startM < 10) {
        startM = "0" + startM;
      }
      if (startS < 10) {
        startS = "0" + startS;
      }
      timer.innerHTML = startM + ":" + startS;
      document.getElementById("Start").innerText = "Pause";
      let start = new Date();
      countDown = setInterval(() => {
        let current = new Date();
        this.setState({
          //time: this.state.time - 1,
          time: current - start,
        });
        //min = Math.floor(this.state.time / 60);
        //sec = this.state.time % 60;
        //min = Math.floor(this.state.time / 60000) % 60;
        //sec = Math.floor(this.state.time / 1000); yes
        min = Math.floor(
          (this.state.baseTime - Math.floor(this.state.time / 1000)) / 60
        );
        sec = (this.state.baseTime - Math.floor(this.state.time / 1000)) % 60;
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }

        timer.innerHTML = min + ":" + sec;
        //this.setState({ isPlaying: false });
        //if (this.state.time <= 0) {
        if (
          Math.floor(
            (this.state.baseTime - Math.floor(this.state.time / 1000)) / 60
          ) <= 0 &&
          (this.state.baseTime - Math.floor(this.state.time / 1000)) % 60 <= 0
        ) {
          clearInterval(countDown);
          this.setState({
            audio: new Audio(Alarm),
            isPlaying: true,
          });
          audio1 = this.state.audio;
          document.getElementById("Start").innerText = "Start!";
          const ol = document.getElementById("List");
          const checkbox = ol.getElementsByTagName("input");
          var length = ol.childNodes.length;

          if (!this.state.break) {
            this.state.ding.play();
            timer.innerHTML = "05:00";
            this.setState({
              break: !this.state.break,
              baseTime: 5 * 60,
              //baseTime: 5,
              sessions: this.state.sessions + 1,
            });
            document.getElementById("Sessions").innerText =
              "Number of Sessions: " + this.state.sessions;
            //document.getElementById("Sessions").innerText =
            //"Number of Sessions: " + this.state.sessions;
            for (let i = 0; i < length; i++) {
              if (!checkbox[i].checked) {
                checkbox[i].checked = true;
                //alert("Made it here");
                break;
              }
            }
          } else {
            timer.innerHTML = "25:00";
            this.setState({
              break: !this.state.break,
              baseTime: 25 * 60,
              //baseTime: 10,
            });
          }
          audio1.play();
          audio1.onended = function () {
            this.setState({
              isPlaying: false,
            });
          }.bind(this);
          this.setState({
            time: this.state.baseTime,
          });
        }
      }, 1000);
    } else {
      clearInterval(countDown);
      document.getElementById("Start").innerText = "Start!";
      var pausedM = timer.textContent.substring(0, 2);

      var pausedS = timer.textContent.substring(3, 5);

      this.setState({
        baseTime: parseInt(pausedM) * 60 + parseInt(pausedS),
      });
      countDown = -1;
    }
  }

  del() {
    var list = document.getElementById("List");
    var listCheck = list.getElementsByTagName("input");
    var listli = list.getElementsByTagName("li");
    for (let i = 0; i < listCheck.length; i++) {
      if (listCheck[i].checked) {
        listli[i].parentNode.removeChild(listli[i]);
        i--;
      }
    }
  }

  post() {
    const task = document.getElementById("InputTasks").value;
    const ol = document.getElementById("List");
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = 1;
    checkbox.className = "Checkbox";

    if (task != "") {
      li.appendChild(document.createTextNode(task));
      li.appendChild(checkbox);
      ol.appendChild(li);
      document.getElementById("InputTasks").value = "";
    } else {
      alert("Put a task first!");
    }
  }
  ding() {
    var num = 0;
    const ol = document.getElementById("List");
    const checkbox = ol.getElementsByTagName("input");
    var length = ol.childNodes.length;
    this.state.ding.pause();
    this.setState({
      ding: new Audio(Ding),
    });
    for (var i = 0; i < length; i++) {
      if (checkbox[i].checked) {
        num++;
      }
    }
    if (num > this.state.sessions) {
      this.state.ding.play();
    }

    document.getElementById("Sessions").innerText =
      "Number of Sessions: " + num;
    this.setState({
      sessions: num,
    });
  }
  render() {
    //this.loop();
    return (
      <div>
        <h1> Pomodoro Technique Schedule</h1>

        <p id="Description">
          List the tasks you have and press start! (Divided into 25 min
          increments with 5 min breaks)
        </p>
        <div class="Post">
          <label for="InputTasks">Tasks:</label>
          <input type="text" id="InputTasks" name="Tasks" />
          <button id="post" onClick={() => this.post()}>
            Post
          </button>
        </div>
        <button id="Start" onClick={() => this.start()}>
          Start!
        </button>
        <ol id="List" onClick={() => this.ding()}></ol>
        <button id="Delete" onClick={() => this.del()}>
          Delete
        </button>
        <button id="Reset" onClick={() => this.reset()}>
          Reset
        </button>
        <button id="Stop" onClick={() => this.stop1()}>
          Stop
        </button>
        <p id="Timer">25:00</p>
        <audio id="Alarm">
          <source src="Alarm.mp3" type="audio/mp3" />
        </audio>
        <p id="Sessions">Number of Sessions: 0</p>
      </div>
    );
  }
}
ReactDOM.render(<Title />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
