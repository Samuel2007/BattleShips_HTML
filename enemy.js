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

function enemyAttack() {
  let field = getRandomField();
  if (attackedPlayerFields.includes(field)) {
    while (attackedPlayerFields.includes(field)) {
      field = getRandomField();
    }
  }
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
  let attackedCorrectPlayerShips = 0;
  let attackedCorrectEnemyShips = 0;
  gameEnd(
    enemyShips,
    attackedEnemyFields,
    attackedCorrectPlayerShips,
    "Computer"
  );
  gameEnd(
    playerShips,
    attackedPlayerFields,
    attackedCorrectEnemyShips,
    "Player"
  );
}

function gameEnd(ships, attacheckShips, attackedCorrectShips, winner) {
  ships.forEach((element) => {
    if (attacheckShips.includes(element)) {
      attackedCorrectShips = attackedCorrectShips + 1;
    }
  });
  if (attackedCorrectShips === 1) {
    const root = document.querySelector(".root");
    const mainPlane = document.querySelector(".mainPlane");
    root.remove();
    const header = document.createElement("h1");
    header.textContent = `${winner} Won!`;
    mainPlane.appendChild(header);
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
