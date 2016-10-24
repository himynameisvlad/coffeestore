import React from 'react';
import { observer } from 'mobx-react'
import classNames from 'classnames'

@observer
export class Footer extends React.Component {

	render() {
		let currentStep = this.props.step;
		let totalVisibility = currentStep === 0 || currentStep === 3 ? ' hidden' : '';

		let singleTotalClass = classNames('store-footer__sum', {hidden: currentStep !== 1});
		let cartExtraClass = classNames('store-footer__extra',{hidden: currentStep !== 2})

		let cartTotalElm = null;
		if(currentStep === 2 && this.props.cart.length !==0) {
			cartTotalElm = <div className='store-footer__sum'><span>{ this.props.cartTotal}</span> руб</div>
		}

		return(
			<footer className="store__footer store-footer">
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<div className={`store-footer__total${totalVisibility}`}>
								<h5 className="store-footer__title">Итог <span className={cartExtraClass}>(без учёта доставки)</span></h5>
								<div className={singleTotalClass}><span>{this.props.currentProduct.price}</span> руб</div>
								{cartTotalElm}
							</div>
						</div>
						<div className="col-sm-6">
							<div className="store-footer__btns">
								<a href="#" onClick={this.props.onPrevStep} className="store-footer__btn store-footer__btn--back"></a>
								<a href="#" data-page="0" onClick={this.props.onNextStep} className="store-footer__btn store-footer__btn--next">
									<span>{this.props.pages[currentStep].btn}</span><i className="store-footer__icon--next"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
			);
	}
}
