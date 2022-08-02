import { buttonsList } from "./buttons.js";

export default class Calculator {
  constructor(calcElt) {
    this.calcElt = calcElt;
    this.addUIHtml();
  }

  //Affiche la calculatrice dans l'élément du Dom sélectionné
  addUIHtml() {
    let screen = this.createSection("section", "screen", "calc__screen", null);
    let groupbtn = this.createSection(
      "section",
      "buttonList",
      "calc__buttons",
      null
    );
    //Ajout des boutons dans la section btn

    buttonsList.forEach((btn) => {
      groupbtn.appendChild(
        this.createSection(
          "button",
          null,
          "calc calc__btn calc__btn--" + btn.type,
          btn.content
        )
      );
    });

    this.calcElt.appendChild(screen);
    this.calcElt.appendChild(groupbtn);
  }

  //Ajoute tous les bouton dans l'élément du dom passer en argument

  //Créé et retourne un element du dom
  createSection(type, id, className, content) {
    console.log(className);
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
