/**
 * Created by othnielcundangan on 2016-10-05.
 */

import {Container} from 'flux/utils';
import React from 'react';
import MarkerPopup from './MarkerPopup.react';
import MarkerPopupStore from './stores/MarkerPopupStore';

const { PropTypes, Component } = React;

class MarkerPopupContainer extends Component {

    static getStores() {
        return [
            MarkerPopupStore,
        ];
    }

    static calculateState(prevState) {
        return {
            popups: MarkerPopupStore.getMarkerPopups()
        };
    }

    render() {
        console.log(this.state.popups);
        let renderedPopups = [];
        this.state.popups.forEach( (popup, keyID) => {
            renderedPopups.push(
                <MarkerPopup
                    key={keyID}
                    popup={popup}
                />
            )});
        return (
            <div className="ace-marker-popup-container">
                { renderedPopups }
            </div>
        );
    }
}

MarkerPopupContainer.propTypes = {

};

export default Container.create(MarkerPopupContainer);
