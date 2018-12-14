import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Recipe } from './recipe';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class Recipeservice {

    private recipesUrl = 'http://localhost:3000/api/recipe';
    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    constructor(private http: HttpClient) { }    

    getRecipes() {
        return this.http
            .get<Recipe[]>(this.recipesUrl).pipe(
                // map(data => data), 
            catchError(this.handleError<any>('getRecipes'))
        );
    }

    getRecipe(id): Observable<any> {
        return this.http.get(this.recipesUrl + '/' + id).pipe(
            map(this.extractData));
    }

    deleteRecipe(recipe: Recipe) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const url = `${this.recipesUrl}/${recipe.Id}`;

        return this.http.delete<Recipe>(url).pipe(catchError(this.handleError<any>('deleteRecipe')));
    }

    // Add new Recipe
    post(recipe: Recipe) {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post<Recipe>(this.recipesUrl, recipe)
            .pipe(catchError(this.handleError<any>('postRecipe')));
    }

    // Update existing Recipe
    put(id, product): Observable<any> {
        return this.http.put(this.recipesUrl + '/' + id, JSON.stringify(product), httpOptions).pipe(
            tap(_ => console.log(`updated product id=${id}`)),
            catchError(this.handleError<any>('updateProduct'))
        );
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