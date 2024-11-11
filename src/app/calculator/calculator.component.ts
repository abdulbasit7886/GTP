import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  currentInput: string = '';
  buttons: string[] = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  onButtonClick(button: string): void {
    if (button === 'C') {
      this.currentInput = '';
    } else if (button === '=') {
      this.calculateResult();
    } else {
      this.currentInput += button;
    }
  }

  calculateResult(): void {
    try {
      // Parse and evaluate the expression without using `eval`
      this.currentInput = this.evaluateExpression(this.currentInput);
    } catch (error) {
      this.currentInput = 'Error';
    }
  }

  evaluateExpression(expression: string): string {
    const operators = /[+\-*/]/;
    const tokens = expression.split(/([+\-*/])/).filter(token => token);
    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const value = parseFloat(tokens[i + 1]);

      if (operator === '+') result += value;
      if (operator === '-') result -= value;
      if (operator === '*') result *= value;
      if (operator === '/') result /= value;
    }

    return result.toString();
  }
}
