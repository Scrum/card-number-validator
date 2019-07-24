import luhn from './luhn';
import verhuff from './verhuff';
import damm from './damm';

export default cardNumber => {
  if (typeof cardNumber !== 'string') {
    throw new TypeError('The `cardNumber` must be a string');
  }

  return {
    luhn: luhn(cardNumber),
    verhuff: verhuff(cardNumber),
    damm: damm(cardNumber)
  };
};
