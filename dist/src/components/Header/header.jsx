import React from 'react';

export class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	onCartClick(e) {
		e.preventDefault();
		this.props.onCartClick();
	}
	
	render() {
		let title = this.props.step !== 1 ? this.props.pages[store.step].title : this.props.productTitle;

		return(
			<header className="store__header store-header">
				<div className="container">
					<div className="row">
						<div className="col-sm-3">
							<a href="#" className="store-header__close" onClick={this.props.close}>
								<i className="store-header__close--icon store-header__icon"></i> Вернуться на сайт
							</a>
						</div>
						<div className="col-sm-6">
							<h3 className="store-header__title">{title}</h3>
						</div>
						<div className="col-sm-3">
							<a onClick={this.onCartClick.bind(this)} href="/cart.html" className="store-header__cart">
								<i className="store-header__cart--icon store-header__icon"></i> Корзина
							</a>
						</div>
					</div>
				</div>
			</header>
			);
	}
}
