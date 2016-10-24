import React from 'react'

export default class Details extends React.Component {

	render() {
		return(
				<div>
					<div id="desc-product__modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" className="modal fade">
						<div role="document" className="modal-dialog modal-sm">
							<div className="modal-content" dangerouslySetInnerHTML={{__html: this.props.descr}}></div>
						</div>
					</div>
					<div className="desc-product__overlay"></div>
				</div>
			)
	}
}