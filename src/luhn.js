export default cardNumber => (cardNumber.split('').map((char, index) => {
  const digit = Number.parseInt(char, 10);

  if ((index + cardNumber.length) % 2 === 0) {
    const digitX2 = digit * 2;

    return digitX2 > 9 ? digitX2 - 9 : digitX2;
  }

  return digit;
}).reduce((a, b) => a + b, 0) % 10 === 0);
