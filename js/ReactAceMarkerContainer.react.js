/**
 * Created by othnielcundangan on 2016-10-05.
 */

import {Container} from 'flux/utils';
import React from 'react';
import ReactAceMarker from './ReactAceMarker.react';
import EditorMarkerStore from './stores/EditorMarkerStore';
import OpenFileStore from './stores/OpenFileStore';

const { PropTypes, Component } = React;

class ReactAceMarkerContainer extends Component {

    static getStores() {
        return [
            EditorMarkerStore,
            OpenFileStore
        ];
    }

    static calculateState(prevState) {
        console.log("CALC MARKER CONTAINER");
        let markerData = EditorMarkerStore.get(OpenFileStore.getFilePath());
        let markers = markerData ? markerData.markers : undefined;
        let visible = markerData ? markerData.visible : undefined;
        console.log(`Markers: ${markers}, Visible: ${visible}`);
        return {
            markers,
            visible
        };
    }

    render() {
        console.log(`RENDER MARKER CONTAINER: Visible = ${this.state.visible}`);
        // const r = this.props.editor ? this.props.editor.renderer : undefined;
        const editorElement = document.getElementById('editor');
        const r = editorElement !== undefined ? ace.edit(editorElement).renderer : undefined;

        let markers = [];
        if (r !== undefined && this.state.markers !== undefined && this.state.visible) {
            for (let [markerType, markerList] of this.state.markers) {
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
