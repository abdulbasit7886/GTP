import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  display: string = '';
  currentNumber: string = '';
  numbers: string[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
  operators: string[] = ['+', '-', '*', '/'];
  operator: string = '';
  firstOperand: number | null = null;

  appendNumber(number: string): void {
    this.currentNumber += number;
    this.display += number;
  }

  appendOperator(op: string): void {
    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.currentNumber);
    } else {
      this.calculate();
    }
    this.operator = op;
    this.currentNumber = '';
    this.display += ' ' + op + ' ';
  }

  calculate(): void {
    if (this.firstOperand !== null && this.operator && this.currentNumber) {
      const secondOperand = parseFloat(this.currentNumber);
      switch (this.operator) {
        case '+':
          this.firstOperand += secondOperand;
          break;
        case '-':
          this.firstOperand -= secondOperand;
          break;
        case '*':
          this.firstOperand *= secondOperand;
          break;
        case '/':
          this.firstOperand /= secondOperand;
          break;
      }
      this.display = this.firstOperand.toString();
      this.currentNumber = this.firstOperand.toString();
      this.operator = '';
      this.firstOperand = null;
    }
  }

  clear(): void {
    this.display = '';
    this.currentNumber = '';
    this.firstOperand = null;
    this.operator = '';
  }
}
