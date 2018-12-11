import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = 'http://localhost:3000/api/user';
  users: User[];

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http
      .get<User[]>(this.usersUrl + "s").pipe(
        map(data => data),
      catchError(this.handleError<any>('getUsers'))
      )
  }

  login() {

  }

  logout() {
    
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
