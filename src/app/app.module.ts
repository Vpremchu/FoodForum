import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TagInputModule } from 'ngx-chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule, MatSelectModule, MatOptionModule, MatToolbarModule, MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatFormFieldModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptService } from "./interceptor.service";
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { CommentCreateComponent } from './recipes/comment-create/comment-create.component';
import { CommentEditComponent } from './recipes/comment-edit/comment-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeDetailComponent,
    UsersComponent,
    NavBarComponent,
    UserDetailComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent,
    RecipeEditComponent,
    RecipeCreateComponent,
    CommentCreateComponent,
    CommentEditComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    MatSelectModule,
    MatOptionModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatGridListModule,
    ReactiveFormsModule,
    TagInputModule    
  ],
  providers: [InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
