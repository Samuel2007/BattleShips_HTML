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
      console.log(field);
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
  const root = document.querySelector(".root");
  playerShips.forEach((element) => {
    if (attackedPlayerFields.includes(element)) {
      attackedCorrectPlayerShips = attackedCorrectPlayerShips + 1;
    }
  });
  if (attackedCorrectPlayerShips === 1) {
    const mainPlane = document.querySelector(".mainPlane");
    root.remove();
    const header = document.createElement("h1");
    header.textContent = "Computer Won!";
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
