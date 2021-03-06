import * as ModuleDom from './dom.js';


class ButtonClicked {

  constructor(buttonIdHtml) {
    this._buttonIdHtml = buttonIdHtml;
  }

  get buttonIdHtml() {
    return this._buttonIdHtml;
  }

  get run() {
    throw TypeError("Not implemented: method run")
  }

  get logButtonName() {
    console.log('Clicked button ID Html: ' + this.buttonIdHtml);
  }

}


// https://www.scriptol.com/html5/button-on-off.php
class ButtonOnOff extends ButtonClicked {

  constructor(buttonIdHtml, buttonIdStorage) {
    super(buttonIdHtml);
    this._buttonIdStorage = buttonIdStorage;
  }

  get buttonIdStorage() { return this._buttonIdStorage; }
  
  get run() {
    this.switchStyleAndStorageOnOff();
  }

  setStylePrevious() {
    browser.storage.local.get(this.buttonIdStorage).then((result) => {
      if (result[this.buttonIdStorage]){
        this.setStyleOn();
      } else {
        this.setStyleOff();
      }
    }, console.error);
  }

  switchStyleAndStorageOnOff() {
    let buttonOn = false;
    if(ModuleDom.isCheckedElementById(this.buttonIdHtml)) {
      this.setStyleOff();
      buttonOn = false;
    } else {
      this.setStyleOn();
      buttonOn = true;
    }
    let storingInfo = browser.storage.local.set({[this.buttonIdStorage]:buttonOn});
    storingInfo.then(() => {
      console.log('Stored ' + this.buttonIdStorage + ': ' + buttonOn);
    }, console.error);
  }

  setStyleOff(){
    this.setStyleColorLabelChecked('gray', 'lightgray', 'off', false);
  }

  setStyleOn(){
    this.setStyleColorLabelChecked('green', 'lightgreen', 'on', true);
  }

  setStyleColorLabelChecked(style, color, label, checked) {
    ModuleDom.getElementById(this.buttonIdHtml).style.background = style;
    ModuleDom.getElementById(this.buttonIdHtml).style.color = color;
    ModuleDom.getElementById(this.buttonIdHtml).textContent = label;
    ModuleDom.getElementById(this.buttonIdHtml).checked = checked;
  }

}


class ButtonOpenPaths extends ButtonOnOff {

  constructor() {
    const buttonIdHtml = 'buttonOpenPaths';
    const buttonIdStorage = 'buttonOpenPathsIsOn';
    super(buttonIdHtml, buttonIdStorage);
  }

}


class ButtonDecodeUrls extends ButtonOnOff {

  constructor() {
    const buttonIdHtml = 'buttonDecodeUrls';
    const buttonIdStorage = 'buttonDecodeUrlsIsOn';
    super(buttonIdHtml, buttonIdStorage);
  }

}


class ButtonOpenRules extends ButtonOnOff {

  constructor() {
    const buttonIdHtml = 'buttonOpenRules';
    const buttonIdStorage = 'buttonOpenRulesIsOn';
    super(buttonIdHtml, buttonIdStorage);
  }

}


export {
  ButtonDecodeUrls,
  ButtonClicked,
  ButtonOpenPaths,
  ButtonOpenRules
};
