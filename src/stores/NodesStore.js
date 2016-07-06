/*
  Copyright 2015 Skippbox, Ltd

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import alt from 'src/alt';
import InitActions from 'actions/InitActions';
import NodesActions from 'actions/NodesActions';
import Immutable from 'immutable';
import immutableUtil from 'alt-utils/lib/ImmutableUtil';
// import { AsyncStorage } from 'react-native';

class NodesStore {

  constructor() {
    this.bindActions(InitActions);
    this.bindActions(NodesActions);
    this.state = Immutable.fromJS({
      nodes: {},
      status: {},
    });
  }

  onInitAppSuccess(appState) {
    if (appState.get(this.displayName)) {
      this.setState(appState.get(this.displayName));
      return true;
    }
    return false;
  }

  onFetchNodesStart(endpoint) {
    this.setState(this.state.setIn(['status', endpoint.get('url')], 'loading'));
  }

  onFetchNodesSuccess({endpoint, nodes}) {
    console.log('fetch nodes');
    this.setState(
      this.state.setIn(['nodes', endpoint.get('url')], nodes)
      .setIn(['status', endpoint.get('url')], 'success')
    );
  }

  onFetchNodesFailure(endpoint) {
    this.setState(this.state.setIn(['status', endpoint.get('url')], 'failure'));
  }

  static getStatus(endpoint) {
    return this.state.getIn(['status', endpoint.get('url')], 'success');
  }

  static getNodes(endpoint) {
    return this.state.getIn(['nodes', endpoint.get('url')], Immutable.List());
  }

}

export default alt.createStore(immutableUtil(NodesStore), 'NodesStore');