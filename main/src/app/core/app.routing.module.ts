import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from '../user/user.component';

import {PaypalComponent} from '../paypal/paypal.component';
import {LoginComponent} from "../authentication/login/login.component";

import {OrganizationComponent} from "../crud-tables/organization/organization.component";
import {ProductComponent} from "../crud-tables/product/product.component";

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  {path : '', component : LoginComponent},
  {path : 'paypal', component: PaypalComponent},
  {path: 'organization', component: OrganizationComponent},
  {path: 'product', component: ProductComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
