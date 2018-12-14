import { Component, OnInit, Input } from '@angular/core';
import { Recipeservice } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  @Input() recipe: any = { Name: '', Ingredients: [], Description: "", Preperation: "", Category: "", ImageUrl: "" };


  constructor(private recipeService: Recipeservice, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.recipeService.getRecipe(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.recipe = data
    })
  }

  saveEdit() {
    this.recipeService.put(this.route.snapshot.params['id'], this.recipe).subscribe((result) => {
      this.router.navigate(['/recipe-detail/' + result._id]);
    }, (err) => {
      console.log(err);
    });
  }

}
