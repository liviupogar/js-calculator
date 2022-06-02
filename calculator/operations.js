'use strict';

import { doMath } from './doMath.js';

function solveParanthesisFn(str) {
  if (str.includes(')')) {
    let endResult = str;
    while (endResult.includes(')')) {
      let strEnd = endResult.slice(endResult.indexOf(')') + 1);
      let strMid = endResult.slice(0, endResult.indexOf(')'));
      let strStart = endResult.slice(0, strMid.lastIndexOf('('));

      let insideParanthesis = strMid.slice(strMid.lastIndexOf('(') + 1);
      let strToCalculate = raiseToPowerFn(insideParanthesis);

      // Multiply and divide in order of appearance
      while (strToCalculate.match(/\*|\//g)) {
        let operator =
          strToCalculate[
            strToCalculate.indexOf(strToCalculate.match(/\*|\//g)[0])
          ];
        strToCalculate = doMath(strToCalculate, operator);
      }

      // Add and subtract in order of appearance
      while (strToCalculate.match(/\+|\-/g)) {
        let operator =
          strToCalculate[
            strToCalculate.indexOf(strToCalculate.match(/\+|\-/g)[0])
          ];
        strToCalculate = doMath(strToCalculate, operator);
      }

      endResult = strStart.concat(strToCalculate, strEnd);
    }
    return endResult;
  }
  return str;
}

function raiseToPowerFn(str) {
  if (str.includes('^')) {
    return doMath(str, '^');
  }
  return str;
}

function multiplyFn(str) {
  if (str.includes('*')) {
    return doMath(str, '*');
  }
  return str;
}

function divideFn(str) {
  if (str.includes('/')) {
    return doMath(str, '/');
  }
  return str;
}

function addFn(str) {
  if (str.includes('+')) {
    return doMath(str, '+');
  }
  return str;
}

function subtractFn(str) {
  if (str.includes('-')) {
    return doMath(str, '-');
  }
  return str;
}

export {
  solveParanthesisFn,
  raiseToPowerFn,
  multiplyFn,
  divideFn,
  addFn,
  subtractFn,
};
