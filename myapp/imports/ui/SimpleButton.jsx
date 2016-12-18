import React from 'react';
import { render } from 'react-dom';

import joint from '../joint.js';

import Add from './simpleButtons/Add.jsx';
import Divide from './simpleButtons/Divide.jsx';
import Subtract from './simpleButtons/Subtract.jsx';
import Multiply from './simpleButtons/Multiply.jsx';
import Input from './simpleButtons/Input.jsx';
import If from './simpleButtons/IfButton.jsx';
import MapButton from './simpleButtons/MapButton.jsx';

class SimpleButton extends React.Component {

	//this component is a button, and if it's clicked, then it should create a new SVG element on the graph
	constructor(props) {
		super(props);

		this.state = {
			dupe : false,
			top: null,
			bott: null,
		}
	}

	render() {
		return (
		 <div>
		 		<span className='col-md-1 input-btn'><Input graph={this.props.graph} prev={this.props.prev}/></span>
		 		<span className='col-md-1 add-btn'><Add graph={this.props.graph} prev={this.props.prev}/></span>
		 		<span className='col-md-1 divide-btn'><Divide graph={this.props.graph} prev={this.props.prev}/></span>
		 		<span className='col-md-1 multiply-btn'><Multiply graph={this.props.graph} prev={this.props.prev}/></span>
		 		<span className='col-md-1 subtract-btn'><Subtract graph={this.props.graph} prev={this.props.prev}/></span>
		 		<span className='col-md-1 ifelse-btn'><If graph={this.props.graph} prev={this.props.prev}/></span>
		 		<span className='col-md-1 map-btn'><MapButton graph={this.props.graph} prev={this.props.prev}/></span>
		 </div>
			
		)
	}
}

export default SimpleButton;

