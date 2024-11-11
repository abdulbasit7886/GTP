import { Component } from '@angular/core';

@Component({
  selector: 'app-calculater',
  templateUrl: './calculater.component.html',
  styleUrls: ['./calculater.component.css']
})
export class CalculaterComponent {
  num1: string = '';
  operator: string = '';
  num2: number | null = null;

  operation(operator: string) {
    if (this.num1) {
      this.num2 = parseFloat(this.num1);
      this.operator = operator;
      this.num1 = '';
    }
  }
  show(value: string) {
    this.num1 += value;
  }
  clear() {
    this.num1 = '';
    this.num2 = null;
    this.operator = '';
  }
  calculate() {
    if (this.num1 && this.operator && this.num2 !== null ) {
      const furtherOperate = parseFloat(this.num1);
      switch (this.operator) {
        case '+':
          this.num1 = (this.num2 + furtherOperate).toString();
          break;
        case '-':
          this.num1 = (this.num2 - furtherOperate).toString();
          break;
        case '*':
          this.num1 = (this.num2 * furtherOperate).toString();
          break;
        case '/':
          this.num1 = furtherOperate !== 0 ? (this.num2 / furtherOperate).toString() : 'Error';
          break;
      }
      this.operator = '';
      this.num2 = null;
    }
  }
}

