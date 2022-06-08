'use strict';

const opChars = /\+|\-|\*|\/|\^|\(|\)/g;

export function addSubFn(str, operator, negFirstOfString) {
  // Replace the double negations with a '+' sign
  let endResult = str.includes('--') ? str.replaceAll('--', '+') : str;
  endResult = endResult[0] == '+' ? endResult.slice(1) : endResult;

  // Break the string in two pieces where the operator is
  let operatorIndex = endResult.indexOf(operator);
  let strAfterOperator = endResult.slice(operatorIndex + 1);

  // Redo the previous break correctly if the string starts with '-'
  if (negFirstOfString) {
    let noNeg = endResult.slice(1);
    operatorIndex = noNeg.indexOf(operator) + 1;
    strAfterOperator = endResult.slice(operatorIndex + 1);
  }

  // Identify the two numbers that need to be operated
  let firstNo = Number.parseFloat(endResult);
  let secondNo = Number.parseFloat(strAfterOperator);
  //   let firstNo = strBeforeOperator.match(/\-?[0-9]+$/)
  //     ? Number.parseFloat(strBeforeOperator.match(/\-?[0-9]+$/)[0])
  //     : 0;

  // Identify the string to concatenate after the result
  let strEnd = strAfterOperator.slice(secondNo.toString().length);

  let resultAsString;
  switch (operator) {
    case '+':
      resultAsString = (firstNo + secondNo).toString();
      break;
    case '-':
      resultAsString = (firstNo - secondNo).toString();
      break;
    default:
      resultAsString = '';
  }

  console.log(endResult);
  endResult = resultAsString.concat(strEnd);
  endResult = endResult.includes('--')
    ? endResult.replaceAll('--', '+')
    : endResult;
  endResult = endResult[0] == '+' ? endResult.slice(1) : endResult;

  return endResult;
}
