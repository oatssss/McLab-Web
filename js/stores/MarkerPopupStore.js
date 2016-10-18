/**
 * Created by othnielcundangan on 2016-10-08.
 */

import { MapStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import AT from '../constants/AT';

class MarkerPopupStore extends MapStore {

    constructor(dispatcher) {
        super(dispatcher);
    }

    reduce(map, payload) {

        switch (payload.action) {

            case AT.EDITOR.MARKER_POPUP.ADD: {
                const popup = payload.data.popup;
                return map.set(popup.range.toString(), popup);
            }

            case AT.EDITOR.MARKER_POPUP.REMOVE: {
                const popup = payload.data.popup;
                return map.delete(popup.range.toString());
            }

            default:
                return map;
        }
    }

    getMarkerPopups() {
        return this.getState();
    }
}

module.exports = new MarkerPopupStore(Dispatcher);

export default new MarkerPopupStore(Dispatcher);