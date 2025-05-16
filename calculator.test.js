import Calculator from './assets/js/calculator/main.js';

function createFakeDOM() {
  document.body.innerHTML = `
    <main id="calculator"></main>
  `;
}

describe('Calculator - Logique', () => {
  let calc, screen;

  beforeEach(() => {
    createFakeDOM();
    calc = new Calculator(document.querySelector('#calculator'));
    screen = document.querySelector('#screen');
  });

  function pressSequence(seq) {
    seq.forEach(btn => calc.executeBtn(btn));
  }

  test('Ajout de chiffres', () => {
    pressSequence(['1', '2', '3']);
    expect(screen.innerHTML).toBe('123');
  });

  test('Addition simple', () => {
    pressSequence(['1', '+', '2', '=']);
    expect(screen.innerHTML).toBe('3');
  });

  test('Soustraction', () => {
    pressSequence(['5', '-', '2', '=']);
    expect(screen.innerHTML).toBe('3');
  });

  test('Multiplication', () => {
    pressSequence(['3', '*', '4', '=']);
    expect(screen.innerHTML).toBe('12');
  });

  test('Multiplication avec ×', () => {
    pressSequence(['3', '×', '4', '=']);
    expect(screen.innerHTML).toBe('12');
  });

  test('Division', () => {
    pressSequence(['8', '/', '2', '=']);
    expect(screen.innerHTML).toBe('4');
  });

  test('Division avec ÷', () => {
    pressSequence(['8', '÷', '2', '=']);
    expect(screen.innerHTML).toBe('4');
  });

  test('Division par zéro', () => {
    pressSequence(['8', '/', '0', '=']);
    expect(screen.innerHTML).toBe('Erreur');
  });

  test('Parenthèses', () => {
    pressSequence(['(', '2', '+', '3', ')', '*', '2', '=']);
    expect(screen.innerHTML).toBe('10');
  });

  test('Carré', () => {
    pressSequence(['4', 'X²']);
    expect(screen.innerHTML).toBe('16');
  });

  test('Point décimal unique', () => {
    pressSequence(['1', '.', '.', '2']);
    expect(screen.innerHTML).toBe('1.2');
  });

  test('Double opérateur interdit', () => {
    pressSequence(['1', '+', '+', '2', '=']);
    expect(screen.innerHTML).toBe('3');
  });

  test('Limite de longueur', () => {
    pressSequence(Array(20).fill('9'));
    expect(screen.innerHTML.length).toBeLessThanOrEqual(16);
  });

  test('Arrondi à 8 décimales', () => {
    pressSequence(['1', '/', '3', '=']);
    expect(screen.innerHTML.length).toBeLessThanOrEqual(10); // 0.33333333
  });

  test('Reset avec C', () => {
    pressSequence(['1', '+', '2', 'C']);
    expect(screen.innerHTML).toBe('0');
  });

  test('Backspace', () => {
    pressSequence(['1', '2', '3', '<=']);
    expect(screen.innerHTML).toBe('12');
  });

  test('Erreur puis reset sur chiffre', () => {
    pressSequence(['8', '/', '0', '=', '5']);
    expect(screen.innerHTML).toBe('5');
  });

  test('Saisie de pi', () => {
    pressSequence(['π']);
    expect(Number(screen.innerHTML)).toBeCloseTo(Math.PI, 8);
  });

  test('Racine carrée', () => {
    pressSequence(['9', '√']);
    expect(screen.innerHTML).toBe('3');
  });

  test('Parenthèses non fermées', () => {
    pressSequence(['(', '2', '+', '3', '=']);
    expect(screen.innerHTML).toBe('Erreur');
  });

  test('Saisie invalide', () => {
    pressSequence(['1', 'a', '+', '2', '=']);
    expect(screen.innerHTML).toBe('Erreur');
  });

  test('Multiplication par pi', () => {
    pressSequence(['2', '*', 'π', '=']);
    expect(Number(screen.innerHTML)).toBeCloseTo(2 * Math.PI, 8);
  });

  test('Affichage de pi seul', () => {
    pressSequence(['π']);
    expect(Number(screen.innerHTML)).toBeCloseTo(Math.PI, 8);
  });

  test('Chiffre puis pi = multiplication', () => {
    pressSequence(['2', 'π']);
    expect(screen.innerHTML).toBe('2*' + Math.PI);
  });

  test('Chiffre puis pi puis pi = multiplication en chaîne', () => {
    pressSequence(['2', 'π', 'π']);
    expect(screen.innerHTML).toBe('2*' + Math.PI + '*' + Math.PI);
  });

  test('pi puis pi = multiplication', () => {
    pressSequence(['π', 'π']);
    expect(screen.innerHTML).toBe(Math.PI + '*' + Math.PI);
  });

  test('0 puis pi = pi', () => {
    pressSequence(['0', 'π']);
    expect(screen.innerHTML).toBe(String(Math.PI));
  });

  test('Erreur puis pi = pi', () => {
    pressSequence(['8', '/', '0', '=', 'π']);
    expect(screen.innerHTML).toBe(String(Math.PI));
  });
}); 