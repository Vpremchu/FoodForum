import { Component, OnInit, Input } from '@angular/core';
import { Recipeservice } from '../recipes.service';
import { UsersService } from '../../users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  userId: any;
  recipeForm: any;
  //FormGroup;


  @Input() recipe: any = { Name: '', Ingredients: [], Description: "", User: this.userId , Preperation: "", Category: "", ImageUrl: "" };

  constructor(private usersService: UsersService, private recipeService: Recipeservice, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.usersService.getUserByEmail(localStorage.getItem('email')).subscribe((data: any) => {
      this.userId = data[0]._id;
      this.setForm();
    });
  }

  setForm() {
    this.recipeForm = this.formBuilder.group({
      Name: new FormControl(""),
      Description: new FormControl(""),
      Ingredients: this.formBuilder.array([this.createIngredient()]),
      User: this.userId,
      Preperation: new FormControl(""),
      Category: new FormControl(""),
      ImageUrl: new FormControl("")
    });
  }

  get Ingredients() {
    return this.recipeForm.get('Ingredients') as FormArray;
  }

  addIngredient() {
    this.Ingredients.push(this.createIngredient());
  }

  createIngredient(): FormGroup {
    return this.formBuilder.group({
      Name: new FormControl(""),
      Description: new FormControl(""),
      Amount: new FormControl("")
    });
  }

  deleteIngredient(i) {
    this.Ingredients.removeAt(i);
  }

  createRecipe() {
    console.log(this.recipeForm.value);
    this.recipeService.post(this.recipeForm.value).subscribe((result) => {
      console.log(result)
      this.usersService.addRecipeToUser(this.userId, result);
      this.router.navigate(['/recipe-detail/' + result._id]);
    }, (err) => {
      console.log(err);
    });
  }

  addRecipeToUser(userID, recipe) {
    this.usersService.addRecipeToUser(this.userId, this.recipe).subscribe((result) => {
      console.log("added recipe to user w/ id=" + this.userId)
    }, (err) => {
      console.log(err);
    });

  }

}
