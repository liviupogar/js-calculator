'use strict';

import { doMath } from './doMath.js';
import {
  solveParanthesisFn,
  raiseToPowerFn,
  multiplyFn,
  divideFn,
  addFn,
  subtractFn,
} from './operations.js';

const calc = '20+((5+(4+6*2))/3)+2^4/8-17-(6*2)*2/4';
const calc2 = '70-3*13-8/2*4-2^3-9+3';
const calc3 = '5+(4^3/2^4)';
const power = '-2^3*22-12^2-3^2*-2^3';
// ----------- -8*22-144-9*-8
// ----------- -176-144--72 = -176-72 = -248

function resolveFn(str) {
  const noParanthesis = solveParanthesisFn(str);
  let strToCalculate = raiseToPowerFn(noParanthesis);

  // Multiply and divide in order of appearance
  while (strToCalculate.match(/\*|\//g)) {
    let operator =
      strToCalculate[strToCalculate.indexOf(strToCalculate.match(/\*|\//g)[0])];
    strToCalculate = doMath(strToCalculate, operator);
  }

  // Add and subtract in order of appearance
  while (strToCalculate.match(/\+|\-/g)) {
    let operator =
      strToCalculate[strToCalculate.indexOf(strToCalculate.match(/\+|\-/g)[0])];
    strToCalculate = doMath(strToCalculate, operator);
  }

  return strToCalculate;
}

console.log(resolveFn(power));
