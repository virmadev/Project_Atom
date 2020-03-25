'use babel';

import DrinkWaterBotView from './drink-water-bot-view';
import { CompositeDisposable, Disposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable(
      // Add an opener for our view.
      atom.workspace.addOpener(uri => {
        if (uri === 'atom://drink-water-bot') {
          return new DrinkWaterBotView();
        }
      }),

      // Register command that toggles this view
      atom.commands.add('atom-workspace', {
        'drink-water-bot:toggle': () => this.toggle()
      }),

      // Destroy any ActiveEditorInfoViews when the package is deactivated.
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof DrinkWaterBotView) {
            item.destroy();
          }
        });
      })
    );
  },
  deserializeDrinkWaterBotView(serialized) {
    return new DrinkWaterBotView();
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  toggle() {
     atom.workspace.toggle('atom://drink-water-bot');
   }

};
