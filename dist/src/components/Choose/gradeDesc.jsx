import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class gradeDesc extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <div id="desc-grade__modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" className="modal fade">
                    <div role="document" className="modal-dialog modal-sm">
                        <div className="modal-content"></div>
                    </div>
                </div>
                <div className="desc-product__overlay"></div>
            </div>
        );
    }
}