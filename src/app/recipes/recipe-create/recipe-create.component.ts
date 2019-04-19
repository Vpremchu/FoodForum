import { Component, OnInit, Input } from '@angular/core';
import { Recipeservice } from '../recipes.service';
import { UsersService } from '../../users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  userID: any;
  recipeForm: FormGroup;
  ingredients: FormArray;

  @Input() recipe: any = { Name: '', Ingredients: [], Description: "", User: this.userID, Preperation: "", Category: "", ImageUrl: "" };

  constructor(private usersService: UsersService, private recipeService: Recipeservice, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.usersService.getUserByEmail(localStorage.getItem('username')).subscribe((data: any = {}) => {
      this.userID = data._id
    });
    this.recipeForm = this.formBuilder.group({
      Name: '',
      Description: '',
      Ingredients: this.formBuilder.array([this.createItem()]),
      User: this.userID,
      Preperation: '',
      Category: '',
      ImageUrl: ''
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      Name: '',
      Description: '',
      Amount: ''
    });
  }

  createRecipe() {
    this.recipeService.post(this.recipe).subscribe((result) => {
      this.addRecipeToUser(this.recipe.User, result);
      this.router.navigate(['/recipe-details/' + result._id]);
    }, (err) => {
      console.log(err);
    });
  }

  addRecipeToUser(userID, recipe) {
    this.usersService.addRecipeToUser(this.userID, this.recipe).subscribe((result) => {
      console.log("added recipe to user w/ id=" + this.userID)
    }, (err) => {
      console.log(err);
    });

  }

}
