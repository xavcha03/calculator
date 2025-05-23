import { buttonsList } from "./buttons.js";

const SPECIAL_ACTIONS = {
  '=': function () { this.execScreenContent(); },
  'C': function () { this.setScreenContent("0"); },
  'X²': function () {
    this.setScreenContent(Math.pow(Number(this.getScreenContent()), 2));
  },
  '<=': function () { this.backspaceScreen(); },
  '√': function () {
    const val = Number(this.getScreenContent());
    if (isNaN(val) || val < 0) {
      this.setScreenContent('Erreur');
    } else {
      this.setScreenContent(Math.sqrt(val));
    }
  },
  'π': function () {
    let contentPi = this.getScreenContent();
    if (contentPi === 'Erreur' || contentPi === '' || contentPi === '0') {
      this.setScreenContent(Math.PI);
    } else if (/[0-9)]$/.test(contentPi) || contentPi.endsWith(Math.PI)) {
      this.setScreenContent(contentPi + '*' + Math.PI);
    } else {
      this.setScreenContent(contentPi + Math.PI);
    }
  }
};

export default class Calculator {
  constructor(calcElt) {
    this.calcElt = calcElt;
    this.addUIHtml();
    // Ajout de la gestion du clavier
    document.addEventListener("keydown", (e) => {
      this.handleKeyboard(e);
    });
  }

  //Affiche la calculatrice dans l'élément du Dom sélectionné
  addUIHtml() {
    let screen = this.createSection("section", "screen", "calc__screen", "0");
    let groupbtn = this.createSection(
      "section",
      "buttonList",
      "calc__buttons",
      null
    );

    //Ajout des boutons dans la section btn
    buttonsList.forEach((btn) => {
      let btnElt = this.createSection(
        "button",
        null,
        "calc calc__btn calc__btn--" + btn.type,
        btn.content
      );
      // Ajout d'un attribut spécial pour le bouton backspace
      if (btn.content === '<=') {
        btnElt.setAttribute('data-action', 'backspace');
        btnElt.addEventListener("click", () => {
          this.executeBtn('<=');
        });
      } else {
        btnElt.addEventListener("click", (e) => {
          this.executeBtn(e.target.innerHTML);
        });
      }
      groupbtn.appendChild(btnElt);
    });

    this.calcElt.appendChild(screen);
    this.calcElt.appendChild(groupbtn);
  }

  //
  executeBtn(btnValue) {
    if (SPECIAL_ACTIONS[btnValue]) {
      SPECIAL_ACTIONS[btnValue].call(this);
    } else {
      this.addKeyOnScreen(btnValue);
    }
  }

  //Ajoute le contenu de la touche à l'écran
  addKeyOnScreen(key){
    let content = this.getScreenContent();
    if (this._shouldResetOnError(content, key)) content = '';
    if (this._isMaxLength(content)) return;
    if (this._isDoubleOperator(content, key)) return;
    if (this._isDoubleDot(content, key)) return;
    if(content=="0") content = "";
    // Gestion des opérateurs spéciaux
    if(key === '×') key = '*';
    if(key === '÷') key = '/';
    // Empêche d'ajouter <=, √, π à l'écran
    if(['<=','√','π'].includes(key)) return;
    this.setScreenContent(content+key);
  }

  //Execute le calcul affiché à l'écran
  execScreenContent(){
    let screenContent = this.getScreenContent();
    let result = this.computeResult(screenContent);
    this.setScreenContent(result);
  }

  //Modifie le contenu de l'écran
  setScreenContent(str){
    document.querySelector("#screen").innerHTML = str;
  }

  //récupere le contenu de l'écran
  getScreenContent(){
    return document.querySelector("#screen").innerHTML;
  }


  //Créé et retourne un element du dom
  createSection(type, id, className, content) {
    //Création de l'élément
    let domElement = document.createElement(type);
    //Ajout de l'id
    if (id) domElement.setAttribute("id", id);
    //Ajout des classes
    domElement.classList = className;

    //Ajout du contenu
    if (content) domElement.innerHTML = content;

    return domElement;
  }

  computeResult(str){
    try {
      // Remplacement des opérateurs spéciaux
      str = str.replace(/×/g, '*').replace(/÷/g, '/');
      // Remplacement de la virgule par un point (si besoin)
      str = str.replace(/,/g, '.');
      // Remplacement de pi par sa valeur numérique
      str = str.replace(/π/g, Math.PI);
      // Empêche l'exécution de code malicieux
      if(/[^0-9+\-*/().]/.test(str)) throw new Error('Erreur');
      let result = Function('"use strict";return (' + str + ')')();
      if(!isFinite(result) || isNaN(result)) throw new Error('Erreur');
      // Arrondi à 8 décimales max
      result = Math.round(result * 1e8) / 1e8;
      return result.toString();
    } catch(e) {
      return 'Erreur';
    }
  }
  
  // Efface le dernier caractère de l'écran
  backspaceScreen() {
    let content = this.getScreenContent();
    if (content.length > 1) {
      this.setScreenContent(content.slice(0, -1));
    } else {
      this.setScreenContent("0");
    }
  }

  // Gestion du clavier
  handleKeyboard(e) {
    const key = e.key;
    if (key >= '0' && key <= '9') {
      this.executeBtn(key);
    } else if (["+", "-", "*", "/", ".", "(", ")"].includes(key)) {
      this.executeBtn(key);
    } else if (key === "Enter" || key === "=") {
      this.executeBtn("=");
      e.preventDefault();
    } else if (key === "Backspace") {
      this.executeBtn("<=");
      e.preventDefault();
    } else if (key === "c" || key === "C") {
      this.executeBtn("C");
      e.preventDefault();
    }
    // Ajout possible : gestion de racine, pi, etc. via d'autres touches
  }

  // Méthodes utilitaires privées
  _shouldResetOnError(content, key) {
    return content === 'Erreur' && /[0-9]/.test(key);
  }
  _isMaxLength(content) {
    return content.length >= 16;
  }
  _isDoubleOperator(content, key) {
    return /[+\-*/.]$/.test(content) && /[+\-*/.]/.test(key);
  }
  _isDoubleDot(content, key) {
    return key === '.' && /\d*\.\d*$/.test(content.split(/[^\d.]/).pop());
  }
}


