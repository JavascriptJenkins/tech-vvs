import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {TokenStorage} from './token.storage';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {LoginComponent} from "../authentication/login/login.component";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router, private loginComponent: LoginComponent) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let authReq = req;
    console.log('this.token.getToken() : ',this.token.getToken() );
// note: check if token is going to signinurl before sending existing token
    if (this.token.getToken() != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
    }

    return next.handle(authReq).catch(x=> this.handleAuthError(x)); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403 || err.status === 422 || err.status === 400 || err.status === 404) {
      console.log('-----AUTH ERROR    -----');
      console.log('-----REMOVING TOKEN-----');
      this.token.signOut(); // remove the invalid token

      //  pass a list of errors for the login controller to use
      // let navextras: NavigationExtras={
      //   queryParams:{"messageList":JSON.stringify({"usernameError":"Incorrect username or Password. ", "generalError":"General error text. "})}
      // };

      // JSONify the error message from backend server so the ui can display it
      let navextras: NavigationExtras={
        queryParams:{"messageList":JSON.stringify(err.error.message)}
      };

      // if "createAccount" is in the return path url, we know an error happened
      // on the createAccount page and we need to redirect back to createAccount
      if(err.error.path.includes("createAccount")){
        this.router.navigate(['signup'],navextras);
      }

      if(err.error.path.includes("signin")){
        this.router.navigate(['login'],navextras);
      }

      if(err.error.path.includes("sendResetToken")){
        this.router.navigate(['login'],navextras);
      }

      console.log('errerrerrerr: ',err);


      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      //return Observable.of(err);
    }
    return Observable.of(err);
  }

}
