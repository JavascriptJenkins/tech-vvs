import {Injectable, Pipe} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from './user/user.model';
import {PaypalModel} from './paypal/paypal.model';
import {AppComponent} from "./app.component";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  private userUrl = AppComponent.getServiceHost()+'';

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/users/users');
  }

}

@Injectable()
export class PaypalService {

  constructor(private http: HttpClient) {}

  private paypalUrl = AppComponent.getServiceHost()+'';

  public getPaypayModel(): Observable<PaypalModel[]> {
    return this.http.get<PaypalModel[]>(this.paypalUrl + '/paypal/paypal');
  }

}
