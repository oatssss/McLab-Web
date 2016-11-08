/**
 * Created by othnielcundangan on 2016-10-15.
 */

import React from 'react';

/* Marker Types */
const MT = {
    FUNC_UNDEFINED: 'undefined-function',
}

/* Define suggested actions */
const defineInNewFile = {
    action: (event, eventKey) => {
        markerClearingAction(/* markerType */)(() => {
            console.log(`Creating '${eventKey}.m'...`);
        });
    },
    description: (name) => {
        return `Define ${name}() in a new file`;
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

/* Helper Methods */
// An action that also clears the error associated with the marker from the marker store
function markerClearingAction(markerType) {
    return (
        (action) => {
            try {
                action();
            }
            catch (e) {

            }
            // Remove markers of markerType from marker store
        }
    );
}

export {
    MD,
    MT
}

export default MT;