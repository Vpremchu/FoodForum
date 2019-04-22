import { Component, OnInit, Input } from '@angular/core';
import { Recipeservice } from '../recipes.service';
import { CommentService } from '../comment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {

  recipe: any;  
  @Input() comment: any = { User: "", RecipeId: "", Content: "" };

  constructor(private usersService: UsersService, private recipeService: Recipeservice, private commentService: CommentService, private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.recipeService.getRecipe(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.recipe = data
    })
    this.usersService.getUserByEmail(localStorage.getItem('email')).subscribe((data: any = {}) => {
      this.comment.User = data[0]._id
    });
    this.comment.RecipeId = this.route.snapshot.params['id'];
  }

  addComment() {
    console.log(this.comment);
    this.commentService.addCommentToRecipe(this.recipe._id, this.comment).subscribe((result) => {
      this.router.navigate(['/recipe-detail/' + this.recipe._id]);
    }, (err) => {
      console.log(err);
    }); 
  }

  updateComment() {
    this.commentService.updateComment(this.comment._id, this.comment).subscribe((result) => {
      this.router.navigate(['/recipe-detail/' + this.recipe._id]);
    }, (err) => {
      console.log(err);
    });
  }

  deleteComment() {
    this.commentService.deleteComment(this.comment._id).subscribe((result) => {
      this.router.navigate(['/recipe-detail/' + this.recipe._id]);
    }, (err) => {
      console.log(err);
    });
  }

}
