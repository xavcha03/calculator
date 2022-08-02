import { buttonsList } from "./buttons.js";

export default class Calculator {
  constructor(calcElt) {
    this.calcElt = calcElt;
    this.addUIHtml();
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
      btnElt.addEventListener("click", (e) => {
        this.executeBtn(e.target.innerHTML);
      });
      groupbtn.appendChild(btnElt);
    });

    this.calcElt.appendChild(screen);
    this.calcElt.appendChild(groupbtn);
  }

  //
  executeBtn(btnValue) {
    //Effectue une action en fonction de la valeur
    //Commencer par détecter si c'est un nombre
    if (!isNaN(Number(btnValue))) {
      this.calculatorAddNum(btnValue);
    }
  }

  //ajoute un nombre en argument dans la zone de calcul
  calculatorAddNum(num) {
    let screen = document.querySelector("#screen");
    let currentScreenVal = Number(screen.innerHTML);
    console.log(currentScreenVal);
    currentScreenVal = currentScreenVal * 10 + num;
    screen.innerHTML = currentScreenVal;
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
}
