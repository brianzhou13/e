import React from 'react';
import { render } from 'react-dom';

import joint from '../../joint.js';

class Subtract extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: 0
		}
	}

	/*
	 * @name: createSubtract
	 * @input: n/a
	 * @output: creates a subtract unit
	 */

	createSubtract() {
		// this is to test out what the shape with models look like
		var subtract = new joint.shapes.devs.Model({
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
	                    }
	                }
	            },
	            'out': {
	                attrs: {
	                    '.port-body': {
	                        fill: '#E74C3C',
	                        r: '5'
	                    }
	                }
	            }
	        }
	    },
		});

		subtract.attr('.label/text', 'Subtract: ' + this.state.input.toString());
		this.props.graph.addCell(subtract);

		// save the state of the board
		this.props.prev(JSON.stringify(this.props.graph));
	}

	render() {
		return (
			<span onClick={this.createSubtract.bind(this)} className="subtract-btn">Subtract</span>
		)
	}
}

export default Subtract;