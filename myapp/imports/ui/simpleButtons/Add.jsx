import React from 'react';
import { render } from 'react-dom';

import joint from '../../joint.js';

class Add extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			add: [], // in the future, we can pass them all back into global state in App.jsx
			input: 0,
		}
	}

	/*
	 * @name: createAdd
	 * @input: n/a
	 * @output: creates an 'Add' unit onto the board
	 */

	createAdd() {
		var add= new joint.shapes.devs.Model({
	    position: { x: 35, y: 10 },
	    size: { width: 100, height: 100 },
	    inPorts: ['in'],
	    outPorts: ['out'],
	    ports: {
	        groups: {
	            'in': {
	                attrs: {
	                    '.port-body': {
	                        fill: '#16A085',
	                        r: '5'
	                    },
	                    '.connection': { stroke: '#feb663'}
	                }
	            },
	            'out': {
	                attrs: {
	                    '.port-body': {
	                        fill: '#E74C3C',
	                        r: '5'
	                    },
	                    '.connection': { stroke: '#feb663'},
	                }
	            }
	        }
	    },
		});

		//add the id to an object
			// being that we've just hit add, then we can give it a type add
			// and then
		add.attr('.label/text', 'Add: ' + this.state.input.toString());
		this.props.graph.addCell(add);

		// save the state of the board
		this.props.prev(JSON.stringify(this.props.graph));
	}

	render() {
		return (
			<span onClick={this.createAdd.bind(this)}>Add</span>
		)
	}
}

export default Add;