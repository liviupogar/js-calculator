'use strict';

const opChars = new RegExp(/\+|\-|\*|\/|\^|\(|\)/g);

export function doMath(str, operator) {
  let endResult = str.includes('--') ? str.replace('--', '+') : str;
  // Replace possible newly created double negations
  endResult = endResult.includes('--')
    ? endResult.replace('--', '+')
    : endResult;

  // Break the string in 2 pieces where the operator is
  let strBeforeOperator = endResult.slice(0, endResult.indexOf(operator));
  let strAfterOperator = endResult.slice(endResult.indexOf(operator) + 1);

  // Identify the two numbers that need to be operated
  let firstNumber = strBeforeOperator.match(/[0-9]+$/)
    ? Number.parseFloat(strBeforeOperator.match(/[0-9]+$/)[0])
    : '';
  let secondNumber = Number.parseFloat(strAfterOperator);

  // Identify the strings to be concatenated before and after our result
  let stringStart = strBeforeOperator.slice(
    0,
    strBeforeOperator.length - firstNumber.toString().length
  );
  let stringEnd = strAfterOperator.slice(secondNumber.toString().length);

  // Find the result
  let resultAsString = '';
  switch (operator) {
    case '^':
      resultAsString = (firstNumber ** secondNumber).toString();
      break;
    case '*':
      resultAsString = (firstNumber * secondNumber).toString();
      break;
    case '/':
      resultAsString = (firstNumber / secondNumber).toString();
      break;
    default:
      resultAsString = null;
  }

  // Concatenate the result, do some cleaning and then return it
  endResult = stringStart.concat(resultAsString, stringEnd);
  endResult = endResult.includes('--')
    ? endResult.replaceAll('--', '+')
    : endResult;
  endResult = endResult[0] == '+' ? endResult.slice(1) : endResult;

  return endResult;
}
