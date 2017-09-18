import React, {Component} from 'react';
import PropTypes from 'prop-types';

import UserInput from './UserInput';

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

ControlPanel.propTypes = {
	settings: PropTypes.object.isRequired,
	generations: PropTypes.number.isRequired,
	handlePauseClick: PropTypes.func.isRequired,
	handleResetClick: PropTypes.func.isRequired,
	handleStartClick: PropTypes.func.isRequired
};
