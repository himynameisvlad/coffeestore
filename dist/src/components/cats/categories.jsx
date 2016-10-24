import React, {Component} from 'react';
import { observer } from 'mobx-react'
import classNames from 'classnames'

import SingleCat from './SingleCat'

@observer
export class Categories extends Component {

  chooseCategory(event) {
    const catId = +$(event.currentTarget).data('id');
    let product = this.props.currentProduct;
    if(catId !== product.id) {
      this.props.setCurrentProduct(catId);
      setTimeout(()=>{
        $('#desc-product__modal').find('.modal-content').html(this.props.currentProduct.desc)
      }, 10)
    }
  }


  render() {
    let classnames = classNames('cats__container', {hidden: (this.props.step !== 0), })
    let categoriesRendered = null;

    if(this.props.step === 0) {
      categoriesRendered = (
                    <div className={classnames}>
                      <div className="container">
                        <div className="row">
                          <ul className="store__list">
                            { this.props.products.map( (cat, index) => {
                              let offset = index % 2 ? '' : ' col-sm-offset-1'
                              let offsets = classNames('col-sm-5', {
                                'col-sm-offset-1': (index % 2 === 0)
                              })

                              let classes = classNames('cat', {checked: (this.props.currentProduct.id === +cat.id)})
                              return (
                                <SingleCat 
                                      onChange={this.chooseCategory.bind(this)} 
                                      key={cat.id} 
                                      title={cat.title} 
                                      currentProduct={this.props.currentProduct}
                                      offset={offsets} 
                                      id={cat.id} 
                                      slug={cat.slug} 
                                      desc={cat.desc} 
                                      img={cat.img} />
                                )
                            }) }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
    }

    return categoriesRendered
  }
}
