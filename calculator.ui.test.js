import Calculator from './assets/js/calculator/main.js';
import { fireEvent } from '@testing-library/dom';

function setupCalculator() {
  document.body.innerHTML = `<main id="calculator"></main>`;
  const calc = new Calculator(document.querySelector('#calculator'));
  return {
    calc,
    screen: document.querySelector('#screen'),
    getButton: (label) => Array.from(document.querySelectorAll('button')).find(b => b.textContent === label)
  };
}

describe('Calculator - Interface Utilisateur', () => {
  let screen, getButton;

  beforeEach(() => {
    const setup = setupCalculator();
    screen = setup.screen;
    getButton = setup.getButton;
  });

  test('Affichage initial', () => {
    expect(screen.textContent).toBe('0');
  });

  test('Clic sur les chiffres', () => {
    fireEvent.click(getButton('1'));
    fireEvent.click(getButton('2'));
    fireEvent.click(getButton('3'));
    expect(screen.textContent).toBe('123');
  });

  test('Clic sur opérateurs et calcul', () => {
    fireEvent.click(getButton('7'));
    fireEvent.click(getButton('+'));
    fireEvent.click(getButton('8'));
    fireEvent.click(getButton('='));
    expect(screen.textContent).toBe('15');
  });

  test('Bouton C réinitialise', () => {
    fireEvent.click(getButton('9'));
    fireEvent.click(getButton('C'));
    expect(screen.textContent).toBe('0');
  });

  test('Bouton <= efface le dernier caractère', () => {
    fireEvent.click(getButton('5'));
    fireEvent.click(getButton('6'));
    const backBtn = getButton('<=');
    expect(backBtn).toBeTruthy();
    fireEvent.click(backBtn);
    expect(screen.textContent).toBe('5');
  });

  test('Affichage de Erreur', () => {
    fireEvent.click(getButton('8'));
    fireEvent.click(getButton('/'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('='));
    expect(screen.textContent).toBe('Erreur');
  });

  test('Reset automatique après Erreur', () => {
    fireEvent.click(getButton('8'));
    fireEvent.click(getButton('/'));
    fireEvent.click(getButton('0'));
    fireEvent.click(getButton('='));
    fireEvent.click(getButton('7'));
    expect(screen.textContent).toBe('7');
  });

  test('Affichage limité à 16 caractères', () => {
    for(let i=0; i<20; i++) fireEvent.click(getButton('9'));
    expect(screen.textContent.length).toBeLessThanOrEqual(16);
  });

  test('Point décimal unique', () => {
    fireEvent.click(getButton('1'));
    fireEvent.click(getButton('.'));
    fireEvent.click(getButton('.'));
    fireEvent.click(getButton('2'));
    expect(screen.textContent).toBe('1.2');
  });

  test('Feedback visuel (focus)', () => {
    const btn = getButton('5');
    btn.focus();
    expect(document.activeElement).toBe(btn);
  });
}); 