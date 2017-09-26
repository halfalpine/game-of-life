import React from "react";
import PropTypes from "prop-types";

import Grid from "./Grid";
import ControlPanel from "./ControlPanel";

const Gameboard = props => {
  const {
    grid,
    length,
    width,
    density,
    speed,
    generations,
    handleCellClick,
    handlePauseClick,
    handleResetClick,
    handleStartClick
  } = props;
  return (
    <div className="game-board">
      <ControlPanel
        settings={{ length, width, density, speed }}
        generations={generations}
        handlePauseClick={handlePauseClick}
        handleResetClick={handleResetClick}
        handleStartClick={handleStartClick}
      />
      <Grid grid={grid} handleCellClick={handleCellClick} />
    </div>
  );
};

Gameboard.propTypes = {
  grid: PropTypes.array.isRequired,
  length: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  density: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  generations: PropTypes.number.isRequired,
  handleCellClick: PropTypes.func.isRequired,
  handlePauseClick: PropTypes.func.isRequired,
  handleResetClick: PropTypes.func.isRequired,
  handleStartClick: PropTypes.func.isRequired
};

export default Gameboard;
