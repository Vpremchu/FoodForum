import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { Recipeservice } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:any;
  user:any;

  constructor(private commentService: CommentService, private usersService: UsersService, private recipeService: Recipeservice, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getRecipe()
  }

  getRecipe() {
    this.recipeService.getRecipe(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.recipe = data;
      
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

  updateRecipe(id) {
    this.router.navigate(['/recipe-edit/' + id]);
  }

  deleteRecipe(id) {
    this.recipeService.deleteRecipe(id)
      .subscribe((result) => {
        this.getRecipe();
        //this.router.navigate(['/recipes']);
      },(err) => {
        console.log(err);
      }
      );
  }

  updateComment(id) {
    this.router.navigate(['/comment-edit/' + id]);
  }

  deleteComment(id) {
    this.commentService.deleteComment(id).subscribe((result) => {
      this.router.navigate(['/recipe-detail/' + this.recipe._id]);
    }, (err) => {
      console.log(err);
    });
  }

}
