import React from 'react';
import { render } from 'react-dom';

import joint from '../../joint.js';
import createHtml from '../htmlTemplateElement.js';

class Input extends React.Component {
	constructor(props) {
		super(props);

		this.state ={
			input: 0
		};
	}

	componentDidMount() {
		// used in createInput
		getValues = this.getValues.bind(this);
	}

	getValues (val) {
		// set the state in App
		this.props.getIn(val);

		this.setState({
			input: val
		});
	}

	createInput() {

		// Code Below was for if we wanted to add HTML to each box
		// var htmlElem = createHtml('input');
		// var input2 = new htmlElem.Element({
		// 	position: { x: 100, y: 100 },
		  //     size: { width: 300, height: 100 },
		  //     attrs: {
		  //       '.label': { text: '', 'ref-x': .5, 'ref-y': .2 },
		  //       rect: { fill: '#2ECC71' }
				//     }
		// });
		// input2.set('inPorts', ['newIn1']);

    var input = new joint.shapes.devs.Model({
        position: { x: 35, y: 10 },
		    size: { width: 100, height: 100 },
		    outPorts: ['out'],
		    ports: {
		        groups: {
		            // 'in': {
		            //     attrs: {
		            //         '.port-body': {
		            //             fill: '#16A085',
		            //             r: '5'
		            //         }
		            //     }
		            // },
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

   

		input.attr('.label/text', 'Input: ' + this.state.input.toString());
		this.props.graph.addCells([input]);
	}



	render() {
		return (
			<span onClick={this.createInput.bind(this)}>Input</span>
		)
	}
}

export default Input;