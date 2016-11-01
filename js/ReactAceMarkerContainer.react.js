/**
 * Created by othnielcundangan on 2016-10-05.
 */

import {Container} from 'flux/utils';
import React from 'react';
import ReactAceMarker from './ReactAceMarker.react';
import MarkerPopupStore from './stores/MarkerPopupStore';
// import EditorMarkerStore from './stores/EditorMarkerStore';
import FileContentsStore from './stores/FileContentsStore';

const { PropTypes, Component } = React;

class ReactAceMarkerContainer extends Component {

    static getStores() {
        return [
            FileContentsStore,
            // MarkerPopupStore,
            // EditorMarkerStore
        ];
    }

    static calculateState(prevState) {
        return {
            // popups: MarkerPopupStore.getMarkerPopups(),
            // markers: EditorMarkerStore.getMarkers()
        };
    }

    render() {
        console.log("RENDER MARKER CONTAINER");
        const r = this.props.editor ? this.props.editor.renderer : undefined;

        let markers = [];
        if (this.props.markerData !== undefined && this.props.markerData.visible) {
            for (let [markerType, markerList] of this.props.markerData.markers) {
                for (let marker of markerList) {
                    const range = marker.position;
                    const left = range.start.column * r.characterWidth + r.gutterWidth - r.getScrollLeft() + r.$padding;
                    const top = range.start.row * r.lineHeight - r.getScrollTop();
                    const width = (range.end.column - range.start.column) * r.characterWidth;
                    const height = r.lineHeight;

                    markers.push(
                        <ReactAceMarker
                            key={marker.position.toString()}
                            type={markerType}
                            marker={marker}
                            left={left}
                            top={top}
                            width={width}
                            height={height}
                        />
                    );
                }
            }
        }
        return (
            <div className="react-ace-marker-container">
                { markers }
            </div>
        );
    }
}

ReactAceMarkerContainer.propTypes = {
    editor: PropTypes.object,
    markerData: PropTypes.object
};

export default Container.create(ReactAceMarkerContainer);
