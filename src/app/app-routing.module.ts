import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeCreateComponent } from "./recipes/recipe-create/recipe-create.component";

import { CommentCreateComponent } from "./recipes/comment-create/comment-create.component";

import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CommentEditComponent } from './recipes/comment-edit/comment-edit.component';
 
const routes: Routes = [
  { path: 'recipe-detail/:id', component: RecipeDetailComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'recipe-edit/:id', component: RecipeEditComponent},
  { path: 'comment-create/:id', component: CommentCreateComponent},
  { path: 'recipe-create', component: RecipeCreateComponent},
  { path: 'comment-edit/:id', component: CommentEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
