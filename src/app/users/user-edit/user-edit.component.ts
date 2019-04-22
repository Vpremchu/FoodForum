import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user:any;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.usersService.getUser(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.user = data
    })
  }

  saveEdit() {
    this.usersService.updateUser(this.route.snapshot.params['id'], this.user).subscribe((result) => {
      this.router.navigate(['/user-detail/' + result._id]);
    }, (err) => {
      console.log(err);
    });
  }

}
