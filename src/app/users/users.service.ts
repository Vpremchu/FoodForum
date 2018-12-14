import { Injectable, Output, EventEmitter } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { map, catchError, tap } from 'rxjs/operators';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  usersUrl = 'https://foodforum-api.herokuapp.com/user';
  users: User[];
  @Output() user: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getUsers() {
    return this.http
      .get<User[]>(this.usersUrl).pipe(
        map(data => data),
      catchError(this.handleError<any>('getUsers'))
      )
  }

  getUser(id): Observable<any> {
    return this.http.get(this.usersUrl + '/' + id).pipe(
      map(this.extractData));
  }

  getUserByEmail(email) {
    return this.http.get(this.usersUrl + '/email/' + email).pipe(
      map(this.extractData)
    );
  }

  addRecipeToUser ( id, product): Observable<any> {
    return this.http.post<any>(this.usersUrl + '/' + id, JSON.stringify(product), httpOptions).pipe(
      tap(_ => console.log('added recipe to user w/ id=' + product)),
      catchError(this.handleError<any>('addRecipeToUser'))
    )
  }

  register(product): Observable<any> {
    console.log(product);
    return this.http.post<any>(this.usersUrl, JSON.stringify(product), httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('register'))
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.usersUrl + '/authenticate', { email, password }, httpOptions).pipe(
      map(this.setSession.bind(this)),
      catchError(this.handleError<any>('login'))
    );
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.data.token);
    localStorage.setItem('username', authResult.data.user.name);
    localStorage.setItem('email', authResult.data.user.email);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    this.user.emit(null);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("username");
    localStorage.removeItem('email');
    this.user.emit(null);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  updateUser(email, user): Observable<any> {
    return this.http.put(this.usersUrl + '/' + email, JSON.stringify(user), httpOptions).pipe(
      tap(_ => console.log(`updated user id=${email}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser(email) {
    return this.http.delete<any>(this.usersUrl + '/' + email, httpOptions).pipe(
      tap(_ => console.log(`deleted user email=${email}`)),
      catchError(this.handleError<any>('deleteUser'))
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
