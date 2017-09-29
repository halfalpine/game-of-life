import React, { Component } from "react";

import Gameboard from "./Gameboard";

class Container extends Component {
  constructor() {
    super();

    this.state = {
      grid: [],
      length: 10,
      width: 10,
      density: 40,
      speed: 1000,
      generations: 1,
      selected: [],
      isPaused: false
    };

    // Form controls
    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    // Cell controls
    this.handleCellClick = this.handleCellClick.bind(this);

    // Start, stop, & reset controls
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

  // Cell click handler
  handleCellClick(yCoord, xCoord) {
    let { grid } = this.state;

    grid[yCoord][xCoord] = 2;
    this.setState({ grid });
  }

  // Control Panel button handlers
  handlePauseClick(e) {
    e.preventDefault();
    this.setState({ isPaused: true });
  }
  handleResetClick() {
    const { length, width, density, speed } = this.state;
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

  // Control Panel text handlers
  handleUpClick(e) {
    const key = e.target.name;
    const increment = this.state[key] + 1;
    this.setState({ [key]: increment });
  }
  handleDownClick(e) {
    const key = e.target.name;
    const decrement = this.state[key] - 1;
    this.setState({ [key]: decrement });
  }
  handleInputChange(e) {
    const key = e.target.name;
    this.setState({ [key]: Number(e.target.value) });
  }

  // Grid control functions
  seedGrid(length, width, density) {
    const grid = Array.from({ length }, () =>
      new Array(width).fill(0)
    ).map(row =>
      row.map(x => (Math.floor(Math.random() * 100) < density ? 1 : 0))
    );

    this.setState({ grid });
  }
  tick() {
    const { grid, isPaused } = this.state;
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
            ri + 1 < g.length
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
        handleUpClick={this.handleUpClick}
        handleDownClick={this.handleDownClick}
        handleInputChange={this.handleInputChange}
      />
    );
  }
}

export default Container;
