import FileExplorerContainer from './FileExplorerContainer.react';
import CodeContainer from './CodeContainer.react';
import TerminalContainer from './TerminalContainer.react';
import TopNavContainer from './TopNavContainer.react';
import SidePanelContainer from './SidePanelContainer.react';
import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Dispatcher from './Dispatcher';
import AT from './constants/AT';
import OnLoadActions from './actions/OnLoadActions';
import ReactAceMarkerContainer from './ReactAceMarkerContainer.react';
import AceEditor from './AceEditor.react';

var McLabWeb = React.createClass({
  render: function() {
    return (
      <div>
        <TopNavContainer />
        <div className="body-container">
          <FileExplorerContainer />
          <SidePanelContainer />
          <div className="middle-container">
            <CodeContainer />
            {/*<TerminalContainer />*/}
          </div>
        </div>
      </div>
    );
  },

  // componentDidMount(){
  //   OnLoadActions.retrieveShortenedLink();
  // }
});

function callback(root) {
    // let editorElement = document.getElementById('editor');
    // let aceContentElement = root.querySelector('.ace_content');
    // console.log(aceContentElement);
    // ReactDOM.render(
    //     <ReactAceMarkerContainer editor={ace.edit('editor')}/>,
    //     aceContentElement
    // )
}

ReactDOM.render(
  <McLabWeb ref={callback}/>,
  document.getElementById('app-container')
);
