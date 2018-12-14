import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;    

  constructor(public usersService: UsersService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  loginUser() {
    const val = this.form.value;
    if (val.email && val.password) {
      this.usersService.login(val.email, val.password)
        .subscribe(() => {
          console.log("User is logged in");
          this.router.navigateByUrl('/');
        });
    }
  }
}
