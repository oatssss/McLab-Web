/**
 * Created by othnielcundangan on 2016-10-15.
 */

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
    description: (popup) => {
        return `Define ${popup.tokenName}() in a new file`;
    }
}

/* Marker Data */
const MD = {
    [MT.FUNC_UNDEFINED]: {
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