import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentUrl = 'https://foodforum-api.herokuapp.com/api/comment';
  
  constructor(private http: HttpClient) { } 

  addCommentToRecipe(id, comment) {
    return this.http.post(this.commentUrl + '/' + id, JSON.stringify(comment), httpOptions).pipe(
      tap(_ => console.log(`added comment id=${id}`)),
      catchError(this.handleError<any>('updateComment'))
    );
  }

  updateComment(id, comment): Observable<any> {
    return this.http.put(this.commentUrl + '/' + id, JSON.stringify(comment), httpOptions).pipe(
      tap(_ => console.log(`updated comment id=${id}`)),
      catchError(this.handleError<any>('updateComment'))
    );
  }

  deleteComment(id): Observable<any> {
    return this.http.delete<any>(this.commentUrl + '/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted comment id=${id}`)),
      catchError(this.handleError<any>('deleteComment'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
