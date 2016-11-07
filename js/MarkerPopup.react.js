/**
 * Created by othnielcundangan on 2016-10-05.
 */

import React from 'react';
import { Overlay, DropdownButton, MenuItem } from 'react-bootstrap';
import { MD } from './constants/MarkerTypes';

const { PropTypes, Component } = React;

class MarkerPopup extends Component {

    constructor(props) {
        super(props);

        this._hide = this._hide.bind(this);
        this._show = this._show.bind(this);
        // this._onExited = this._onExited.bind(this);

        this.state = {
            show: false,
            style: {
                position: 'absolute',
                // left: this.props.left,
                // top: this.props.top,
                // width: this.props.width,
                // height: this.props.height,
                // pointerEvents: 'none'
            },
        }
    }

    _show() {
        this.setState({ show: true });
    }

    _hide() {
        this.setState({ show: false });
    }

    render() {
        let markerData = MD[this.props.type];
        let actions = markerData.actions;

        let actionDropdown;
        if (actions) {
            let buttons = actions.map( (btnData, i) => (
                <MenuItem
                    key={ i }
                    eventKey={ this.props.id }
                    onSelect={ btnData.action }
                >
                    { btnData.description(this.props.id) }
                </MenuItem>
            ));

            actionDropdown = (
                <div className="react-ace-marker-popup-dropdown-container" >
                    <DropdownButton
                        className="strip-margins"
                        title="Suggested Actions"
                        bsSize="xsmall"
                        id={this.props.id}
                    >
                        { buttons }
                    </DropdownButton>
                </div>
            );
        }

        // let style = Object.assign({}, this.state.style);
        // TODO: Add hover handler to reset the hoverTimeStamp and update MarkerPopupStore
        return (
            <Overlay
                show={this.state.show}
                rootClose={true}
                onHide={this._hide}
                placement="right"
                container={this.props.container}
                target={() => this.props.target}
            >
                <div className="react-ace-marker-popup">
                    <div className="message">
                        { markerData.message(this.props.id) }
                    </div>
                    { actionDropdown }
                </div>
            </Overlay>
        );
    }
}

MarkerPopup.propTypes = {
    marker: PropTypes.object,
};

export default MarkerPopup;
