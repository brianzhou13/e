import React from 'react';
import { render } from 'react-dom';
 
import joint from '../joint.js';

class Diagram extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			paper: null,
			current: null,
			editing: null, // we need to check for an editing mode
		}
	}

	componentDidMount() {
		this.renderDiagram = this.renderDiagram.bind(this);
		this.displayConnection = this.displayConnection.bind(this);
		this.setupGraph = this.setupGraph.bind(this);
		this.handleDelete = this.handleDelete.bind(this);

		this.renderDiagram();
		this.displayConnection();
		this.setupGraph();
		this.handleDelete();
	}

	/*
	 * @name: handleDelete
	 * @input: n/a
	 * @output: deletes the highlighted/current element (this.state.current) and saves board
	 * @notes: doesn't affect the delete functionality when deleting text
	 * -- REMOVING: it only deletes the SVG element, but the form text still stays on the page. 
	 */

	handleDelete() {

		var focus = false;

		// checks to see if the form was clicked so to not delete the form-text while deleting SVG 
		$('form').on('click', () => {
			focus = true;
		});

		// delete the SVG element
		$('html').keyup(function(e){

	    if(e.keyCode == 8 || e.keyCode == 46) { // this is the delete key for a mac
        if(!this.state.current.model && !focus) {
        	// this is setup for users who want to delete text, but the delete key is binded to unit-delete-functionality
        	return; 
        }
        this.state.current.model.remove(); // this removes the current element

        focus = true;

    //     var found = false;
    //     var arr = [];

    //     /* code below was for deleting the code.. but we have a remove eventhanlder */
    //     this.props.ops.map((item, i) => {
				// 	if(item.id === this.state.current.model.id && !found) {
				// 		this.props.ops.splice(i, 1);
				// 		found = true;
				// 		this.props.updops(this.props.ops);
				// 		return;
				// 	}
				// 	console.log('not found...');
				// 	return;
    //  //    // saves the board
        this.props.prev(JSON.stringify(this.props.graph));
				// });
	    }
		}.bind(this));
	}

	/*
	 * @name: renderDiagram
	 * @input: n/a
	 * @output: generates the paper
	 */

	renderDiagram() {
		var paper = new joint.dia.Paper({
			el: $('#myholder'),
			width: 1000,
			height: 500,
			model: this.props.graph,
			gridSize: 1,
			defaultLink: new joint.dia.Link({ //https://jsfiddle.net/vtalas/4copge0m/
        markup: [
            '<path class="connection" stroke="black" d="M 0 0 0 0"/>',
           // '<path class="marker-source" fill="none" stroke="none" d="0 0 0 0"/>',
             // '<path class="marker-target" fill="black" stroke="black" d="M 10 0 L 0 5 L 10 10 z"/>',
            '<path class="connection-wrap" d="M 0 0 0 0"/>',
            '<g class="marker-vertices"/>',
            //'<g class="marker-arrowheads"/>'
        ].join(''),
	    }),
	    interactive: {
        vertexAdd: false
      } 
		});

		paper.on('cell:pointerup', function (cellView, evt, x, y) {

			if(cellView.model.isLink() /*&& cellView.model.id.length > 10*/) { // 10 is an arbit number
				return; // return if it is a link
			}
			cellViewsBelow = paper.findViewsFromPoint(cellView.model.getBBox().center()); // ??

			if(cellViewsBelow.length) {
				// if there are items below
				var cellViewBelow = _.find(cellViewsBelow, function(c) { return c.model.id !== cellView.model.id});
				// finds the first model within below that isn't itself

				if(cellViewBelow && cellViewBelow.model.get('parent') !== cellView.model.id) {
					cellViewBelow.model.embed(cellView.model);
				}
			}
		}.bind(this));


		paper.on('cell:pointerdown', function (cellView) {

			if(cellView.model.isLink()) {
				return; // return if it is a link
			}

			// Below is code related to resizing the box
			// var box = cellView.model.getBBox();
			// // assuming upper the x and y are the upper left side
			// var range_X = [box.x, box.x + box.width];
			// var range_Y = [box.y, box.y + box.height];

			// // upper-left
			// if(this.state.mouseX - range_X[0] > 0 && this.state.mouseX - (range_X[0] + 20) < 0
			// 	&& this.state.mouseY - range_Y[0] > 0 && this.state.mouseY - (range_Y[0] + 20) < 0) {
			// 	// in upper-left corner spot
			// 	console.log('entering into it being upper-left');
			// 	this.setState({
			// 		corner: true
			// 	});
			// }

			// if(this.state.corner) {
			// 	console.log('entering');
			// 	cellView.resize(this.state.mouseX, this.state.mouseY);
			// 	cellView.model.attr({
			// 		position: {x: this.state.mouseX, y: this.state.mouseY},
			// 		size: {width: box.x + this.state.mouseX, height: box.y + this.state.mouseY}
			// 	});
			// } else {
			// 	this.setState({
			// 		corner: false
			// 	})
			// }


			if(!cellView.model.get('embeds') || cellView.model.get('embeds').length === 0) {
				//Show the dragged elements above all the other cells
				cellView.model.toFront(); // move to front
			}

			// if the cell already has a parent
			if(cellView.model.get('parent')) {
				// unembedding that cell to its parent (?)
				this.props.graph.getCell(cellView.model.get('parent')).unembed(cellView.model);
			}

			// this passes the curren back up to App.jsx
			this.props.getCur(cellView);

	   	this.setState({
	   		current: cellView
	     	});
	  	}.bind(this));

			this.setState({
				paper: paper
			});
	}

	/*
	 * @name: displayConnection
	 * @input: n/a
	 * @output: displays the most recent connection made
	 */

	displayConnection() {
		this.props.graph.on('change:source change:target', function(link) {
	    var sourcePort = link.get('source').port;
	    var sourceId = link.get('source').id;
	    var targetPort = link.get('target').port;
	    var targetId = link.get('target').id;

	    var m = [
	        'The port <b>' + sourcePort,
	        '</b> of element with ID <b>' + sourceId,
	        '</b> is connected to port <b>' + targetPort,
	        '</b> of elemnt with ID <b>' + targetId + '</b>'
	    ].join('');
    
	    out(m);
		});

		function out(m) {
	    $('#paper-link-out').html(m);
		}
	}

	/*
	 * @name: setupGraph
	 * @input: n/a
	 * @output: sets up the event-handlers for the graph
	 */

	setupGraph() {
		this.props.graph.on('add', (cell) => {
			if(cell.isLink()) {
				return; // return if it is a link
			}
			// this.props.updops(this.props.ops.concat([cellItem]));
			this.props.updops(cell, 'add');

		});



		this.props.graph.on('remove', (cell) => {
			var arr = [];
			var found = false;
			this.props.updops(cell, 'remove');
		});
	}

	render() {
		return (
			<div>
				<div id="myholder"></div>
				<div id="paper-link-out"></div>
			</div>
		)
	}

}

export default Diagram;