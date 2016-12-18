import React from 'react';
import { render } from 'react-dom';

class Reset extends React.Component {
	constructor(props) {
		super(props);
	}

	/*
	 * @name: resetBoard
	 * @input: n/a
	 * @output: resets the board and delets all cells
	 */

	resetBoard() {
		this.props.graph.resetCells();
	}

	render() {
		return (
			<div className="reset-btn col-md-1" onClick={this.resetBoard.bind(this)}>
				<span>Reset</span>
			</div>
		)
	}
}

export default Reset;