import React from 'react'
import axios from "axios"

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = {
      idx: initialIndex,
      email: initialEmail,
      steps: initialSteps,
      message: initialMessage
    }
  }

  getXY = () => {
    const idx = this.state.idx;
    let x;
    let y;

    if(idx<3) y=1;
    if(idx>2 && idx<6) y=2;
    if(idx>5) y=3;

    if(idx%3===0) x=1;
    if((idx-1)%3===0) x=2;
    if((idx-2)%3===0) x=3;

    return [x, y];
  }

  getXYStr = () => {
    const [x, y] = this.getXY();

    return (`(${x}, ${y})`);
  }

  reset = () => {
    this.setState({
      idx: initialIndex,
      email: initialEmail,
      steps: initialSteps,
      message: initialMessage
    });
  }

  incrementSteps = () => this.setState({steps: this.state.steps+1});

  getNextIndex = (direction) => {
    const [x, y] = this.getXY();
    const idx = this.state.idx;

    if(direction==="left" && x!==1) {
      this.incrementSteps();
      return(idx-1);
    }
    if(direction==="right" && x!==3) {
      this.incrementSteps();
      return(idx+1);
    }
    if(direction==="up" && y!==1) {
        this.incrementSteps();
        return(idx-3);
    }
    if(direction==="down" && y!==3) {
        this.incrementSteps();
        return(idx+3);
    }
    this.setState({message: `You can't go ${direction}`});
    return idx;
  }

  onChange = (evt) => {
    this.setState({email: evt.target.value});
  }

  onSubmit = (evt) => {
    evt.preventDefault();

    const [x, y] = this.getXY();
    console.log({
      x: x,
      y: y,
      steps: this.state.steps,
      email: this.state.email
    })

    axios.post("http://localhost:9000/api/result", {
      x: x,
      y: y,
      steps: this.state.steps,
      email: this.state.email
    })
    .then(res => this.setState({message: res.data.message}))
    .catch(err => this.setState({message: err.response.data.message}));

    this.setState({email: initialEmail});
  }

  onClick = (evt) => {
    this.setState({message: initialMessage});
    if(evt.target.id==="reset") this.reset();
    else this.setState({
      idx: this.getNextIndex(evt.target.textContent.toLowerCase())
    });
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getXYStr()}</h3>
          <h3 id="steps">
            You moved {this.state.steps} time{this.state.steps===1 ? `` : `s`}
          </h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.idx ? ' active' : ''}`}>
                {idx === this.state.idx ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.onClick}>LEFT</button>
          <button id="up" onClick={this.onClick}>UP</button>
          <button id="right" onClick={this.onClick}>RIGHT</button>
          <button id="down" onClick={this.onClick}>DOWN</button>
          <button id="reset" onClick={this.onClick}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input 
            id="email" 
            type="email" 
            placeholder="type email"
            onChange={this.onChange}
            value={this.state.email}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
