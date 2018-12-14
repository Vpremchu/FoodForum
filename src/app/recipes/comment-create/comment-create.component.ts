import { Component, OnInit, Input } from '@angular/core';
import { Recipeservice } from '../recipes.service';
import { CommentService } from '../comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {

  recipe: any;
  @Input() comment: any = { Content: "" };

  constructor(private recipeService: Recipeservice, private commentService: CommentService, private router: Router) {
   }

  ngOnInit() {
    this.recipeService.getRecipe(this.recipe.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.recipe = data
    })
  }

  addComment() {
    this.commentService.addCommentToRecipe(this.recipe._id, this.comment).subscribe((result) => {
      this.router.navigate(['/recipe-details/' + result._id]);
    }, (err) => {
      console.log(err);
    }); 
  }

  saveComment() {}

}
