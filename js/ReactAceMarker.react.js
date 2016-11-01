/**
 * Created by othnielcundangan on 2016-10-05.
 */

import React from 'react';
import { Overlay, DropdownButton, MenuItem } from 'react-bootstrap';
import MarkerPopupActions from './actions/MarkerPopupActions';
import { MD } from './constants/MarkerTypes';

const { PropTypes, Component } = React;

class ReactAceMarker extends Component {

    constructor(props) {
        super(props);

        this._onHide = this._onHide.bind(this);
        // this._onExited = this._onExited.bind(this);

        this.state = {
            show: true,
            parentDiv: undefined,
            style: {
                position: 'absolute',
                left: this.props.left,
                top: this.props.top,
                width: this.props.width,
                height: this.props.height,
                pointerEvents: 'none'
            },
        }
    }

    _onHide() {
        this.setState({ show: false });
    }

    // _onExited() {
    //     // Destroy DOM element
    //     MarkerPopupActions.removePopup(this.props.popup);
    // }

    render() {
        let markerData = MD[this.props.type];
        let actions = markerData.actions;

        let actionDropdown;
        if (actions) {
            let buttons = actions.map( (btnData, i) => (
                <MenuItem
                    key={ i }
                    eventKey={ this.props.marker.position.toString() }
                    onSelect={ btnData.action }
                >
                    { btnData.description(this.props.marker) }
                </MenuItem>
            ));

            actionDropdown = (
                <div className="react-ace-marker-popup-dropdown-container" >
                    <DropdownButton
                        className="strip-margins"
                        title="Suggested Actions"
                        bsSize="xsmall"
                        id={ this.props.marker.position.toString() }
                    >
                        { buttons }
                    </DropdownButton>
                </div>
            );
        }

        // let style = Object.assign({}, this.state.style);
        // TODO: Add hover handler to reset the hoverTimeStamp and update MarkerPopupStore
        return (
            <div
                ref={(container) => this.container = container}
            >
                <div
                    className="marker-target"
                    ref={(target) => this.overlayTarget = target}
                    style={this.state.style}
                >
                </div>
                <Overlay
                    show={this.state.show}
                    rootClose={true}
                    onHide={this._onHide}
                    onExited={this._onExited}
                    placement="right"
                    container={this.container}
                    target={() => this.overlayTarget}
                    ref={(overlay) => this.overlay = overlay}
                >
                    <div className="react-ace-marker-popup">
                        <div className="message">
                            { markerData.message(this.props.marker.name) }
                        </div>
                        { actionDropdown }
                    </div>
                </Overlay>
            </div>
        );
    }
}

ReactAceMarker.propTypes = {
    marker: PropTypes.object,
};

export default ReactAceMarker;
