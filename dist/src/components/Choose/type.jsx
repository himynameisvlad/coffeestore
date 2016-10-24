import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

import { Grades } from './grades.jsx'

@observer
export class Type extends React.Component {
	constructor() {
		super()
	}

	changeCustomisable(to) {
		this.props.currentProduct.customisable = to
		this.props.recalcTotal()
	}

	render() {

		const currentProduct = this.props.currentProduct

		const oneGradeClass = classNames('product__type-item product__list-item product__type-item--one', {active: (!currentProduct.customisable) })
		const moreGradesClass = classNames('product__type-item product__list-item product__type-item--sev', {active: (currentProduct.customisable), hidden: (!currentProduct.custom) })

		return (
			<div className="col-sm-4">
				<div className="product__type">
					<h5 className="product__subtitle">Выберите тип</h5>
					<ul className="product__type-list product__list">
						<li data-type="2" onClick={this.changeCustomisable.bind(this, true)} className={moreGradesClass}><i className="product__type-check"></i> Смешать несколько сортов</li>
						<li data-type="1" onClick={this.changeCustomisable.bind(this, false)} className={oneGradeClass}><i className="product__type-check"></i> Один сорт</li>
					</ul>
				</div>
				<Grades
					currentProduct={currentProduct}
					recalcTotal={this.props.recalcTotal}/>
			</div>
		)
	}
}