import EditorMarkerStore from './stores/EditorMarkerStore';
import React from 'react';
import Immutable from 'immutable';
import request from 'superagent';
import OnLoadActions from './actions/OnLoadActions';
import OpenFileStore from './stores/OpenFileStore';
import InterfaceActions from './actions/InterfaceActions';

const aceRange = ace.require('ace/range').Range;

const {PropTypes, Component} = React;

class AceEditor extends Component {

  _configureEditor() {
    const editor = ace.edit('editor');
    editor.setTheme("ace/theme/tomorrow");
    editor.getSession().setMode("ace/mode/matlab");
    editor.setAnimatedScroll(true);
    editor.setShowPrintMargin(false);
    editor.$blockScrolling = Infinity;
    // Add custom editor commands
    editor.commands.addCommand(saveCommand);
    this.editor = editor;
    this.markerIDs = Immutable.Set();
    window.debug_editor = editor;
  }

  _setEditorText() {
    this.editor.setValue(this.props.codeText);
    this.editor.navigateFileStart();
  }

  _renderMarkers() {
    this.markerIDs.forEach(
      id => this.editor.session.removeMarker(id)
    );
    if (!this.props.markerData || !this.props.markerData.visible) {
      return;
    }
    for (let markerGroup of this.props.markerData.markers) {
      const markerClass = markerGroup[0];
      const markerList = markerGroup[1];
      for (let markerRange of markerList) {
        const range = new aceRange(
          markerRange.startRow,
          markerRange.startColumn,
          markerRange.endRow,
          markerRange.endColumn,
        );
        // Use Ace anchors to allow marker to move with editor inserts/deletes
        range.start = this.editor.getSession().doc.createAnchor(range.start);
        range.end = this.editor.getSession().doc.createAnchor(range.end);
        // range.end.$insertRight = true; // Characters inserted directly after the end anchor don't extend the marker
        const id = this.editor.session.addMarker(range, markerClass, 'text');
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
    if (this.editor.getValue() !== this.props.codeText) {
      this._setEditorText();
    }

    if (prevProps.sidePanelOpen !== this.props.sidePanelOpen) {
      // This is a huge hack. The side panel must finish rendering before
      // the editor container can know its true size.
      // This is the glorious day when we run into a concurrency bug in javascript
      setTimeout(() => this.editor.resize(), 0);
    }

    if (prevProps.markerData !== this.props.markerData) {
      this._renderMarkers();
    }
  }

  render() {
    return (
      <div className="ace-container" onKeyDown={this.props.onKeyDown}>
        <div id="editor"></div>
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
        .send({write:editor.getValue()})
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
