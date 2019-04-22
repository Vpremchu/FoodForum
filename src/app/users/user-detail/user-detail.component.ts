import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: any = { _id: '',name: '', Recipes: [], email: ''};


  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.usersService.getUser(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.user = data
    })
  }

  updateUser(email) {
    this.router.navigate(['/user-edit/' + email]);
  }

  deleteUser(id) {
    this.usersService.deleteUser(id)
      .subscribe((result) => {
        this.router.navigate(['/users']);
      }, (err) => {
        console.log(err);
      }
      );
  }

}
