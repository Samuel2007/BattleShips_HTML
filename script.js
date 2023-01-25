console.log("text");

const fieldsData = [
  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
  ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
  ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
  ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"],
  ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"],
  ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"],
  ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"],
  ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"],
  ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"],
];

let numberOfShips = 0;
let enemyShips = [];
let playerShips = [];
let attackedPlayerFields = [];
let attackedEnemyFields = [];

function createBoard(data, isEnemyShips) {
  const rowsWithButtons = data.map(function (row) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    const buttons = row.map(function (buttonData) {
      const buttonElement = document.createElement("div");
      buttonElement.classList.add("cell");
      buttonElement.textContent = buttonData;
      if (isEnemyShips) {
        buttonElement.classList.add("enemyCell");
        addEventListenerToEnemyBoard(buttonElement);
      } else {
        buttonElement.classList.add("yourCell");
        addEventListenerToYourBoard(buttonElement);
      }
      return buttonElement;
    });
    buttons.forEach(function (button) {
      rowElement.appendChild(button);
    });
    return rowElement;
  });
  return rowsWithButtons;
}

function addEventListenerToEnemyBoard(element) {
  element.addEventListener("click", function (event) {
    if (!attackedEnemyFields.includes(event.target.textContent)) {
      attackedEnemyFields.push(event.target.textContent);
      enemyAttack();
      if (enemyShips.includes(event.target.textContent)) {
        event.target.classList.add("enemyShipHit");
      } else if (!enemyShips.includes(event.target.textContent)) {
        event.target.classList.add("changeColor");
      }
    }
  });
}

function addEventListenerToYourBoard(element) {
  element.addEventListener("click", function (event) {
    if (event.target.classList.contains("enemyShipHit")) {
      event.target.classList.remove("enemyShipHit");
      playerShips = playerShips.filter((element) => {
        return element !== event.target.textContent;
      });
      numberOfShips = numberOfShips - 1;
    } else if (numberOfShips < 10) {
      numberOfShips = numberOfShips + 1;
      playerShips.push(event.target.textContent);
      event.target.classList.add("enemyShipHit");
    }
  });
}

function getRandomField() {
  const letterIndex = getRandomInt();
  const numberIndex = getRandomInt();
  const field = fieldsData[letterIndex][numberIndex];
  return field;
}

function enemyAttack() {
  let field = getRandomField();
  if (attackedPlayerFields.includes(field)) {
    while (attackedPlayerFields.includes(field)) {
      field = getRandomField();
      console.log(field);
    }
  }
  console.log("s");
  attackedPlayerFields.push(field);
  const yourFields = document.querySelectorAll(".yourCell");
  if (playerShips.includes(field)) {
    yourFields.forEach((element) => {
      if (element.textContent === field) {
        element.classList.add("yourShipHit");
      }
    });
  } else {
    yourFields.forEach((element) => {
      if (element.textContent === field) {
        element.classList.add("changeColor");
      }
    });
  }
}

function createEnemyShips() {
  while (enemyShips.length < 10) {
    const field = getRandomField();
    if (!enemyShips.includes(field)) {
      enemyShips.push(field);
    }
  }
}
createEnemyShips();

function createBoardPattern(containerClass, isEnemyShips) {
  const container = document.querySelector(containerClass);
  const rowsWithButtons = createBoard(fieldsData, isEnemyShips);
  rowsWithButtons.forEach(function (row) {
    container.appendChild(row);
  });
}
createBoardPattern(".yourShipsContainer", false);

function getRandomInt() {
  return Math.floor(Math.random() * 9);
}

function startGame() {
  if (numberOfShips === 10) {
    const yourFields = document.querySelectorAll(".yourCell");
    const enemyShips = document.querySelector(".enemyShips");
    const button = document.querySelector(".startGame");
    createBoardPattern(".enemyShipsContainer", true);
    enemyShips.classList.remove("hidden");
    yourFields.forEach(function (button) {
      button.replaceWith(button.cloneNode(true));
    });
    button.remove();
  }
}
