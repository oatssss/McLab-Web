import AT from './constants/AT';
import classnames from 'classnames';
import Dispatcher from './Dispatcher';
import React from 'react';
import SidePanelBase from './SidePanelBase.react';
import JSCompileActions from './actions/JSCompileActions'


const { PropTypes, Component } = React;

class JSCompilePanel extends Component {

  render() {
    if (this.props.fileIsOpen) {
      switch (this.props.fileType) {
        case 'js':
          return (
              <SidePanelBase title="Compile to JavaScript">
                <div className="side-panel-card">
                  This JavaScript file can be run in the browser; the output will be printed to the terminal.
                  It can also be downloaded.
                  <br /> <br /> <br />
                  <div className="js-compile-final-button-container">
                    <a
                        className="pure-button side-panel-button"
                        onClick={JSCompileActions.runCompiledJS}>
                      Run
                    </a>
                  </div>
                  <div className="js-compile-final-button-container">
                    <a
                        className="pure-button side-panel-button"
                        href={this.props.pathToDownload}>
                      Download
                    </a>
                  </div>
                </div>
              </SidePanelBase>
          );
          break;
        case 'matlab':
          return (
              <SidePanelBase title="Compile to JavaScript">
                <div className="side-panel-card">
                  This Matlab file can be compiled to JavaScript. Once compiled, switch to the generated JavaScript file in the file explorer to run or download it.
                  <div className="compile-final-button-container">
                    <a
                        className="pure-button side-panel-button"
                        onClick={JSCompileActions.sendCompilationRequest}>
                      Compile
                    </a>
                  </div>
                </div>
              </SidePanelBase>
          );
          break;
        default:
          return (
              <SidePanelBase title="Compile to JavaScript">
                <div className="side-panel-card">
                  Only Matlab files can be compiled to JavaScript.
                </div>
              </SidePanelBase>
          );
          break;

      }
    }
    else{
      return (
          <SidePanelBase title="Compile to JavaScript">
            <div className="side-panel-card">
              Please select a Matlab file using the file explorer on the left.
            </div>
          </SidePanelBase>
      );
    }
  }
}

JSCompilePanel.propTypes = {
  fileIsOpen: PropTypes.bool,
  fileType: PropTypes.string,
  pathToDownload: PropTypes.string
};

export default JSCompilePanel;
