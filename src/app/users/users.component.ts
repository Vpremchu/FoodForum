import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { User } from './user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  error: any;

  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => (this.users = users),
        error => (this.error = error)
      );
  }

}
