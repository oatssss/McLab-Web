import AT from '../constants/AT';
import Dispatcher from '../Dispatcher';

function addPopup(popup) {
  Dispatcher.dispatch({
    action: AT.EDITOR.MARKER_POPUP.ADD,
    data: { popup }
  });
}

function setPopup(popup) {
  Dispatcher.dispatch({
    action: AT.EDITOR.MARKER_POPUP.SET,
    data: { popup }
  });
}

function removePopup(popup) {
  Dispatcher.dispatch({
    action: AT.EDITOR.MARKER_POPUP.REMOVE,
    data: { popup }
  });
}

export default {
  addPopup,
  setPopup,
  removePopup
}
