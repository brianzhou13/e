import React from 'react';
import { render } from 'react-dom';

import { Meteor } from 'meteor/meteor';


class Undo extends React.Component {
	constructor(props){
		super(props);
	}

	revert() {
		if(this.props.last) {
			this.props.graph.fromJSON(JSON.parse(this.props.last));
		} else {
			if(Meteor.isClient) {
				alert('at furthest state');
			}
			console.log('at furthest state');
		}
	}

	render() {
		return(
			<div className="undo-btn col-md-1" onClick={this.revert.bind(this)}>
				<span>Undo</span>
			</div>
		)
	}

}

export default Undo;