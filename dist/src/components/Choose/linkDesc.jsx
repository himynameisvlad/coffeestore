import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class LinkDesc extends React.Component {
    constructor() {
        super();
    }

    popUpDesc() {
        $('#desc-product__modal').modal('show')
    }

    render() {
        const {linkD, desc} = this.props;
        if(linkD && desc) {
            return(
                <div className="product__descr">
                    <a href="#" onClick={this.popUpDesc}><i className="product__descr">?</i> {linkD}</a>
                </div>
            );
        }else {
            return null;
        }
    }
}