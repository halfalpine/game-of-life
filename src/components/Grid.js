import React from "react";
import PropTypes from "prop-types";

const Grid = ({ grid, handleCellClick }) => (
  <div className="grid">
    {grid.map((row, ri) => (
      <div className="row">
        {row.map((c, ci) => (
          <div
            className={"cell" + c}
            onClick={handleCellClick.bind(this, ri, ci)}
          >
            {c}
          </div>
        ))}
      </div>
    ))}
  </div>
);

Grid.propTypes = {
  grid: PropTypes.array.isRequired,
  handleCellClick: PropTypes.func.isRequired
};

export default Grid;
