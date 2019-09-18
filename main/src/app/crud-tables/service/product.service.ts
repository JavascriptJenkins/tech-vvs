import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppComponent} from 'app/app.component';
import {Product} from "../product/product.component";

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    console.log('product/getAll ::');
    return this.http.get<Product[]>(AppComponent.getServiceHost()+'/product/getAll');
  }


  editObject(item): Observable<any> {
    console.log('product/edit ::');
    const modCreds = JSON.stringify(item);
    return this.http.post<any>(AppComponent.getServiceHost()+'/product/edit', modCreds);
  }

  deleteObject(item): Observable<any> {
    console.log('product/delete ::');
    const modCreds = JSON.stringify(item);
    return this.http.post<any>(AppComponent.getServiceHost()+'/product/delete', modCreds);
  }


}