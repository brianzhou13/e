import React from 'react';
import { render } from 'react-dom';

// wrapper to use around our react component
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import joint from '../joint.js';

import Diagram from './Diagram2.jsx';
import Tools from './Tools.jsx';


import { db } from '../api/db.js';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			graph: new joint.dia.Graph,
			paper: null,
			lastBoardState: null,
			ops: [], // holds all of our units
			current: [], // the current unit being worked on
			units: {}, // the small details of our units
			formInput: 0, // what the user inputted into the form
			input: 0, 
			output: 0
		}
	}

	componentDidMount() {
		this.autoSaveBoardState = this.autoSaveBoardState.bind(this);
		this.autoSaveBoardState();
	}

	/*
	 * @name: getResult
	 * @input: n/a
	 * @output: sets the output of the user to state
	 */

	getResult(val) {
		this.setState({
			output: val
		});
	}

	/*
	 * @name: getCurrent
	 * @input: event of the current unit
	 * @output: sets the state to the current user unit
	 */

	getCurrent(current) {
		console.log('valuef or current is: ', current);
		var text = current.model.attributes.attrs[".label"].text;
		var regtext = /^[a-zA-Z]+/.exec(text);

		if(!regtext) {
			return;
		}

		// input is the entire model
		if(regtext[0] === 'Input') {
			this.setState({
				input: current.model
			});
		}

		const opt = {
			Input: 'Enter Starting Input',
			Add: 'Add by',
			Divide: 'Divide By',
			Subtract: 'Subtract By',
			Multiply: 'Multiply By',
			Model: "(element, index) => { /* write the iteratee function with params of 'element' and 'index' */ }", // changed key to 'Model' since Map isn't catching
			IfElse: 'If Else'// this isn't used
		};

		console.log('this.state.formInput is: ', this.state.formInput);

		// can be made DRY-er
		var id = current.model.id;
		var obj = {}; // an obj within an obj
		obj[id] = {};
		obj[id].mode = id;
		obj[id].val = this.state.formInput;

		var comb = _.assign({}, this.state.units, obj);

		this.setState({
			current: [regtext[0], current.model, opt[regtext]],
			units: comb
		});
	}

	/*
	 * @name: getInput
	 * @input: the value the user added into the form
	 * @output: gets value out
	 */

	getInput(val) {
		this.setState({
			formInput: val
		});
		console.log('val for val is: ', val);
	}

	/*
	 * @name: updOps
	 * @input: id/type/val of the new unit added
	 * @output: adds the id/type/val of a unit
	 */

	updOps(cell, choice) {
		var regtext = /^[a-zA-Z]+/.exec(cell.attributes.attrs[".label"].text);
		// another regex call
		var val = /^[0-9]*$/.exec(cell.attributes.attrs[".label"].text);

		if(choice === 'remove') {
			var found = false;
			var arr = this.state.ops;

			// removes the item from the opts-state
			this.state.ops.forEach((item, i) => {
				if(item.id === cell.id && !found) {
					arr.splice(i, 1);
					this.setState({
						ops: arr
					});
				}
			});

			// removes the item from the units-state
			this.state.units.forEach((value, key) => {
				if(key === cell.id) {
					var x = _.omit(this.state.units, key);
					this.setState({
						units: x
					});
				}
			})
		}

		if(choice === 'add') {
			// create a new key with the id of the passed in cell
			var id = cell.id;
			var obj = {}; 
			obj[id] = {};
			obj[id].mode = id;
			obj[id].type = regtext[0];
			obj[id].val = null; // undefined still

			var comb = _.assign({}, this.state.units, obj)

			this.setState({
				ops: this.state.ops.concat(cell),
				units: comb
			});			
		}
	}

	/*
	 * @name: autoSaveBoardState
	 * @input: n/a
	 * @output: automatically saves the board every 1 second
	 */

	autoSaveBoardState() {
		setInterval(() => {
			var existing = JSON.stringify(this.graph);
			this.setState({
				lastBoardState: existing
			});
		}, 5000);
	}

	/*
	 * @name: setBoardState
	 * @input: stringified version of board 
	 * @output: sets lastBoardState everytime a unit is added/removed
	 */

	setBoardState(curr) {
		if(curr) {
			this.setState({
				lastBoardState: curr
			});
		}
	}

	render() {
		return (
			<div>
				<div>
					<Tools graph={this.state.graph} prev={this.setBoardState.bind(this)} getIn={this.getInput.bind(this)} last={this.state.lastBoardState} curr={this.state.current} start={this.state.input} keys={this.state.units} res={this.getResult.bind(this)} output={this.state.output}/>
				</div>				
				<div>
					<Diagram graph={this.state.graph} prev={this.setBoardState.bind(this)} updops={this.updOps.bind(this)} ops={this.state.ops}
						getCur={this.getCurrent.bind(this)}/>
				</div>
			</div>
		)
	}

}

App.propTypes = {
	/* define required props */
};

export default createContainer(() => {
	return {
		/* data passed through here from mongoDB */
	}
}, App);