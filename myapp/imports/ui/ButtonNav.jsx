import React from 'react';
import { render } from 'react-dom';

import SimpleButton from './SimpleButton.jsx';

class ButtonNav extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<SimpleButton graph={this.props.graph} prev={this.props.prev}
					getIn = {this.props.getIn}/>
			</div>
		)
	}
}

export default ButtonNav;