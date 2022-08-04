# Calculator

## Projet Calculatrice

Réalisation d'une calculatrice en JS.

- Il ne peut y avoir qu'une balise main dans index.html
- la calculatrice doit être générée en JS

### Darkmode Off

<img src="./assets/resDoc/darkModeOFF.png" alt="drawing" width="400"/>

### Darkmode On

<img src="./assets/resDoc/darkModeOn.png" alt="drawing" width="400"/>

## Liens

[GitPage](https://xavcha03.github.io/calculator/)

## Explication du dev

J'ai décidé de réaliser ce projet en utilisant un systeme de module en JS, la calculatrice en est un.

### index.html

Donner un id à l'élément qui doit recevoir la calculatrice générée en JS

```
<main id="calculator" class="calc">
</main>
```

### script.js

Importer le module et initialiser la calculatrice en lui donnant l'id du parent.

```
import Calculator from "./assets/js/calculator/main.js";

let calculator = new Calculator(document.querySelector("#calculator"));
```

## To Do

ce qu'il reste à réalisé sur ce projet

- Responsive
- Ajouter un bouton dark-mode (la class à mettre sur le body existe et fonctionne)
- Faire fonctionner les boutons restants
