import React from 'react'
import ReactDom from 'react-dom'

import store from '../store/MainStore'
import { observer } from 'mobx'


export default class CatsPage extends React.Component {

	render() {
		return (
				<ul className="store__list">
					<li></li>
				</ul>
			)
	}
}