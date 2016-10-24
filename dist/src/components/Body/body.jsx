import React from 'react';

export class Body extends React.Component {
	constructor() {
		super();
		this.state = {
			title: 'Body'
		}
	}

		render() {

			return(
				<footer className="app__body">
					<h3>{ this.state.title }</h3>
				</footer>
				);
		}
}
