'use strict';

const opChars = new RegExp(/\+|\-|\*|\/|\^|\(|\)/g);

function replaceDoubleMinuses(str) {
  console.log(`String with double minuses: ${str}`);
  const temp = str.replace('--', '+');
  return doMath(temp, '+');
}

export function doMath(str, operator) {
  let endResult = str;
  while (endResult.includes(operator)) {
    // endResult = endResult.replace('--', '-');
    let strBeforeOperator = endResult.slice(0, endResult.indexOf(operator));
    let strAfterOperator = endResult.slice(endResult.indexOf(operator) + 1);

    // Find the next and previous operators' indexes
    let nextOpIndex = 0;
    let prevOpIndex = -1;
    if (strAfterOperator.match(opChars)) {
      let operators = strAfterOperator.match(opChars);
      nextOpIndex = strAfterOperator.indexOf(operators[0]);
      // if the char right after the next operator is a '-', then (identify the next operator from that index forward OR empty array means the end of the final string will be an empty string
      if (strAfterOperator[nextOpIndex] === '-' && nextOpIndex === 0) {
        nextOpIndex = strAfterOperator.indexOf(operators[1])
          ? strAfterOperator.indexOf(operators[1])
          : 0;
        console.log(`negative AFTER`);
      }
    }
    if (strBeforeOperator.match(opChars)) {
      let operators = strBeforeOperator.match(opChars);
      prevOpIndex = strBeforeOperator.lastIndexOf(
        operators[operators.length - 1]
      );
      // if it's a "-" AND it's not the first char in the string AND previous char is not a digit, then slice before the "-"
      if (
        strBeforeOperator[prevOpIndex] === '-' &&
        (prevOpIndex === 0 ||
          strBeforeOperator[prevOpIndex - 1] !=
            +strBeforeOperator[prevOpIndex - 1])
      ) {
        prevOpIndex = strBeforeOperator.lastIndexOf(
          operators[operators.length - 2]
        )
          ? strBeforeOperator.lastIndexOf(operators[operators.length - 2])
          : prevOpIndex - 1;
        console.log(`negative BEFORE`);
      }
    }

    // Strings we need to concatenate at the begining and end of our calculation
    let strStart = endResult.slice(0, prevOpIndex + 1);
    let strEnd = nextOpIndex > 0 ? strAfterOperator.slice(nextOpIndex) : '';

    // Do the math, convert to string, concatenate and replace the original string
    let firstNo;
    let secondNo;
    let operators = endResult.match(opChars);
    if (operator == '-' && endResult.includes('--')) {
      console.log(endResult);
      endResult = replaceDoubleMinuses(endResult);
      console.log(endResult);
    }
    if (operator == '-' && !strBeforeOperator.slice(prevOpIndex + 1)) {
      if (operators.length == 1) {
        return endResult;
      }
      firstNo = endResult.split('-')[1]
        ? '-'.concat(endResult.split('-')[1])
        : console.error(`Something's wrong with the first number`);
      secondNo = endResult.split('-')[2]
        ? endResult.split('-')[2]
        : `Something's wrong with the second number`;
      console.log(endResult.split('-'));
      strStart = '';
      strEnd = endResult.slice(firstNo.length + secondNo.length + 1);
    } else {
      firstNo = strBeforeOperator.slice(prevOpIndex + 1);
      secondNo = Number.parseFloat(strAfterOperator);
    }

    console.log(
      `Strings: ${strStart}, ${firstNo} ${operator} ${secondNo}, ${strEnd}`
    );

    let resultAsString = '';
    switch (operator) {
      case '^':
        resultAsString = ((+firstNo) ** secondNo).toString();
        break;
      case '*':
        resultAsString = (+firstNo * secondNo).toString();
        break;
      case '/':
        resultAsString = (+firstNo / secondNo).toString();
        break;
      case '+':
        resultAsString = (+firstNo + secondNo).toString();
        break;
      case '-':
        resultAsString = (+firstNo - secondNo).toString();
        break;
      default:
        resultAsString = null;
    }
    endResult = strStart.concat(resultAsString, strEnd);
  }
  return endResult;
}
