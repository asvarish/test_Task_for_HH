
let inputString1 = "((11+2.4*13.4)+3*(3.14+2.7))/7";
let inputString2 = "3.5+1.4"
let inputString3 = "(1.5+1.5+3)/3/1+5"

function calculateBracket(input:string): string {
  let indexOfLastOpenBracket: number = 0
  let inBracket: string = "";
  for ( let i= 0 ;i<input.length;i++ ) {
    if (input[i]==="("){
      indexOfLastOpenBracket = i;
      inBracket=""

    } else if (input[i]===")"){
      let newElement: string = calculated(inBracket)
      input = input.slice(0,indexOfLastOpenBracket) + newElement + input.slice(i+1, input.length);
      console.log(`input:`,input)
      i=0;
      inBracket=""
    } else {
      inBracket+=input[i]
    }
  }

  return calculated(input)
}

function calculated(expression:string):string{
  if (expression === "") return ""

  let i = 0
  let indexOfFirstNumber = -1;
  let indexOfSecondNumber = -1;
  let firstNumber = "";
  let secondNumber = "";
  while ((expression.indexOf('/') !== -1 || expression.indexOf('*') !== -1)) {
    if (expression[i] === '/' || expression[i] === '*') {
      indexOfFirstNumber = i - 1;
      indexOfSecondNumber = i + 1;
      while (indexOfFirstNumber >= 0 && (expression.charCodeAt(indexOfFirstNumber) == 46 || (expression.charCodeAt(indexOfFirstNumber) >= 48 && expression.charCodeAt(indexOfFirstNumber) <= 57))) {
        firstNumber = expression[indexOfFirstNumber] + firstNumber
        indexOfFirstNumber--
      }

      while (indexOfSecondNumber < expression.length && (expression.charCodeAt(indexOfSecondNumber) == 46 || (expression.charCodeAt(indexOfSecondNumber) >= 48 && expression.charCodeAt(indexOfSecondNumber) <= 57))) {
        secondNumber = secondNumber + expression[indexOfSecondNumber]
        indexOfSecondNumber++;
      }


      let resultOfExpression: number = expression[i] === '/' ? Number(firstNumber) / Number(secondNumber) : Number(firstNumber) * Number(secondNumber)
      expression = expression.slice(0,indexOfFirstNumber+1) + resultOfExpression + expression.slice(indexOfSecondNumber,expression.length)
      firstNumber = "";
      secondNumber = "";
      i=indexOfFirstNumber; // после изменения expression нужно сдвинуть индекс, чтобы не пропустить интересющие нас элемменты строки
      console.log(`expression:`,expression);
    }
    i++
  }

  const numbers = expression.split(/[-+]/).map(Number);
  const operators = expression.replace(/[0-9.]/g, '').split('');

  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '+') {
      result += numbers[i + 1];
    } else if (operators[i] === '-') {
      result -= numbers[i + 1];
    }
  }
  return result.toString()
}
// console.time('Calculation Time');
//
// const timmi = calculateBracket(inputString3)
// console.log(`Final Result: ${timmi}`);
console.log(calculateBracket(inputString3))
