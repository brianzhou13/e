import React from 'react';
import { render } from 'react-dom';

import joint from '../../joint.js';

class IfButton extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			dupe: false,
			top: null,
			bott: null,
		}
	}

	componentDidMount() {
		this.createIfElse = this.createIfElse.bind(this);

		// this.createIfElse();
	}


	createIfElse() {
		var ifelse = new joint.shapes.devs.Model({
	    position: { x: 35, y: 10 },
	    size: { width: 100, height: 100 },
	    inPorts: ['input'],
	    outPorts: ['if', 'else'],
	    attrs: {
	    	'.body': { r:20, cx: 50}
	    },
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
	                    '.port-body': { // give it that class (?)
	                        fill: '#E74C3C',
	                        r: '5'
	                    }
	                }
	            }
	        }
	    },
		});

		ifelse.attr('.label/text', 'IfElse')
		this.props.graph.addCell(ifelse);
	}


	render() {
		//<button className="btn btn-primary" type="button" onClick={this.createIfElse.bind(this)} > If-Else </button>

		return (
				<span onClick={this.createIfElse.bind(this)} >If-Else</span>
		)
	}
}

export default IfButton;