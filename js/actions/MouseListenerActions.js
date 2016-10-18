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

/*
function _allElementsFromPoint(x, y) {
    var element, elements = [];
    var old_visibility = [];
    while (true) {
        element = document.elementFromPoint(x, y);
        if (!element || element === document.documentElement) {
            break;
        }
        elements.push(element);
        old_visibility.push(element.style.visibility);
        element.style.visibility = 'hidden'; // Temporarily hide the element (without changing the layout)
    }
    for (var k = 0; k < elements.length; k++) {
        elements[k].style.visibility = old_visibility[k];
    }
    elements.reverse();
    return elements;
}
*/

/*
function _firstElementFromPointOfClass(x, y, className) {
    var element, firstElement, elements = [];
    var old_visibility = [];
    while (true) {
        element = document.elementFromPoint(x, y);
        if (!element || element === document.documentElement) {
            break;
        }
        console.log(`${element.classList} FIND: ${className}`);
        if (element.classList.contains(className)) {
            firstElement = element;
            break;
        }
        elements.push(element);
        old_visibility.push(element.style.visibility);
        element.style.visibility = 'hidden'; // Temporarily hide the element (without changing the layout)
    }
    for (var k = 0; k < elements.length; k++) {
        elements[k].style.visibility = old_visibility[k];
    }
    return firstElement;
}
*/

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
    const pos = _relativePosition(x, y, editor);
    const allMarkers = EditorMarkerStore.getMarkers();

    if (allMarkers === undefined) {
        return markerInfo;
    }

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
