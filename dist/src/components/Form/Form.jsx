import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

@observer
export class Form extends React.Component {

	render() {
		let formRendered = null;

		if(this.props.step === 3) {
			formRendered = (
					<div className="container">
						<div className="row">
							<div className="col-xs-12">From</div>
						</div>
					</div>
				)
		}

		return formRendered;
	}
}