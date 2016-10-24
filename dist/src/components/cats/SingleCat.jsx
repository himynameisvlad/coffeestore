import React from 'react';
import { observer } from 'mobx-react'
import classNames from 'classnames'


@observer
export default class SingleCat extends React.Component {
  constructor() {
    super();
  }

  render() {
    const props = this.props
    let classname = classNames('cat', {
      checked: (this.props.currentProduct.id == +this.props.id)
    })
    return(
      <div className={`${props.offset}`}>
        <article onClick={this.props.onChange} className={classname} data-id={props.id}>
          <div className="cat__img">
            <img src={props.img} alt="" />
          </div>
          <div className="cat__title">
            <h5>{props.title}</h5>
          </div>
          <div className="cat__descr">{props.desc}</div>
          <div className="cat__opt">
            <input type="checkbox" id={`cat__check--${props.slug}`} className="cat__check" />
            <label htmlFor={`cat__check--${props.slug}`} className="cat__label"><img className="cat__icon" src="assets/images/icon-check.svg" /></label>
          </div>
        </article>
      </div>
      );
  }
}
