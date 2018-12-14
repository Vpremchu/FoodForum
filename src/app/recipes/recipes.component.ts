import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';
import { Recipeservice } from './recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[] = [];
  selectedRecipe: Recipe;
  addingRecipe = false;
  error: any;

  constructor(
    private recipeService: Recipeservice,
    private router: Router) { }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getRecipes()
      .subscribe(
        
        recipes => {
          console.log(recipes);
          this.recipes = recipes;
        },
        error => this.error = error
        );
  }

  onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
    this.addingRecipe = false;
  }

  gotoDetail(id): void {
    this.router.navigate(['/recipe-detail/' +id]);
  }

  createRecipe() {
    this.router.navigate(['/recipe-create']);
  }

}

