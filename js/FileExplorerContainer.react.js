import SelectedFileStore from './stores/SelectedFileStore';
import FileTreeStore from './stores/FileTreeStore'
import FileExplorerActions from './FileExplorerActions.js'
import {FileExplorer} from './FileExplorer.react';
import {Container} from 'flux/utils';
import {Component} from 'react';
import LS from './constants/LS'

type State = {
  tree: Object,
  selection: String,
};

class FileExplorerContainer extends Component {
  static getStores() {
    return [
      SelectedFileStore,
      FileTreeStore,
    ];
  }

  static calculateState(prevState) {
    return {
      // tree: {
      //   path: "Workspace",
      //   directories: [
      //     {
      //       path: 'Workspace/foo',
      //       directories: [
      //         {
      //           path: 'Workspace/foo/bar',
      //           directories: [],
      //           files: [],
      //         }
      //       ],
      //       files: [
      //         "one",
      //         "two",
      //         "three",
      //       ]
      //     }
      //   ],
      //   files: [
      //     'cholesky.m',
      //     'This title is so long it doesn\'t fit into this tiny sidebar',
      //     'pagerank.m',
      //   ]
      // },
      loadState: FileTreeStore.getLoadState(),
      tree: FileTreeStore.getFileTree(),
      selection: SelectedFileStore.getSelectionPath(),
    };
  }

  componentWillMount() {
    // Send out an ajax call to fetch the filetree
    FileExplorerActions.fetchFileTree();
  }

  render() {
    // LS.LOAD_ERROR should have special treatment
    if (this.state.loadState !== LS.LOADED) {
      return <pre>Loading...</pre>;
    }
    return (
      <FileExplorer
        tree={this.state.tree}
        selection={this.state.selection}
      />
    );
  }
}

export default Container.create(FileExplorerContainer);