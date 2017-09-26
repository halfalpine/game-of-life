import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Grid = ({ grid, handleCellClick }) => {
  const Grid = styled.div`
    width: 80%;
    margin: auto;
    padding: 30px 0;
    background: white;
    text-align: center;
    box-shadow: 6px 6px 10px -6px;
  `;

  const Row = styled.div`
    display: inline-block;
    margin-top: -4px;
    background-image: linear-gradient(to right, #84fab0 0%, #8fd3f4 100%);
    overflow: hidden;
  `;

  const Cell = styled.div`
    display: inline-block;
    flex: 0 0 auto;
    min-width: $size;
    color: rgba(0, 0, 0, 0);
    border: 1px solid $border-color;
    box-sizing: border-box;
    user-select: none;
  `;

  return (
    <Grid>
      {grid.map((row, ri) => (
        <Row>
          {row.map((c, ci) => (
            <div
              className={"cell" + c}
              onClick={handleCellClick.bind(this, ri, ci)}
            >
              {c}
            </div>
          ))}
        </Row>
      ))}
    </Grid>
  );
};

Grid.propTypes = {
  grid: PropTypes.array.isRequired,
  handleCellClick: PropTypes.func.isRequired
};

export default Grid;
