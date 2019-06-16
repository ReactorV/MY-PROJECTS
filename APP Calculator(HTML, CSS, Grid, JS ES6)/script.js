class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.currentOperandText = currentOperandText;
    this.previousOperandText = previousOperandText;
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  //Можно удалять символы и черзе .repeat(0)
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  chooseOperation(operation) {
    if(this.currentOperand === '') return;
    if(this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  };

  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return;
    //Использую .toString() чтобы цифры отображались ввиде строки
    if(this.currentOperand == undefined) { 
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    //Чтобы не отображало undefined на дисплее
    if(this.previousOperand === undefined) {
      this.previousOperand = '';
    }
  }

  compute() {
    //Результат вычисления
    let computation;
    //Переменные для вычисления перевести в числовой формат для операций
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current)) return;
    //подключение операций вычисления
    switch (this.operation) {
     case '+':
        computation = prev + current;
        break; 
     case '-':
        computation = prev - current;
        break;   
     case '*':
        computation = prev * current;
        break; 
     case '÷':
         computation = prev / current;
        break;         
      default:
        return; 
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    //отображение целых чисел
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    //отображение десятичных чисел
    const decimalDigits = stringNumber.split('.')[1];

    //отображение разделительной запятой при вводе больших чисел
    let integerDisplay;
    if(isNaN(integerDigits)) {
      integerDisplay = '';
    } else { 
      integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
    }
    if(decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }

  }

  updateDisplay() {
    this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
    //Отображение предыдущего значения со знаком операции
    if(this.operation != null) {
      this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {//очищение строки предыдущей записи
      this.previousOperandText.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
});

operationsButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});  

