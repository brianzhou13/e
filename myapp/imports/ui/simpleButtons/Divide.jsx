import React from 'react';
import { render } from 'react-dom';

import joint from '../../joint.js';

class Divide extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: 0,
		}
	}

	createDivide() {
			var divide = new joint.shapes.devs.Model({
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

		divide.attr('.label/text', 'Divide: ' + this.state.input.toString());
		this.props.graph.addCell(divide);

		// save the state of the board
		this.props.prev(JSON.stringify(this.props.graph));
	}

	render() {
		return (
			<span onClick={this.createDivide.bind(this)}>Divide</span>
		)
	}
}

export default Divide;