import test from 'ava';
import cardNumberValidator from '../src';
import gencc from './helpers/gencc';

// Test('should return function', t => {
//   t.is(typeof cardNumberValidator, 'function');
// });

// test('should throw because value not number', t => {
//   const error = t.throws(() => {
//     cardNumberValidator(1234);
//   }, TypeError);

//   t.is(error.message, 'The `cardNumber` must be a string');
// });

// test('should return luhn false', t => {
//   t.deepEqual(cardNumberValidator('1234'), {luhn: false, verhuffa: false, damm: false});
// });

const randomCard = new Array(1000).fill(0).map(() => {
  return `${gencc()}`;
});

[
  ...randomCard,
  '2200330548400006824',
  '2200330548400006',
  '4600000000003562'
].forEach(number => {
  test(`should return valid for nember ${number}`, t => {
    t.deepEqual(cardNumberValidator(number), {luhn: true, verhuff: true, damm: true});
  });
});

// [...'2200330548400006824'].reduce((prev, curr) => {
//   const str = `${prev}${curr}`;
//   const truefy = {luhn: true, verhuff: true, damm: true};
//   const falsefy = {luhn: false, verhuff: false, damm: false};
//   test(`test str ${str}`, t => {
//     t.deepEqual(cardNumberValidator(str), {luhn: true, verhuff: true, damm: true});
//   });

//   return str;
// }, '');
