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
    min-width: 20px;
    color: rgba(0, 0, 0, 0);
    background: ${props => {
      switch (props.siblings) {
        case 0:
          return "#f0f0f0;";
        case 1:
          return "rgba(0, 0, 0, 0);";
        case 2:
          return "background: rgba(255, 255, 255, 0.5);";
        default:
          return "rgba(0, 0, 0, 0);";
      }
    }}
    border: 1px solid white;
    box-sizing: border-box;
    user-select: none;
    &:hover {
      background: ${props => {
        switch (props.siblings) {
          case 0:
            return "rgba(0,0,0,0.2);";
          case 1:
            return "rgba(0, 0, 0, 0);";
          case 2:
            return "background: rgba(255, 255, 255, 0.5);";
          default:
            return "rgba(0, 0, 0, 0);";
        }
      }}
    }
  `;

  return (
    <Grid>
      {grid.map((row, ri) => (
        <Row>
          {row.map((c, ci) => (
            <Cell siblings={c} onClick={handleCellClick.bind(this, ri, ci)}>
              {c}
            </Cell>
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
