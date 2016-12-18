import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

class AccountsUIWrapper extends React.Component {
	componentDidMount() {
		this.view = Blaze.render(Template.loginButtons,
			ReactDOM.findDOMNode(this.refs.container)); 

		// the blaze component to be rendered, and the this.refs.container
	}

	componentWillUnmount() {
		// clean up the blaze view
		Blaze.remove(this.view);
	}

	render() {
		return (
			<span ref="container"></span>
		);
	}

}

export default AccountsUIWrapper;