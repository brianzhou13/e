import React from 'react';
import { render } from 'react-dom';

import joint from '../../joint.js';

class MapButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			embeddedItems: null,
			written: false
		}
	}
	//this component is a button, and if it's clicked, then it should create a new SVG element on the graph

	/*
	 * @name: createMap
	 * @input: n/a
	 * @output: creates an 'Map' unit onto the board
	 */

	createMap() {
		var mapBtn = new joint.shapes.devs.Model({
	    position: { x: 35, y: 10 },
	    size: { width: 300, height: 100 },
	    inPorts: ['input'],
	    outPorts: ['output'],
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


		mapBtn.attr('./label/text', 'Something');

		// add item to cell
		this.props.graph.addCell(mapBtn);
		
		// if an item is embedded, be warned of it
		mapBtn.on('change:embeds', function(cellView) {
			console.log('an item has been embedded!');
			// this supposedly rwill resize the element so it fits all embedded elements inside it.
			this.setState({
				embeddedItems: map.getEmbeddedCells()
			});
		}.bind(this));

		// preserve the existing state
		this.props.prev(JSON.stringify(this.props.graph));

	}

	render() {
		//<button className="btn btn-primary" type="button" onClick={this.createMap.bind(this)}>Map </button>
		return (
			<span onClick={this.createMap.bind(this)}>Map</span>
		)
	}
}

export default MapButton;