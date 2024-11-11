import { Component } from '@angular/core';

@Component({
  selector: 'app-calculater',
  templateUrl: './calculater.component.html',
  styleUrls: ['./calculater.component.css']
})
export class CalculaterComponent {

  display: string = '';
  operator: string = '';
  firstOperand: number | null = null;

  append(value: string){
    this.display += value;
  }

  clear(){
    this.display = '';
    this.operator = '';
    this.firstOperand = null;
  }

  operation(operator : string){
    if(this.display){
      this.firstOperand = parseFloat(this.display);
      this.operator = operator;
      this.display = '';
    }

  }

  calculate(){
    if(this.firstOperand !== null && this.display && this.operator){
      const secondoperand = parseFloat(this.display);
      switch (this.operator){
        case '+':
          this.display = (this.firstOperand + secondoperand).toString();
          break;
          case '-':
          this.display = (this.firstOperand - secondoperand).toString();
          break;
          case '*':
          this.display = (this.firstOperand * secondoperand).toString();
          break;
          case '/':
          this.display = secondoperand !==0 ? (this.firstOperand / secondoperand).toString() : 'error';
          break;
      }
      this.operator = '';
      this.firstOperand = null;
    }
  }
}
