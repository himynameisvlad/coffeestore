import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

import { Type } from './type.jsx'
import LinkDesc from './linkDesc.jsx'
import Details from './details.jsx';
import Mill from './mill.jsx';
import Extra from './extra.jsx';
import Volume from './volume.jsx';

@observer
export class Single extends React.Component {

	render() {
		let currentProduct = this.props.currentProduct
		let productClass = classNames('store__product product', {hidden: (this.props.step !== 1)})
		let renderedSingleProduct = null;

		if(this.props.step === 1) {
			renderedSingleProduct = (
					<div className={productClass} >
						<div className="container">
							<div className="row">
								<div className="col-sm-4">
									<div className="product__image">
										<img src={currentProduct.img} alt="" />
									</div>
									<LinkDesc linkD={currentProduct.link_desc} desc={currentProduct.desc} />
								</div>
								<Type
									currentProduct={currentProduct}
									recalcTotal={this.props.recalcSingleTotal}/>
								<div className="col-sm-3 col-sm-offset-1">
									<Volume vol={currentProduct.vol}
											recalcTotal={this.props.recalcSingleTotal}
											defaultVol = {currentProduct.choosenVol}
											onVolumeChange={currentProduct.onVolumeChange}
											isVolumeActive={currentProduct.isVolumeActive}
											onDropVolume={currentProduct.dropVolumes} />
									<Extra 
										extra={currentProduct.extra}
										choosenExtra={currentProduct.choosenExtra}
										recalcTotal={this.props.recalcSingleTotal} />
									<Mill
										mills={currentProduct.mill}
										choosenMill={currentProduct.choosenMill}
										onChooseMill={currentProduct.onChooseMill}
										/>
								</div>
							</div>
						</div>
					</div>
				)
		}

		return renderedSingleProduct
	}
}