import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

@observer
export default class Volume extends React.Component {
    constructor() {
        super();

    }

    onChooseVolume(vol) {
        this.props.onVolumeChange(vol);
        this.props.onDropVolume();
        this.props.recalcTotal();
    }

    render() {
        const vols = this.props.vol;
        const defaultVol = vols[0] ? this.props.defaultVol : '';
        const volClass = classNames('product__vol', {hidden: vols && (vols.length === 0)});
        const volDropClass = classNames('product__vol-window', {active: this.props.isVolumeActive})
        return(
            <div className={volClass}>
                <h5 className="product__subtitle">Выберите вес</h5>
                <div onClick={this.props.onDropVolume} className={volDropClass}><span>{defaultVol} г</span>
                    <ul className="product__vol-list">
                        {
                            vols.map((vol, i) => {
                                const volClass = classNames('product__vol-item');
                                return <li key={`vol-${i}`} onClick={this.onChooseVolume.bind(this, vol)} className={volClass}>{vol}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}