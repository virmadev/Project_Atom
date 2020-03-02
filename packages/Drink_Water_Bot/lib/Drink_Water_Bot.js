'use babel';

import Drink_Water_BotView from './Drink_Water_Bot-view';
import { CompositeDisposable, Disposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable(
      // Add an opener for our view.
      atom.workspace.addOpener(uri => {
        if (uri === 'atom://Drink_Water_Bot') {
          return new Drink_Water_BotView();
        }
      }),

      // Register command that toggles this view
      atom.commands.add('atom-workspace', {
        'Drink_Water_Bot:toggle': () => this.toggle()
      }),

      // Destroy any ActiveEditorInfoViews when the package is deactivated.
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof Drink_Water_BotView) {
            item.destroy();
          }
        });
      })
    );
  },
  deserializeDrink_Water_BotView(serialized) {
    return new Drink_Water_BotView();
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
     atom.workspace.toggle('atom://Drink_Water_Bot');
   }

};
