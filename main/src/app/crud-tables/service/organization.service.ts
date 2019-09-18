import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppComponent} from 'app/app.component';
import {Organization} from "../organization/organization.component";

@Injectable()
export class OrganizationService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Organization[]> {
    console.log('organization/getAll ::');
    return this.http.get<Organization[]>(AppComponent.getServiceHost()+'/organization/getAll');
  }


  editObject(item): Observable<any> {
    console.log('organization/edit ::');
    const modCreds = JSON.stringify(item);
    return this.http.post<any>(AppComponent.getServiceHost()+'/organization/edit', modCreds);
  }

  deleteObject(item): Observable<any> {
    console.log('organization/delete ::');
    const modCreds = JSON.stringify(item);
    return this.http.post<any>(AppComponent.getServiceHost()+'/organization/delete', modCreds);
  }


}
