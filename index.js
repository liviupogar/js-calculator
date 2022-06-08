'use strict';

import { addSubFn } from './addSub.js';
import {
  solveParanthesisFn,
  raiseToPowerFn,
  multiplyDivideFn,
  addSubtractFn,
} from './operations.js';

const calc = '10+((5+(4+6*2))/3)+2^4/8-17-(6*2)*2/4';
const calc2 = '70-3*13-8/2*4-2^3-9+3';
const calc3 = '5+(4^3/2^4)';
const power = '-2^4*22-12^2-3^2-2^3';
const positives = '20+((5+(4+6*2))/3)+2^4/8-7+(6*2)*2/4';
const md = '-2^3+4';

console.log(resolveFn(calc));

// function magic(str) {
//   return new Function('return ' + str)();
// }

function resolveFn(str) {
  const noParanthesis = solveParanthesisFn(str);
  let strToCalculate = raiseToPowerFn(noParanthesis);

  // Multiply and divide in order of appearance
  strToCalculate = multiplyDivideFn(strToCalculate);

  // Add and subtract in order of appearance
  let opers = strToCalculate.match(/\+|\-/g)
    ? strToCalculate.match(/\+|\-/g).length
    : 0;
  let negFirst = strToCalculate[0] == '-' ? true : false;
  while ((negFirst && opers > 1) || (!negFirst && opers > 0)) {
    if (negFirst) {
      let operator = strToCalculate.match(/\+|\-/g)[1];
      strToCalculate = addSubFn(strToCalculate, operator, negFirst);
      opers = strToCalculate.match(/\+|\-/g)
        ? strToCalculate.match(/\+|\-/g).length
        : 0;
      negFirst = strToCalculate[0] == '-' ? true : false;
    } else {
      let operator = strToCalculate.match(/\+|\-/g)[0];
      strToCalculate = addSubFn(strToCalculate, operator);
      opers = strToCalculate.match(/\+|\-/g)
        ? strToCalculate.match(/\+|\-/g).length
        : 0;
      negFirst = strToCalculate[0] == '-' ? true : false;
    }
  }
  return strToCalculate;
}
