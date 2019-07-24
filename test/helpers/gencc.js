let pseudoRandom = Math.random;

const visaPrefixList = [
  '4539',
  '4556',
  '4916',
  '4532',
  '4929',
  '40240071',
  '4485',
  '4716',
  '4'
];

const mastercardPrefixList = [
  '51',
  '52',
  '53',
  '54',
  '55'
];

const amexPrefixList = [
  '34',
  '37'
];

const dinersPrefixList = [
  '300',
  '301',
  '302',
  '303',
  '304',
  '305',
  '36',
  '38',
  '39'
];

const mirPrefixList = [
  '2200',
  '2201',
  '2202',
  '2204'
];

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function strrev(str) {
  if (!str) {
    return '';
  }

  let revstr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    revstr += str.charAt(i);
  }

  return revstr;
}

function completedNumber(prefix, length) {
  let ccnumber = prefix;

  while (ccnumber.length < (length - 1)) {
    ccnumber += Math.floor(pseudoRandom() * 10);
  }

  const reversedCCnumberString = strrev(ccnumber);

  const reversedCCnumber = [];
  for (let i = 0; i < reversedCCnumberString.length; i++) {
    reversedCCnumber[i] = parseInt(reversedCCnumberString.charAt(i), 10);
  }

  let sum = 0;
  let pos = 0;

  while (pos < length - 1) {
    let odd = reversedCCnumber[pos] * 2;
    if (odd > 9) {
      odd -= 9;
    }

    sum += odd;

    if (pos !== (length - 2)) {
      sum += reversedCCnumber[pos + 1];
    }

    pos += 2;
  }

  const checkdigit = (((Math.floor(sum / 10) + 1) * 10) - sum) % 10;
  ccnumber += checkdigit;

  return ccnumber;
}

function creditCardNumber(prefixList, length, howMany) {
  const result = [];
  for (let i = 0; i < howMany; i++) {
    const randomArrayIndex = Math.floor(pseudoRandom() * prefixList.length);
    const ccnumber = prefixList[randomArrayIndex];
    result.push(completedNumber(ccnumber, length));
  }

  return result;
}

const schemes = ['VISA', 'Amex', 'MasterCard', 'Diners', 'Mir'];

module.exports = function (CardScheme, howMany, randomGen) {
  pseudoRandom = randomGen || pseudoRandom;
  const amount = howMany || 1;
  const scheme = CardScheme || randomFromArray(schemes);
  if (scheme === schemes[0]) {
    return creditCardNumber(visaPrefixList, 16, amount);
  }

  if (scheme === schemes[1]) {
    return creditCardNumber(amexPrefixList, 15, amount);
  }

  if (scheme === schemes[3]) {
    return creditCardNumber(dinersPrefixList, randomFromArray([14, 16, 19]), amount);
  }

  if (scheme === schemes[4]) {
    return creditCardNumber(mirPrefixList, randomFromArray([16, 17, 18, 19]), amount);
  }

  return creditCardNumber(mastercardPrefixList, 16, amount);
};
