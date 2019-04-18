import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { Recipeservice } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:any;
  user:any;

  constructor(private usersService: UsersService, private recipeService: Recipeservice, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.recipeService.getRecipe(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.recipe = data
      this.usersService.getUser(this.recipe.User)
        .subscribe((data: {}) => {
          console.log(data);
          this.user = data;
        })
    })
  }

  addComment(id) {
    this.router.navigate(['/comment-create/' + id]);
  }

  updateComment(id) {

  }

  deleteComment(id) {
    
  }

  updateRecipe(id) {
    this.router.navigate(['/recipe-edit/' + id]);
  }

  deleteRecipe(id) {
    this.recipeService.deleteRecipe(id)
      .subscribe((result) => {
        this.router.navigate(['/recipe-detail/' + result._id]);
      },(err) => {
        console.log(err);
      }
      );
  }

}
