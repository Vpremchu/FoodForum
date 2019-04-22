import { Component, OnInit, Input } from '@angular/core';
import { Recipeservice } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: any;

  @Input() recipe: any = { Name: '', Ingredients: [], Description: "", Preperation: "", Category: "", ImageUrl: "" };


  constructor(private recipeService: Recipeservice, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.recipeService.getRecipe(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.recipe = data;
      this.setForm();

      this.recipe.Ingredients.forEach(ingredient => {
        this.addIngredient(ingredient.Name, ingredient.Description, ingredient.Amount)
      });
    })
  }

  setForm() {
    this.recipeForm = this.formBuilder.group({
      Name: new FormControl(this.recipe.Name),
      Description: new FormControl(this.recipe.Description),
      Ingredients: this.formBuilder.array([]),
      Preperation: new FormControl(this.recipe.Preperation),
      Category: new FormControl(this.recipe.Category),
      ImageUrl: new FormControl(this.recipe.ImageUrl)
    });
  }

  get Ingredients() {
    return this.recipeForm.get('Ingredients') as FormArray;
  }

  addIngredient(name, description, amount) {
    this.Ingredients.push(this.createIngredient(name, description, amount));
  }

  createIngredient(name, description, amount): FormGroup {
    return this.formBuilder.group({
      Name: new FormControl(name),
      Description: new FormControl(description),
      Amount: new FormControl(amount)
    });
  }

  addNewIngredient() {
    this.Ingredients.push(this.createNewIngredient());
  }

  createNewIngredient(): FormGroup {
    return this.formBuilder.group({
      Name: new FormControl(""),
      Description: new FormControl(""),
      Amount: new FormControl("")
    });
  }

  deleteIngredient(i) {
    this.Ingredients.removeAt(i);
  }

  saveEdit() {
    console.log(this.recipeForm.value);
    this.recipeService.put(this.recipe._id, this.recipeForm.value).subscribe((result) => {
      this.router.navigate(['/recipe-detail/' + result._id]);
    }, (err) => {
      console.log(err);
    });
  }

}
