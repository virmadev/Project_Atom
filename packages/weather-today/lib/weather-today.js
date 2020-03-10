'use babel';

import WeatherTodayView from './weather-today-view';
import { CompositeDisposable } from 'atom';

import request from 'request'
var weather = require('weather-js');


export default {


  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'weather-today:getWeather': () => this.getWeather()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  getWeather() {
    console.log('WeatherToday was toggled!');
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      weather.find({search: selection, degreeType: 'C'}, function(err, result) {
        if(err) {

          atom.notifications.addWarning("City not found, please check your selection");
        }
        else {
          var json = JSON.stringify(result, null, 2)
          var obj = JSON.parse(json);
          console.log(obj);
          var resultString = "****************************\n" + obj[0].current.date + "\n" + obj[0].current.observationpoint
          + "\nTemperature: " + obj[0].current.temperature + " C, " + obj[0].current.skytext + "\nHumidity: " +
          obj[0].current.humidity + "\nWindspeed: " + obj[0].current.windspeed + "\n****************************"
          atom.notifications.addSuccess("WeatherToday",{detail: resultString});
        }
      });
    }
  }
};
