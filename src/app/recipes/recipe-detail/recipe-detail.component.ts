import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';
import { Recipeservice } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:any;

  constructor(private recipeService: Recipeservice, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.recipeService.getRecipe(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.recipe = data
    })
  }

  updateRecipe(id) {
    this.router.navigate(['/recipe-edit' + id]);
  }

}
