'use babel';

import Drink_Water_Bot from '../lib/Drink_Water_Bot';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Drink_Water_Bot', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('Drink_Water_Bot');
  });

  describe('when the jDrink_Water_Bot:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.Drink_Water_Bot')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'Drink_Water_Bot:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.Drink_Water_Bot')).toExist();

        let Drink_Water_BotElement = workspaceElement.querySelector('.Drink_Water_Bot');
        expect(Drink_Water_BotElement).toExist();

        let Drink_Water_BotPanel = atom.workspace.panelForItem(Drink_Water_BotElement);
        expect(Drink_Water_BotPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'Drink_Water_Bot:toggle');
        expect(Drink_Water_BotPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.Drink_Water_Bot')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'Drink_Water_Bot:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let Drink_Water_BotElement = workspaceElement.querySelector('.Drink_Water_Bot');
        expect(Drink_Water_BotElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'Drink_Water_Bot:toggle');
        expect(Drink_Water_BotElement).not.toBeVisible();
      });
    });
  });
});
