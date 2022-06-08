'use strict';

import { doMath } from './doMath.js';
import { addSubFn } from './addSub.js';

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
      strToCalculate = multiplyDivideFn(strToCalculate);

      // Add and subtract in order of appearance
      strToCalculate = addSubtractFn(strToCalculate);

      endResult = strStart.concat(strToCalculate, strEnd);
    }
    return endResult;
  }
  return str;
}

function raiseToPowerFn(str) {
  if (str.includes('^')) {
    let newStr = str;
    while (newStr.includes('^')) {
      newStr = doMath(newStr, '^');
    }
    return newStr;
  }
  return str;
}

function multiplyDivideFn(str) {
  if (str.match(/\*|\//g)) {
    let newStr = str;
    while (newStr.match(/\*|\//g)) {
      let operator = newStr.match(/\*|\//g)[0];
      newStr = doMath(newStr, operator);
    }
    return newStr;
  }
  return str;
}

function addSubtractFn(str) {
  let strToCalculate = str;
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
    return strToCalculate;
  }
  return strToCalculate;
}

export { solveParanthesisFn, raiseToPowerFn, multiplyDivideFn, addSubtractFn };
