import React from 'react';
import { render } from 'react-dom';

import joint from '../../joint.js';

class Multiply extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			input: 0
		}
	}

	createMultiply() {
		var multiply = new joint.shapes.devs.Model({
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

		multiply.attr('.label/text', 'Multiply: '+ this.state.input.toString());
		this.props.graph.addCell(multiply);

		// save the state of the board
		this.props.prev(JSON.stringify(this.props.graph));
	}

	render() {
		return (
			<span onClick={this.createMultiply.bind(this)} className="multiply-btn">Multiply</span>
		)
	}
}

export default Multiply;