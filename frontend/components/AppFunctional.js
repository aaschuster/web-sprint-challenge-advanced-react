import React, {useState, useEffect} from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [idx, setIdx] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState(initialMessage);

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

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

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    setIdx(initialIndex);
    setSteps(initialSteps);
    setEmail(initialEmail);
    setMessage(initialMessage);
  }

  function getNextIndex(direction) {
    if(direction==="left") {
      if(idx%3!==0) return(idx-1);
      return idx;
    }
    if(direction==="right") {
      if((idx+1)%3!==0) return(idx+1);
      return idx;
    }
    if(direction==="up") {
      if(idx>2) return(idx-3);
      return idx;      
    }
    if(direction==="down") {
      if(idx<6) return(idx+3);
      return idx;
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  function onClick(evt) {
    if(evt.target.id==="reset") {reset();}
    else setIdx(getNextIndex(evt.target.textContent.toLowerCase()));
  }

  useEffect( () => {
    console.log(getXY());
  }, [idx])

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
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
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={onClick}>LEFT</button>
        <button id="up" onClick={onClick}>UP</button>
        <button id="right" onClick={onClick}>RIGHT</button>
        <button id="down" onClick={onClick}>DOWN</button>
        <button id="reset" onClick={onClick}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
