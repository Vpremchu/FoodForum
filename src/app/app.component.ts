import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  router: Router;
  title = 'Food Forum';

  // gotoRecipes(): void{
  //   this.router.navigate(['recipes']);
  // }
  
  // gotoUserS(): void {
  //   this.router.navigate(['users']);
  // }
}
