function getRandomField() {
  const letterIndex = getRandomInt();
  const numberIndex = getRandomInt();
  const field = fieldsData[letterIndex][numberIndex];
  return field;
}

function getRandomInt() {
  return Math.floor(Math.random() * 9);
}
