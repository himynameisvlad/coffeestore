import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

@observer
export default class Extra extends React.Component {
    constructor() {
        super();
    }

    onChooseExtra(extra, index) {
        console.log(this.props);
        const choosen = this.props.choosenExtra;
        if(choosen.indexOf(extra) === -1){
            choosen.push(extra);
        }else {
            choosen.map((ex, i) => {
                if(ex === extra) {
                    choosen.splice(i, 1);
                    return;
                }
            });
        }
        this.props.recalcTotal()

    }

    render() {
        const extra = this.props.extra;

        return(
            <div>
                <h5 className="product__subtitle">Выберите добавки</h5>
                <ul className="product__extra-list product__list">
                    {
                        extra.map((ex, i) => {
                            const extraClass = classNames('product__extra-item product__list-item', {active: this.props.choosenExtra.indexOf(ex) !== -1});
                            return (<li onClick={this.onChooseExtra.bind(this, ex, i)} key={`extra-${i}`} className={extraClass}><i className="product__type-check"></i>{ex.title}</li>);
                        })
                    }
                </ul>
            </div>
        );
    }
}