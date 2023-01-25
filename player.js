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
