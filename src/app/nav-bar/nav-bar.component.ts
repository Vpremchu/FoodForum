import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from '../users/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private userService: UsersService, private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.checkLogin();
  }

  logout() {
    this.userService.logout();
    this.checkLogin();
    this.router.navigate(['/']);
  }

  checkLogin() {
    if (localStorage.getItem('username') !== null) {
      this.user = true;
    } else {
      this.user = false;
    }

  }

}
