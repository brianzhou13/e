import React from 'react';
import { render, findDOMNode } from 'react-dom';

import { Meteor } from 'meteor/meteor';

class Save extends React.Component {

	/*
	 * @name: save
	 * @input: n/a
	 * @output: stores the graph into the DB
	 */

	save() {
		// add the existing boardstate to the db
		var name = 'test-graph'; // need to make dynamic
		Meteor.call('db.savegraph', {graph: JSON.stringify(this.props.graph)}, name);
	}

	render() {
		return (
			<div className="save-btn col-md-1" onClick={this.save.bind(this)}>
				<span>Save</span>
			</div>
		)
	}
}

export default Save;