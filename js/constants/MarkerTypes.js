/**
 * Created by othnielcundangan on 2016-10-15.
 */

import React from 'react';
import MarkerPopupStore from '../stores/MarkerPopupStore';

/* Prepend */
const pre = "ace-marker";

/* Marker Types */
const MT = {
    FUNC_UNDEFINED: `${pre}-undefined-function`,
}

/* Define suggested actions */
const defineInNewFile = {
    action: (event, popupRange) => {
        let popup = MarkerPopupStore.get(popupRange);
        console.log(`Creating '${popup.tokenName}.m'...`);
    },
    description: (marker) => {
        return `Define ${marker.name}() in a new file`;
    }
}

/* Marker Data */
const MD = {
    [MT.FUNC_UNDEFINED]: {
        message: (funcName) => (
            <span>
                <span style={{ color: 'red' }}>{funcName}</span> is a function that hasn't been defined in this workspace.
            </span>
        ),
        actions: [
            defineInNewFile
        ],
    }
}



export {
    MD,
    MT
}

export default MT;