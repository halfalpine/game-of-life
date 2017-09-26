import React from "react";
import PropTypes from "prop-types";

const UserInput = ({
  settings,
  generations,
  handleInputChange,
  handleUpClick,
  handleDownClick,
  handlePauseClick,
  handleResetClick,
  handleStartClick
}) => (
  <div className="user-input-container">
    <h1 className="title">Conway's Game of Life</h1>
    <form className="user-input-form" onChange={handleInputChange}>
      <div className="buttons">
        <div>Generations: {generations}</div>
        <div>
          <button onClick={handleStartClick}>Start</button>
          <button onClick={handlePauseClick}>Pause</button>
          <button onClick={handleResetClick}>Reset</button>
        </div>
      </div>
      <div className="settings">
        {Object.keys(settings).map(key => {
          return (
            <div className="setting">
              <label for={key}>
                {key}
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={settings[key]}
                  onChange={handleInputChange}
                />
              </label>
              <div className="button-arrows">
                <button name={key} type="button" onClick={handleUpClick}>
                  &#8679;
                </button>
                <button name={key} type="button" onClick={handleDownClick}>
                  &#8681;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  </div>
);

UserInput.propTypes = {
  settings: PropTypes.object,
  generations: PropTypes.number,
  handleInputChange: PropTypes.func,
  handleUpClick: PropTypes.func,
  handleDownClick: PropTypes.func,
  handlePauseClick: PropTypes.func,
  handleResetClick: PropTypes.func,
  handleStartClick: PropTypes.func
};

export default UserInput;
