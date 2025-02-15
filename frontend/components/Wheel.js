import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import wheel, { initialWheelState } from '../state/reducer'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

function Wheel({ activeCogIndex, moveClockwise, moveCounterClockwise }) {
  const handleClockwiseButtonClick = () => {
    moveClockwise();
  };

  const handleCounterClockwiseButtonClick = () => {
    moveCounterClockwise();
  };

  const cogs = ['', '', '', '', '', '' ]

  return (
    <div id="wrapper">
      <div id="wheel">
        {cogs.map((cog, index) => (
          <div
            key={index}
            className={`cog ${index === activeCogIndex ? 'active' : ''}`}
            style={{ "--i": index }}
          >
            {index === activeCogIndex ? 'B' : ''}
          </div>
        ))}
 {/*    <div className="cog active" style={{ "--i": 0 }}>B</div>
        <div className="cog" style={{ "--i": 1 }}>1</div>
        <div className="cog" style={{ "--i": 2 }}>2</div>
        <div className="cog" style={{ "--i": 3 }}>3</div>
        <div className="cog" style={{ "--i": 4 }}>4</div>
        <div className="cog" style={{ "--i": 5 }}>5</div>  --i is a custom CSS property, no need to touch that nor the style object */}
      </div>

      <div id="keypad" >
        <button id="counterClockwiseBtn" onClick={handleCounterClockwiseButtonClick}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleClockwiseButtonClick}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  activeCogIndex: state.wheel,
});

export default connect(mapStateToProps, actionCreators)(Wheel);