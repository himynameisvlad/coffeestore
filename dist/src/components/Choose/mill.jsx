import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

@observer
export default class Mill extends React.Component {
    constructor() {
        super();
    }
    
    onChooseMill(mill) {
        if(mill !== this.props.choosenMill) {
            this.props.onChooseMill(mill);
        }
    }

    render() {
        const mills = this.props.mills;
        const millClass = classNames('', {hidden: mills && (mills.length === 0)});
        return(
            <div className={millClass}>
                <h5 className="product__subtitle">Выберите помол</h5>
                <ul className="product__mill-list product__list">
                    {
                        mills.map((mill, i) => {
                            const millClass = classNames('product__mill-item product__list-item', {active: this.props.choosenMill == mill});
                            return (<li
                                    onClick={this.onChooseMill.bind(this, mill)}
                                    key={`mill-${i}`} className={millClass}>
                                    <i className="product__type-check"></i>{mill}
                                </li>);
                            })
                    }
                </ul>
            </div>
        );
    }
}