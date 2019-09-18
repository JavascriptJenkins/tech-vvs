import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppComponent} from "../app.component";

@Injectable()
export class AuthService {

  baseUrl: 'http://localhost:8080/email2sms/';

  constructor(private http: HttpClient) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    console.log('attempAuth ::');
    console.log(typeof credentials);
    console.log(credentials);
    const modCreds = JSON.stringify(credentials);
    console.log('modCreds');
    console.log(typeof modCreds);
    console.log(modCreds);
    return this.http.post<any>(AppComponent.getServiceHost()+'/users/signin', credentials);
  }

  createAccount(username: string, password: string, email:string): Observable<any> {
      const credentials = {username: username, password: password , email:email};
      console.log('createAccount ::');
      console.log(typeof credentials);
      console.log(credentials);
      const modCreds = JSON.stringify(credentials);
      console.log('modCreds');
      console.log(typeof modCreds);
      console.log(modCreds);
      return this.http.post<any>(AppComponent.getServiceHost()+'/users/createAccount', credentials);
  }

  sendResetToken(username: string, email:string): Observable<any> {
    const credentials = {username: username, email:email};
    console.log('sendResetToken ::');
    console.log(typeof credentials);
    console.log(credentials);
    const modCreds = JSON.stringify(credentials);
    console.log('modCreds');
    console.log(typeof modCreds);
    console.log(modCreds);
    return this.http.post<any>(AppComponent.getServiceHost()+'/users/sendResetToken', credentials);
  }


  sendChangePassword(password: string): Observable<any> {
    const credentials = {password:password};
    console.log('sendChangePassword ::');
    console.log(typeof credentials);
    console.log(credentials);
    const modCreds = JSON.stringify(credentials);
    console.log('modCreds');
    console.log(typeof modCreds);
    console.log(modCreds);
    return this.http.post<any>(AppComponent.getServiceHost()+'/users/sendChangePassword', credentials);
  }


  sendValidateUserEmail(username: string): Observable<any> {
    const credentials = {username: username};
    console.log('sendValidateUserEmail ::');
    console.log(typeof credentials);
    console.log(credentials);
    const modCreds = JSON.stringify(credentials);
    console.log('modCreds');
    console.log(typeof modCreds);
    console.log(modCreds);
    return this.http.post<any>(AppComponent.getServiceHost()+'/users/validateUserEmail', credentials);
  }


}
