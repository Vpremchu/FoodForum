import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../comment.service';
import { Recipeservice } from '../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {

  recipe: any;
  @Input() comment: any = { _id: "",Content: "" }

  constructor(private commentService: CommentService, private recipeService: Recipeservice, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
      this.comment._id = this.route.snapshot.params['id']
  }

  updateComment() {
    this.commentService.updateComment(this.comment._id, this.comment).subscribe((result) => {
      this.router.navigate(['/recipe-detail/' + result._id]);
    }, (err) => {
      console.log(err);
    });
  }

}
