'use babel';

import TetrisGameView from './tetris-game-view';
import { CompositeDisposable } from 'atom';

export default {

  tetrisGameView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tetrisGameView = new TetrisGameView(state.tetrisGameViewState);
    this.tetrisGameView.init();
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tetrisGameView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tetris-game:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tetrisGameView.destroy();
  },

  serialize() {
    return {
      tetrisGameViewState: this.tetrisGameView.serialize()
    };
  },

  toggle() {
    console.log('TetrisGame was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
