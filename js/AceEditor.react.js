import EditorMarkerStore from './stores/EditorMarkerStore';
import EditorMarkerActions from './actions/EditorMarkerActions';
import React from 'react';
import Immutable from 'immutable';
import request from 'superagent';
import OnLoadActions from './actions/OnLoadActions';
import OpenFileStore from './stores/OpenFileStore';
import InterfaceActions from './actions/InterfaceActions';
import MouseListenerActions from './actions/MouseListenerActions';
import ReactAceMarkerContainer from './ReactAceMarkerContainer.react';
import Dispatcher from './Dispatcher';
import AT from './constants/AT';
import ReactDOM from 'react-dom';

const aceRange = ace.require('ace/range').Range;
const aceEvent = ace.require("ace/lib/event");

const {PropTypes, Component} = React;

class AceEditor extends Component {

  _configureEditor() {
    const editor = ace.edit('editor');
    editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setMode("ace/mode/matlab");
    editor.setAnimatedScroll(true);
    editor.setShowPrintMargin(false);
    editor.$blockScrolling = Infinity;
    editor.commands.addCommand(saveCommand);
    // Attach MouseListenerActions to corresponding events
    aceEvent.addListener(editor.renderer.scroller, "mousemove", (event) => MouseListenerActions.onMouseMove(event, editor));
    // Set a handler for editor changes
    editor.on("change", (event) => this._editorOnChange(event, editor));
    this.editor = editor;
    this.markerIDs = Immutable.Set();
    window.debug_editor = editor;
  }

  _setEditorText() {
    this.editor.setValue(this.props.codeText);
    this.editor.navigateFileStart();
  }

  _editorOnChange(event, editor) {
    if (!Dispatcher.isDispatching()) {
      // Make sure the editor component gets the updated prop
      // Dispatcher.dispatch({
      //   action: AT.FILE_CONTENT.DATA_LOADED,
      //   data: {
      //     filepath: OpenFileStore.getFilePath(),
      //     success: true,
      //     fileContents: editor.getValue(),
      //   },
      // });

      // Hide the markers as soon as the user starts changing the code
      console.log(`FILESTORE: ${OpenFileStore.getFilePath()}`);
      EditorMarkerActions.hide(OpenFileStore.getFilePath());
    }
  }

  _renderMarkers() {
    console.log("CALL TO RENDER MARKERS");
    this.markerIDs.forEach(
      id => this.editor.session.removeMarker(id)
    );
    if (!this.props.markerData || !this.props.markerData.visible) {
      return;
    }
    for (let markerGroup of this.props.markerData.markers) {
      const markerClass = markerGroup[0];
      const markerList = markerGroup[1];
      for (let markerObject of markerList) {
        const id = this.editor.session.addMarker(
            markerObject.position,
            `${markerClass} marker-range-${markerObject.position.start.row}-${markerObject.position.start.column}`,
            'text'
        );
        this.markerIDs = this.markerIDs.add(id);
      }
    }
  }

  componentDidMount() {
    this._configureEditor();
    this._setEditorText();
    this._renderMarkers();
  }

  componentDidUpdate(prevProps) {
    console.log("AceEditor DidUpdate");
    if (this.editor.getValue() !== this.props.codeText) {
      this._setEditorText();
    }

    if (prevProps.sidePanelOpen !== this.props.sidePanelOpen) {
      // This is a huge hack. The side panel must finish rendering before
      // the editor container can know its true size.
      // This is the glorious day when we run into a concurrency bug in javascript
      setTimeout(() => this.editor.resize(), 0);
    }

    this._renderMarkers();
  }

  render() {
    console.log("AceEditor RENDER");
    return (
      <div className="ace-container" onKeyDown={this.props.onKeyDown}>
        <div id="editor"></div>
        <ReactAceMarkerContainer />
      </div>
    );
  }

}

AceEditor.propTypes = {
  codeText: PropTypes.string.isRequired,

   // This prop is required because opening or closing the side panel
   // triggers an editor refresh. Otherwise the editor does not resize
   // properly.
  onKeyDown: PropTypes.func,
  sidePanelOpen: PropTypes.bool.isRequired,
  markerData: PropTypes.instanceOf(EditorMarkerStore.getRecordType()),
}

// FIXME: substring(10) is a hack to get rid of 'workspace/'
const saveCommand = {
  name: "saveFile",
  bindKey: {win: "Ctrl-s", mac: "Command-s"},
  exec: function(editor) {
    const baseURL = window.location.origin;
    const sessionID = OnLoadActions.getSessionID();
    const filePath = OpenFileStore.getFilePath();

    if (filePath === null) {
      InterfaceActions.showMessage(
          "You need to open a file before attempting to save"
      );
      return;
    }
    request.post(baseURL + '/save/' + filePath.substring(10))
        .set({SessionID: sessionID})
        .send({
          write: editor.getValue()
        })
      .end(function(err, res) {
        if (err) {
          console.error(err);
        }
        else {
          InterfaceActions.showMessage(`Successfully saved '${filePath.substring(10)}'`);
        }
      });
  }
}

export default AceEditor;
