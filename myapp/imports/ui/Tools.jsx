import React from 'react';
import { render, findDOMNode } from 'react-dom';

import { Meteor } from 'meteor/meteor';
import Accounts from './AccountsUIWrapper.jsx';
import ButtonNav from './ButtonNav.jsx';

import Run from './toolButtons/Run.jsx';
import Undo from './toolButtons/Undo.jsx';
import Save from './toolButtons/Save.jsx';
import Reset from './toolButtons/Reset.jsx';


class Tools extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			curr: 'Click Added Unit to Edit Fields',
			formVal: 0,
			editing: false,
			result: 0,
			placeHolder: ''
		}
	}

	componentDidMount() {
		this.renderForm = this.renderForm.bind(this);
		// console.log('props in save', this.props);
	}

	componentWillReceiveProps () {
		if(this.props.curr.length > 1 && this.state.editing) {
			this.props.curr[1].attr('.label/text', this.props.curr[0] + ': ' + this.state.formVal.toString());
			
			this.setState({
				editing: false
			});
		}
	}

	/*
	 * @name: renderForm
	 * @input: n/a
	 * @output: decides how many forms are needed (i.e. if-else would need two)
	 */

	renderForm() {
		if(this.props.curr[0] === 'IfElse') {
			return (
				<div>
					<div className="form-group">
						<label>If/Else </label>
							<input className="input-submit if-submit" placeholder="If Do"></input>
							<input className="input-submit else-submit" placeholder='Else Do'></input>
					</div>
				  <div className="map-form-btn" onClick={this.ifSubmit.bind(this)}>Submit</div>
				</div>
			)
		} else if (this.props.curr[0] === 'Model') {
			 	// textArea
			 	return (
				 	<div>
				 		<div className="form-group">
					    <label>Map Fn</label>
						    <textarea className="form-control" id="map-fn" placeholder={this.props.curr[2]} rows="6"></textarea>
					  </div>
					  <div className="map-form-btn" onClick={this.mapSubmit.bind(this)}>Submit</div>
				 	</div>
		 		)
		} else {
			return (
				<input className="input-submit" ref="textInput" placeholder={this.props.curr[2]}></input>
			)
		}
	}

	/*
	 * @name: ifSubmit
	 * @input: n/a
	 * @output: sets if/else values while adjusting css-styles
	 */

	ifSubmit() { // Needs to be cleand up *DRY
		// have a duplicate submit
		var ifVal = $.find('.if-submit')[0].value;
		var elseVal = $.find('.else-submit')[0].value;

		if(ifVal && elseVal) {
			this.setState({
				formVal: [ifVal, elseVal],
				editing: true
			});

			// send code back to App.jsx
			this.props.getIn([ifVal, elseVal]);
		} else if (!ifVal) {
			$('.if-submit')[0].value = 'Missing a value.';
			$('.if-submit').addClass('if-else-missing');
			setTimeout(() => {
				$('.if-submit').removeClass('if-else-missing');
				$('.if-submit')[0].value = ''
			}, 1000)
		} else {
			$('.else-submit')[0].value = 'Missing a value.';
			$('.else-submit').addClass('if-else-missing');
			setTimeout(() => {
				$('.else-submit').removeClass('if-else-missing');
				$find('.else-submit')[0].value = ''
			}, 1000)
		}
	}


	/*
	 * @name: mapSubmit
	 * @input: n/a
	 * @output: finds the iteratee fn and updates with it
	 */

	mapSubmit() {
		// a fn that will set the val to the text
		const mapInput = $.find('.form-control')[0].value;
		console.log('mapInput submitted is: ', mapInput);

		this.setState({
			formVal: mapInput,
			editing: true
		});

		this.props.getIn(mapInput);
	}

	/*
	 * @name: submit
	 * @input: event where the submit for the form was made
	 * @output: sets the input entered back to App.jsx
	 */

	submit(event) {
		event.preventDefault();
		const input = findDOMNode(this.refs.textInput).value;
		findDOMNode(this.refs.textInput).value = '';

		// sets the input into formVal in local state
		this.setState({
			formVal: input,
			editing: true
		});

		// send the input back up to App.jsx
		this.props.getIn(input);
	}

	

	render() {
		return (
			<div>
				<div className="navbar-save row"> 
					<Reset graph={this.props.graph} />
					<Run graph={this.props.graph} start={this.props.start} keys={this.props.keys} res={this.props.res}/>
					<Save graph={this.props.graph}/>
					<Undo graph={this.props.graph} last={this.props.last}/>
					<div className="col-md-8 profile">
						<Accounts/>
					</div>
				</div>

				<div className="navbar-btns row">
					<div className="col-md-1 form-btn">Enter: </div>
					<div className="act-form col-md-2">
						<form onSubmit={this.submit.bind(this)}>
							{this.renderForm()}
						</form>
					</div>

					<ButtonNav graph={this.props.graph} prev={this.props.prev} getIn={this.props.getIn} last={this.props.last}/>

					<div className="result-btn col-md-2">
						<span><b>Result: {this.props.output}</b></span>
					</div>
				</div>
			</div>
		)
	}
}

export default Tools;