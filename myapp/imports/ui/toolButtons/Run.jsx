import React from 'react';
import { render } from 'react-dom';

import { Meteor } from 'meteor/meteor';

class Run extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('props', this.props);
	}

	/*
	 * @name: run
	 * @input: n/a
	 * @output: runs and produces an output from the workflow
	 */

	run() {
		var final = 0;
		var opt = {
			Input: (nullvalue, current) => { return current }, // do nothing
			Add: (current, next) => { return current + next},
			Divide: (current, next) => { return current / next},
			Subtract: (current, next) => { return current - next},
			Multiply: (current, next) => { return current * next},
			Model: (current, next) => {  // name is changed to Model
					if(!(typeof current === 'object')){
						console.log('not a collection');
						throw err; 
					}
					console.log('value for next in map-fn is; ', next);
					console.log('value for current in map-fn is: ', current);

					// assuming that current is a collection type
					return current.map((val, index) => {
					// assuming that next is the iteratee fn
						next(val, index);
					});
				},
			IfElse: 'If Else'// may need two inputs here
		}
		// this could be moved to the backend
		var currentVal;
		var nextVal;
		this.props.graph.dfs(this.props.start, (element, distance) => {
			console.log('value for element is: ', this.props.keys[element.id]);
			var ops = opt[this.props.keys[element.id].type]; // operation to do
			nextVal = this.props.keys[element.id].val;

			// if(typeof final === 'string') {
			// 	if(/\D/g.exec(final) || (final[0] === '[' && final[final.length - 1] === ']') || (final[0] === '{' && final[final.length - 1] === '}')){
			// 		// it'll return null if none is found
			// 		final = JSON.parse(final);
			// 	} else {
			// 		final = parseInt(final);
			// 	}
			// 	// may need some safeguard to check if it's actually a number
			// }
			if(typeof this.props.keys[element.id].val === 'string') { //tidy up to make more DRY
				if(/\D/g.exec(nextVal) || (nextVal[0] === '[' && nextVal[nextVal.length - 1] === ']') || (nextVal[0] === '{' && nextVal[nextVal.length - 1] === '}')){
					// it'll return null if none is found

					// replace all new-lines with ''
					nextVal = nextVal.replace(/\r?\n|\r/, '');
					if(nextVal[0] === '(') {
						// naively assume it's a function
						nextVal = eval(nextVal);
					} else {
						nextVal = JSON.parse(nextVal);
					}
				} else {
					nextVal = parseInt(nextVal);
				}
			}
			console.log('about to run', final);
			console.log('about to run', nextVal);
			final = ops(final, nextVal);
		});

		// sends the output back to the global
		this.props.res(final);
	}


	render() {
		return (
			<div className="run-btn col-md-1" onClick={this.run.bind(this)}>
				<span>Run</span>
			</div>
		)
	}
}

export default Run;