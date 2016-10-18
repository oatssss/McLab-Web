/**
 * Created by othnielcundangan on 2016-10-05.
 */

import React from 'react';
import { Overlay, DropdownButton, MenuItem } from 'react-bootstrap';
import MarkerPopupActions from './actions/MarkerPopupActions';
import { MD } from './constants/MarkerTypes';

const { PropTypes, Component } = React;

class MarkerPopup extends Component {

    constructor(props) {
        super(props);

        this._onHide = this._onHide.bind(this);
        this._onExited = this._onExited.bind(this);

        this.state = {
            show: true
        }
    }

    _onHide() {
        this.setState({ show: false });
    }

    _onExited() {
        // Destroy DOM element
        MarkerPopupActions.removePopup(this.props.popup);
    }

    render() {
        let markerData = MD[this.props.popup.type];
        let actions = markerData.actions;

        let actionDropdown;
        if (actions) {
            let buttons = actions.map( (btnData, i) => (
                <MenuItem
                    key={ i }
                    eventKey={ this.props.popup.range.toString() }
                    onSelect={ btnData.action }>
                    { btnData.description(this.props.popup) }
                </MenuItem>
            ));

            actionDropdown = (
                <div className="popup-actions">
                    <DropdownButton
                        title="Suggested Actions"
                        bsSize="xsmall"
                        id={ this.props.popup.range.toString() }
                    >
                        { buttons }
                    </DropdownButton>
                </div>
            );
        }

        // TODO: Add hover handler to reset the hoverTimeStamp and update MarkerPopupStore
        return (
            <div className="marker-popup">
                <Overlay
                    show={this.state.show}
                    rootClose={true}
                    onHide={this._onHide}
                    onExited={this._onExited}
                    placement="right"
                    container={this}
                    target={() => document.querySelector(`.marker-range-${this.props.popup.range.row}-${this.props.popup.range.col}`)}
                >
                    { actionDropdown }
                </Overlay>
            </div>
        );
    }
}

MarkerPopup.propTypes = {
    popup: PropTypes.object,
};

export default MarkerPopup;
