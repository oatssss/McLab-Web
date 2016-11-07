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

        this.state = {
            show: false
        }
    }

    _show() {
        this.setState({ show: true });
        const visiblePopup = MarkerPopup.visiblePopup;
        if (visiblePopup !== undefined && visiblePopup !== this) {
            visiblePopup._hide();
        }
        MarkerPopup.visiblePopup = this;
    }

    _hide() {
        this.setState({ show: false });
        const visiblePopup = MarkerPopup.visiblePopup;
        if (visiblePopup !== undefined && visiblePopup === this) {
            MarkerPopup.visiblePopup = undefined;
        }
    }

    render() {
        let markerData = MD[this.props.type];
        let actions = markerData.actions;

        let actionDropdown;
        if (actions) {
            let buttons = actions.map( (btnData, i) => (
                <MenuItem
                    className="item"
                    key={ i }
                    eventKey={ this.props.name }
                    onSelect={ (event, eventKey) => {
                        this._hide();
                        btnData.action(event, eventKey);
                    }}
                >
                    { btnData.description(this.props.name) }
                </MenuItem>
            ));

            actionDropdown = (
                <div className="dropdown" >
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

        return (
            <Overlay
                show={this.state.show}
                rootClose={true}
                onHide={this._hide}
                placement="right"
                container={this.props.container}
                target={() => this.props.target}
            >
                <div className={`react-ace-marker-popup ${this.props.type}`}>
                    <div className="message">
                        { markerData.message(this.props.name) }
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
