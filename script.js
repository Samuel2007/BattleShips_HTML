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

function createBoardPattern(containerClass, isEnemyShips) {
  const container = document.querySelector(containerClass);
  const rowsWithButtons = createBoard(fieldsData, isEnemyShips);
  rowsWithButtons.forEach(function (row) {
    container.appendChild(row);
  });
}
createBoardPattern(".yourShipsContainer", false);

createEnemyShips();

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
