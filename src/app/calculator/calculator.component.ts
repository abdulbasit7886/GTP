import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  num1: number = 0;
  num2: number = 0;
  operator: string = '+';
  result: number | null = null;
  history: string[] = [];

  calculate() {
    switch (this.operator) {
      case '+':
        this.result = this.num1 + this.num2;
        break;
      case '-':
        this.result = this.num1 - this.num2;
        break;
      case '*':
        this.result = this.num1 * this.num2;
        break;
      case '/':
        this.result = this.num2 !== 0 ? this.num1 / this.num2 : null;
        break;
      case '%':
        this.result = this.num2 !== 0 ? this.num1 % this.num2 : null;
        break;
      case '**':
        this.result = Math.pow(this.num1, this.num2);
        break;
      case '√':
        this.result = this.num1 >= 0 ? Math.sqrt(this.num1) : null;
        break;
      default:
        this.result = null;
    }
    
    if (this.result !== null) {
      this.addToHistory();
    }
  }

  reset() {
    this.num1 = 0;
    this.num2 = 0;
    this.operator = '+';
    this.result = null;
  }

  clearHistory() {
    this.history = [];
  }

  addToHistory() {
    const operationString =
      this.operator === '√'
        ? `√${this.num1} = ${this.result}`
        : `${this.num1} ${this.operator} ${this.num2} = ${this.result}`;
    this.history.push(operationString);
  }
}
