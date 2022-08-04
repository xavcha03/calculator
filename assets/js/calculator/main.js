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
    switch(btnValue){
      case '=':
        this.execScreenContent();
        break;
      case 'C':
        this.setScreenContent("0");
        break;
      case 'X²':
        let content = this.getScreenContent();
        this.setScreenContent(Math.pow(Number(this.getScreenContent()),2));
        break;
      default:
        this.addKeyOnScreen(btnValue);
        

    }    
  }

  //Ajoute le contenu de la touche à l'écran
  addKeyOnScreen(key){
    
    if(this.getScreenContent()=="0") this.setScreenContent("");
    this.setScreenContent(this.getScreenContent()+key);
  }

  //Execute le calcul affiché à l'écran
  execScreenContent(){
    let screenContent = this.getScreenContent();
    this.setScreenContent(this.computeResult(this.getScreenContent()))
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
    //Remplacement de caractère
    return Function('return ' + str)()
  }
  
}


