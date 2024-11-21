import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuOpen: boolean = false; // Initial menu state
  showTask: boolean= false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Toggle sidebar visibility
  }



  toggle(){
    this.showTask = !this.showTask
  }
}
