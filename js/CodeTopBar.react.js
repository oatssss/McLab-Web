import {PropTypes, Component} from 'react';

class CodeTopBar extends Component {
  render() {
    return (
      <div className="code-top-bar">
        <div className="title-container">
          {this.props.selectionPath}
        </div>
      </div>
    );
  }
}

CodeTopBar.propTypes = {
  selectionPath: PropTypes.string.isRequired,
  selectionType: PropTypes.string.isRequired,
};

export default CodeTopBar;