import React, { Component } from "react";
import PropTypes from "prop-types";

import UserInput from "./UserInput";

export default class ControlPanel extends Component {
  render() {
    const { generations } = this.props;
    const { length, width, density, speed } = this.props.settings;
    const {
      handleInputChange,
      handleUpClick,
      handleDownClick,
      handleResetClick,
      handlePauseClick,
      handleStartClick
    } = this.props;

    return (
      <UserInput
        settings={{ length, width, density, speed }}
        generations={generations}
        handleInputChange={handleInputChange}
        handleUpClick={handleUpClick}
        handleDownClick={handleDownClick}
        handlePauseClick={handlePauseClick}
        handleResetClick={handleResetClick}
        handleStartClick={handleStartClick}
      />
    );
  }
}

ControlPanel.propTypes = {
  settings: PropTypes.shape({
    length: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    density: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired
  }),
  generations: PropTypes.number.isRequired,
  handlePauseClick: PropTypes.func.isRequired,
  handleResetClick: PropTypes.func.isRequired,
  handleStartClick: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleUpClick: PropTypes.func.isRequired,
  handleDownClick: PropTypes.func.isRequired
};
