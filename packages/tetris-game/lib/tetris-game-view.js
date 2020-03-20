'use babel';

import ClassicTetris from './classic-tetris';

const fs = require('fs').promises;


export default class TetrisGameView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('tetris-game');

    // Create tetris element
    const tetrisCanvas = document.createElement('canvas');
    tetrisCanvas.id = 'tetris-canvas';
    tetrisCanvas.width = '520';
    tetrisCanvas.height = '600';

    const container = document.createElement('div');
    const playPauseButton = document.createElement('button');
    playPauseButton.id = 'start-stop-btn';
    playPauseButton.innerHTML = 'Play/Pause';
    const quitButton = document.createElement('button');
    quitButton.id = 'quit-btn';
    quitButton.innerHTML = 'End game';

    container.appendChild(playPauseButton);
    container.appendChild(quitButton);

    this.element.appendChild(tetrisCanvas);
    this.element.appendChild(container);

    this.tetrisGame = new ClassicTetris(tetrisCanvas);
    const tetrisGame = this.tetrisGame;
    playPauseButton.addEventListener('click', event => {
      const startLevel = 5;
      tetrisGame.setStartLevel(startLevel);
      tetrisGame.togglePlayPause();
      });
    quitButton.addEventListener('click', event => {
      tetrisGame.quit();
    });
  }

  async init() {
    this.topFive = await this.readHighscores();
    console.log(await this.readHighscores());
    this.renderHighscores(this.topFive);

    this.tetrisGame.on(ClassicTetris.GAME_OVER, event => {
      console.log("game over score: ", event.score);
      this.saveNewHighscore(event.score);
      this.updateHighscoreList();
    });
  }

  //Create highscore list element
  renderHighscores(topFive) {
    const container = document.createElement('div');
    container.id = 'highscore-list-container';
    const title = document.createElement('h2');
    title.innerHTML = 'Your High Scores';

    this.highscoreList = document.createElement('ol');
    const highscoreList = this.highscoreList;
    topFive.forEach((elem) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = elem.score;
      listItem.class = 'highscore-list-item'
      highscoreList.appendChild(listItem);
    });

    container.appendChild(title);
    container.appendChild(highscoreList);
    this.element.appendChild(container);
  }

  //Reads highscore list and returns top five scores sorted
  async readHighscores() {
    let data = await fs.readFile(__dirname+'/highscores.json');
    const highscores = JSON.parse(data).highscores;
    console.log("highscores ", highscores);

    highscores.sort((a, b) => b.score - a.score);
    while(highscores.length<5) {
      highscores.push({"score": 0});
    }
    let topFive = highscores.slice(0, 6);

    console.log("top five is ", topFive);
    return topFive;
  }

  async saveNewHighscore(score) {
    const changedIndex = this.topFive.findIndex(e => e.score < score);
    if (changedIndex === -1) return;

    const newScore = {"score": score};
    this.topFive.splice(changedIndex, 0, newScore);
    this.topFive.pop();

    const dataObj = {highscores: this.topFive};
    const data = JSON.stringify(dataObj);
    await fs.writeFile(__dirname+'/highscores.json', data);
  }

  updateHighscoreList() {
    const listItems = this.highscoreList.children;
    const listItemsArray = [].slice.call(listItems);

    listItemsArray.forEach((listItem, index) => {
      listItem.innerHTML = this.topFive[index].score;
    });
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {

  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
