import React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import GradeDesc from './gradeDesc.jsx';

@observer
export class Grades extends React.Component {
  constructor() {
    super()

  }


  plusHandler(grade) {

      let perc = grade.perc
      let currentProduct = this.props.currentProduct
      let allPerc = currentProduct.allPerc

      if( perc < 100 && allPerc < 100) {
          grade.perc += 10
          currentProduct.allPerc = allPerc + 10
          this.props.recalcTotal()
      }
  }

  minusHandler(grade) {
      let perc = grade.perc
      let currentProduct = this.props.currentProduct
      let allPerc = currentProduct.allPerc

      if( perc > 0) {
          grade.perc -= 10
          currentProduct.allPerc = allPerc - 10
          this.props.recalcTotal()
      }
  }

  chooseGrade(grade) {
    let currentGrade = this.props.currentProduct.singleGrade

    if (!currentGrade) {
      grade.checked = true
      this.props.currentProduct.singleGrade = grade
    }else if(!grade.checked && currentGrade !== grade) {
      currentGrade.checked = false
      grade.checked = true
        this.props.currentProduct.singleGrade = grade
    }
      this.props.recalcTotal()
  }

    showGradeDesc(grade) {
        const grModal = $('#desc-grade__modal');
        grModal.find('.modal-content').text(grade.desc)
        grModal.modal('show')
    }


  render() {
    
    let currentProduct = this.props.currentProduct
    const customClassess = classNames('prop-item__cust', {hidden: !currentProduct.customisable })
    const signleClassess = classNames('prop-item__single', {hidden: currentProduct.customisable })

    return(
      <div className="product__prop">
          <GradeDesc />
        <h5 className="product__subtitle">Выберите пропорции</h5>
        <ul className="product__prop-list">
            {
                currentProduct.grades.map((grade, index) => {
                    const singleIconClass = classNames('product__type-check', {active: (grade.checked) })
                    return (
                        <li key={grade.id} data-id={grade.id} className="product__prop-item prop-item"  >
                            <div className="prop-item__title">
                                <h6>{grade.title}</h6><a onClick={this.showGradeDesc.bind(this, grade)} href="#">подробнее</a>
                            </div>
                            <div className="prop-item__opts">
                                <div className={customClassess}>
                                    <button onClick={this.minusHandler.bind(this, grade)} className="prop-item__minus">-</button>
                                    <span>{`${grade.perc}%`}</span>
                                    <button onClick={this.plusHandler.bind(this, grade)} className="prop-item__plus">+</button>
                                </div>
                                <div data-index={index} data-id={grade.id} className={signleClassess} onClick={this.chooseGrade.bind(this, grade)}>
                                  <i className={singleIconClass}></i>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    </div>
      );
  }
}
