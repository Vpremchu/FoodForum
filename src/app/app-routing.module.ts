import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
 
const routes: Routes = [
  { path: 'recipe-detail/:id', component: RecipeDetailComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user-detail/:id', component: UserDetailComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
