import React from 'react'

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
    state = {
      idx: initialIndex,
      email: initialEmail,
      steps: initialSteps,
      message: initialMessage
    }
  }
  getXY = () => {
    idx = this.state.idx;
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

  getXYMessage = () => {
    const [x, y] = getXY();

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

  getNextIndex = (direction) => {
    const [x, y] = getXY;
    idx = this.state.idx;

    if(direction==="left") {
      if(x!==1) {
        this.setState({steps: steps+1});
        return(idx-1);
      }
      this.setState({message: "You can't go left"});
      return idx;
    }
    if(direction==="right") {
      if(x!==3) {
        this.setState({steps: steps+1});
        return(idx+1);
      }
      this.setState({message: "You can't go right"});
      return idx;
    }

    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
                {idx === 4 ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
