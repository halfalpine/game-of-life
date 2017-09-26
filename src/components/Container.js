import React, { Component } from "react";

import Gameboard from "./Gameboard";

class Container extends Component {
  constructor() {
    super();

    this.state = {
      grid: [],
      length: 25,
      width: 25,
      density: 40,
      speed: 1000,
      generations: 1,
      selected: [],
      isPaused: false
    };

    this.handleCellClick = this.handleCellClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
  }

  componentDidMount() {
    const { length, width, density, speed } = this.state;
    this.seedGrid(length, width, density);
    setTimeout(() => (this.timerID = setInterval(() => this.tick(), speed)));
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleCellClick(yCoord, xCoord) {
    let { grid } = this.state;

    grid[yCoord][xCoord] = 2;
    this.setState({ grid });
  }

  handlePauseClick(e) {
    e.preventDefault();
    this.setState({ isPaused: true });
  }

  handleResetClick(length, width, density, speed) {
    console.log(length, width, density, speed);
    clearInterval(this.timerID);
    this.seedGrid(length, width, density);
    this.setState({
      generations: 1,
      speed,
      isPaused: false
    });
    setTimeout(() => (this.timerID = setInterval(() => this.tick(), speed)));
  }

  handleStartClick(e) {
    e.preventDefault();
    this.setState({ isPaused: false });
  }

  seedGrid(length, width, density) {
    // const generateRandomSquare = () => Math.floor(Math.random() * 100);

    const grid = Array.from({ length }, () =>
      new Array(width).fill(0)
    ).map(row =>
      row.map(x => (Math.floor(Math.random() * 100) < density ? 1 : 0))
    );

    this.setState({ grid });
    console.log(grid);
  }

  tick() {
    const { grid, length, isPaused } = this.state;
    const nextGeneration = this.state.generations + 1;
    const oldGrid = grid.map((row, ri, g) =>
      row.map((s, si) => (row[si] > 0 ? 1 : 0))
    );

    if (isPaused) {
      return;
    }

    this.setState({
      grid: oldGrid.map((row, ri, g) => {
        return row.map((square, si) => {
          const prevRowTotal =
            ri > 0
              ? (g[ri - 1][si - 1] || 0) +
                g[ri - 1][si] +
                (g[ri - 1][si + 1] || 0)
              : 0;
          const currRowTotal = (g[ri][si - 1] || 0) + (g[ri][si + 1] || 0);
          const nextRowTotal =
            ri + 1 < length
              ? (g[ri + 1][si - 1] || 0) +
                g[ri + 1][si] +
                (g[ri + 1][si + 1] || 0)
              : 0;
          const count = prevRowTotal + currRowTotal + nextRowTotal;

          if ((square && count === 2) || (square && count === 3)) {
            return 1;
          } else if (!square && count === 3) {
            return 2;
          } else {
            return 0;
          }
        });
      }),
      generations: nextGeneration
    });
  }

  render() {
    return (
      <Gameboard
        {...this.state}
        handleCellClick={this.handleCellClick}
        handlePauseClick={this.handlePauseClick}
        handleResetClick={this.handleResetClick}
        handleStartClick={this.handleStartClick}
      />
    );
  }
}

export default Container;
