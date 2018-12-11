import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Recipe } from './recipe';

@Injectable()
export class Recipeservice {

    private recipesUrl = 'http://localhost:3000/api/recipe';

    constructor(
        private http: HttpClient,
        //private messageService: MessageService
        ) { }    

    getRecipes() {
        return this.http
            .get<Recipe[]>(this.recipesUrl + "s")
            .pipe(map(data => data), 
            catchError(this.handleError<any>('getRecipes'))
        );
    }

    getRecipe(id: number): Observable<Recipe[]> {
        return this.getRecipes().pipe(
            map(recipes => recipes.find(recipe => recipe.Id === id))
        );
    }

    save(recipe: Recipe) {
        if (recipe.Id) {
            return this.put(recipe);
        }
        return this.post(recipe);
    }

    delete(recipe: Recipe) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const url = `${this.recipesUrl}/${recipe.Id}`;

        return this.http.delete<Recipe>(url).pipe(catchError(this.handleError<any>('deleteRecipe')));
    }

    // Add new Recipe
    private post(recipe: Recipe) {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post<Recipe>(this.recipesUrl, recipe)
            .pipe(catchError(this.handleError<any>('postRecipe')));
    }

    // Update existing Recipe
    private put(recipe: Recipe) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const url = `${this.recipesUrl}/${recipe.Id}`;

        return this.http.put<Recipe>(url, recipe).pipe(catchError(this.handleError<any>('putRecipe')));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${ operation } failed: ${ error.message }`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}