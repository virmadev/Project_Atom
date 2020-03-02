'use babel';

export default class Drink_Water_BotView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('Drink_Water_Bot');

    // Create message element
    const message = document.createElement('div');
    message.classList.add('message');
    this.element.appendChild(message);
    var timerClock = 0;
    var seconds = 0;
    var minutes = 0;
    var drinkMultiplier = 0.0428240740740741;
    var myInt = setInterval(function () {
        if (seconds == 60) {
          minutes++;
          seconds = 0;
        }
        if (minutes < 1){
          message.innerHTML = `
            <center><h2>${'Drink_Water_Bot'}</h2></center>
            <ul>
              <li> You have been coding ${seconds} seconds. You should have been drinking ${Math.round((timerClock * drinkMultiplier)*100)/100} milliliters of water.</li>
            </ul>
          `;
        }
        else {
          message.innerHTML = `
            <center><h2>${'Drink_Water_Bot'}</h2></center>
            <ul>
              <li> You have been coding ${minutes} minutes and ${seconds} seconds. You should have been drinking ${Math.round((timerClock * drinkMultiplier)*100)/100} milliliters of water.</li>
            </ul>
          `;
        }
      timerClock++;
      seconds++;
    }, 1000);



  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      // This is used to look up the deserializer function. It can be any string, but it needs to be
      // unique across all packages!
      deserializer: 'Drink_Water_Bot/Drink_Water_BotView'
    };
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
  }

  getElement() {
    return this.element;
  }
  getTitle() {
    // Used by Atom for tab text
    return 'Drink_Water_Bot';
  }

  getURI() {
    // Used by Atom to identify the view when toggling.
    return 'atom://Drink_Water_Bot';
  }
  getDefaultLocation() {
  // This location will be used if the user hasn't overridden it by dragging the item elsewhere.
  // Valid values are "left", "right", "bottom", and "center" (the default).
  return 'right';
  }

  getAllowedLocations() {
    // The locations into which the item can be moved.
    return ['right'];
  }

}
