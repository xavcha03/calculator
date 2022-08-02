let buttonsList = [
  {
    type: "operation",
    content: "X²",
  },
  {
    type: "operation",
    content: "√",
  },
  {
    type: "operation",
    content: "π",
  },
  {
    type: "operation",
    content: "(",
  },
  {
    type: "operation",
    content: ")",
  },
  {
    type: "number",
    content: 7,
  },
  {
    type: "number",
    content: 8,
  },
  {
    type: "number",
    content: 9,
  },
  {
    type: "operation",
    content: "x",
  },
  {
    type: "operation",
    content: "/",
  },
  {
    type: "number",
    content: 4,
  },
  {
    type: "number",
    content: 5,
  },
  {
    type: "number",
    content: 6,
  },
  {
    type: "operation",
    content: "+",
  },
  {
    type: "operation",
    content: "-",
  },
  {
    type: "number",
    content: 1,
  },
  {
    type: "number",
    content: 2,
  },
  {
    type: "number",
    content: 3,
  },
  {
    type: "operation",
    content: "C",
  },
  {
    type: "operation",
    content: "<=",
  },
  {
    type: "operation",
    content: "+-",
  },
  {
    type: "number",
    content: 0,
  },
  {
    type: "operation",
    content: ",",
  },
  {
    type: "operation",
    content: "=",
  },
];

//calculatrice
let calculatorElt = document.querySelector(".buttons");

buttonsList.forEach((btn) => {
  //Création de l'élément DOM
  let newBtn = document.createElement("button"); //Création
  newBtn.classList.add("calc", "calc__btn", "calc__btn--" + btn.type);
  
  newBtn.innerHTML = btn.content;

  //Inseretion du bouton dans la calculatrice
  calculatorElt.appendChild(newBtn);
});
