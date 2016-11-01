/**
 * Created by othnielcundangan on 2016-10-05.
 */

import AT from '../constants/AT';
import Dispatcher from '../Dispatcher';
import EditorMarkerStore from '../stores/EditorMarkerStore';
import MarkerPopupActions from '../actions/MarkerPopupActions';
import MarkerPopupStore from '../stores/MarkerPopupStore';
import { MC } from '../constants/MarkerTypes';
const aceRange = ace.require('ace/range').Range;

let delayTimer = 0;

function _relativePosition(x, y, editor) {
    const r = editor.renderer;
    const canvasRect = r.scroller.getBoundingClientRect();
    const offsetX = x + r.getScrollLeft() - canvasRect.left - r.$padding;
    const offsetY = y + r.getScrollTop() - canvasRect.top;
    const col = Math.round(offsetX / r.characterWidth);
    const row = Math.floor(offsetY / r.lineHeight);

    return {
        row: row,
        col: col
    };
}

function _getHoveredMarkerInfo(x, y, editor) {
    let markerInfo;
    const allMarkers = EditorMarkerStore.getMarkers();

    if (allMarkers === undefined) {
        return markerInfo;
    }

    const pos = _relativePosition(x, y, editor);

    // Label for-loop
    loop_markerClass:
        for (let [markerType, markerList] of allMarkers) {
            for (let marker of markerList) {
                if (marker.position.contains(pos.row, pos.col)) {
                    markerInfo = {
                        tokenName: marker.name,
                        type: markerType,
                        range: marker.position,
                        hoverTimeStamp: Date.now()
                    };
                    break loop_markerClass; // Use label (defined earlier) to terminate both for loops
                }
            }
        }

    return markerInfo;
}

function _processMarkerPopup(x, y, editor) {
    let popupInfo = _getHoveredMarkerInfo(x, y, editor);
    if (popupInfo !== undefined) {
        console.log(`NAME: ${popupInfo.tokenName} | TYPE: ${popupInfo.type}`);

        let prevPopup = MarkerPopupStore.get(popupInfo.range.toString());

        if (popupInfo !== undefined) {
            // Add a popup for this marker if it doesn't exist
            if (prevPopup === undefined) {
                MarkerPopupActions.addPopup(popupInfo);
            }
            // Otherwise, reset the hover time stamp
            else {
                prevPopup.hoverTimeStamp = Date.now();
                MarkerPopupActions.setPopup(prevPopup);
            }
        }
    }
    else {

    }
}

function onMouseMove(event, editor) {
    const x = event.clientX;
    const y = event.clientY;

    _processMarkerPopup(x, y, editor);

    // console.log(`X: ${x}, Y: ${y}\n${EditorMarkerStore.getMarkers()}`);

    // Determine if current mouse position is hovering over a highlight
    // Grab the popup information for that highlight marker
    // Construct a popup object and add it to the popup store
}

export default {
    onMouseMove
}
