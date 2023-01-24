import React, {useState, useEffect} from 'react'
import axios from "axios";

const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [idx, setIdx] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);

  function getXY() {
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

  function getXYStr() {
    const [x, y] = getXY();

    return (`(${x}, ${y})`);
  }

  function reset() {
    setIdx(initialIndex);
    setSteps(initialSteps);
    setEmail(initialEmail);
    setMessage(initialMessage);
  }

  function getNextIndex(direction) {
    const[x, y] = getXY();

    if(direction==="left") {
      if(x!==1) return(idx-1);
      return idx;
    }
    if(direction==="right") {
      if(x!==3) return(idx+1);
      return idx;
    }
    if(direction==="up") {
      if(y!==1) return(idx-3);
      return idx;      
    }
    if(direction==="down") {
      if(y!==3) return(idx+3);
      return idx;
    }
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();

    const [x, y] = getXY();

    axios.post("http://localhost:9000/api/result", {
      x: x,
      y: y,
      steps: steps,
      email: email
    })
    .then(res => {setMessage(res.data.message)})
    .catch(err => console.error(err));
    
    setEmail(initialEmail);
  }

  function onClick(evt) {
    setSteps(steps+1);
    if(evt.target.id==="reset") {reset();}
    else setIdx(getNextIndex(evt.target.textContent.toLowerCase()));
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXYStr()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className={`square${i === idx ? ' active' : ''}`}>
              {i === idx ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={onClick}>LEFT</button>
        <button id="up" onClick={onClick}>UP</button>
        <button id="right" onClick={onClick}>RIGHT</button>
        <button id="down" onClick={onClick}>DOWN</button>
        <button id="reset" onClick={onClick}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input 
          id="email"
          type="email"
          placeholder="type email"
          onChange={onChange}
          value={email}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
