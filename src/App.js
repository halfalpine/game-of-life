import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

/*
const Container = () =>
	<div className="container">
		<header>

		</header>
		<GameBoard/>
		<footer>
			<p>This is the footer</p>
		</footer>
	</div>

class GameBoard extends React.Component {
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
		}

		this.handleCellClick = this.handleCellClick.bind(this);
		this.handlePauseClick = this.handlePauseClick.bind(this);
		this.handleResetClick = this.handleResetClick.bind(this);
		this.handleStartClick = this.handleStartClick.bind(this);
  }

  componentDidMount() {
		const {length, width, density, speed} = this.state;
    this.seedGrid(length, width, density);
		setTimeout(() => this.timerID = setInterval(() => this.tick(), speed));
  }

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	handleCellClick(yCoord, xCoord) {
		let {grid} = this.state;

		grid[yCoord][xCoord] = 2;
		this.setState({grid});
	}

	handlePauseClick(e) {
		e.preventDefault();
		this.setState({isPaused: true});
	}

	handleResetClick(length, width, density, speed) {
		console.log(length, width, density, speed)
		clearInterval(this.timerID);
		this.seedGrid(length, width, density);
		this.setState({
			generations: 1,
			speed,
			isPaused: false
		});
		setTimeout(() => this.timerID = setInterval(() => this.tick(), speed));
	}

	handleStartClick(e) {
		e.preventDefault();
		this.setState({isPaused: false});
	}

	seedGrid(length, width, density) {
		const generateRandomSquare = () => Math.floor(Math.random() * 100);

		const grid = Array.from({length}, () => new Array(width).fill(0))
			.map(row => row.map(x => Math.floor(Math.random() * 100) < density ? 1 : 0));

		this.setState({grid});
	}

	tick() {
		const {grid, length, isPaused} = this.state;
		const nextGeneration = this.state.generations + 1;
		const oldGrid = grid.map((row, ri, g) => row.map((s, si) => row[si] > 0 ? 1 : 0))

		if (isPaused) {
			return;
		}

		this.setState({grid: oldGrid.map((row, ri, g) => {
									 	return row.map((square, si) => {

											const prevRowTotal = ri > 0 ? (g[ri-1][si-1] || 0) + g[ri-1][si] + (g[ri-1][si+1] || 0) : 0;
											const currRowTotal = (g[ri][si-1] || 0) + (g[ri][si+1] || 0);
											const nextRowTotal = ri+1 < length ? (g[ri+1][si-1] || 0) + g[ri+1][si] + (g[ri+1][si+1] || 0) : 0;
											const count = prevRowTotal + currRowTotal + nextRowTotal;

										  if (square && count == 2 || square && count == 3) {
												return 1;
											} else if (!square && (count == 3)) {
												return 2;
											} else {
												return 0;
											}
										})
									}),
									generations: nextGeneration});
	}

  render() {
		const {grid, length, width, density, speed, generations} = this.state;
    return (
			<div className="game-board">
				<ControlPanel
					settings={{length, width, density, speed}}
					generations={generations}
					handlePauseClick={this.handlePauseClick}
					handleResetClick={this.handleResetClick}
					handleStartClick={this.handleStartClick}
			  />
				<Grid grid={grid} handleCellClick={this.handleCellClick} />
			</div>
    );
  }
}

const Grid = ({grid, handleCellClick}) =>
  <div className="grid">
	{grid.map((row, ri) => <div className="row">{row.map((c, ci) => <div className={'cell'+c} onClick={handleCellClick.bind(this, ri, ci)}>{c}</div>)}</div>)}
	</div>

class ControlPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			length: this.props.settings.length,
			width: this.props.settings.width,
			density: this.props.settings.density,
			speed: this.props.settings.speed / 1000
		}

		this.handleUpClick = this.handleUpClick.bind(this);
		this.handleDownClick = this.handleDownClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleResetClick = this.handleResetClick.bind(this);
	}

	handleUpClick(e) {
		const key = e.target.name;
		const increment = this.state[key] + 1;
		this.setState({[key]: increment});
	}

	handleDownClick(e) {
		const key = e.target.name;
		const decrement = this.state[key] - 1;
		this.setState({[key]: decrement});
	}

	handleInputChange(e) {
		const key = e.target.name;
		this.setState({[key]: Number(e.target.value)})
	}

	handleResetClick(e) {
		e.preventDefault();
		const {length, width, density, speed} = this.state;
		this.props.handleResetClick(length, width, density, speed * 1000);
	}

	render() {
		const {generations} = this.props;
		const {length, width, density, speed} = this.state;

		return (
			<UserInput
				settings={{length, width, density, speed}}
				generations={generations}
				handleInputChange={this.handleInputChange}
				handleUpClick={this.handleUpClick}
				handleDownClick={this.handleDownClick}
				handlePauseClick={this.props.handlePauseClick}
				handleResetClick={this.handleResetClick}
				handleStartClick={this.props.handleStartClick}
			/>
		);
	}
}

const UserInput = ({settings, generations, handleInputChange, handleUpClick, handleDownClick, handlePauseClick, handleResetClick, handleStartClick}) =>
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
						<label for={key}>{key}
							<input type="text" id={key} name={key} value={settings[key]} onChange={handleInputChange}/>
						</label>
						<div className="button-arrows">
							<button name={key} type="button" onClick={handleUpClick}>&#8679;</button>
							<button name={key} type="button" onClick={handleDownClick}>&#8681;</button>
						</div>
					</div>
				);
			})}
		</div>
	</form>
	</div>

const {PropTypes} = React;

Grid.propTypes = {
	grid: PropTypes.array.isRequired,
	handleCellClick: PropTypes.func.isRequired
}

ControlPanel.propTypes = {
	settings: PropTypes.object.isRequired,
	generations: PropTypes.number.isRequired,
	handlePauseClick: PropTypes.func.isRequired,
	handleResetClick: PropTypes.func.isRequired,
	handleStartClick: PropTypes.func.isRequired
};

UserInput.propTypes = {
	settings: PropTypes.object,
	generations: PropTypes.number,
	handleInputChange: PropTypes.func,
	handleUpClick: PropTypes.func,
	handleDownClick: PropTypes.func,
	handlePauseClick: PropTypes.func,
	handleResetClick: PropTypes.func,
	handleStartClick: PropTypes.func
}
      

*/
