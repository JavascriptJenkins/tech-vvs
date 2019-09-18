import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { Approutes } from './app-routing.module';
import { AppComponent,Safe} from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import {PaypalService, UserService} from "./app.service";
import {AuthService} from "./core/auth.service";
import {OrganizationService} from "./crud-tables/service/organization.service"
import {TokenStorage} from "./core/token.storage";
import {UserComponent} from "./user/user.component";
import {PaypalComponent} from "./paypal/paypal.component";
import {Interceptor} from "./core/inteceptor";
import {CustomMaterialModule} from "./core/material.module";
import {AppRoutingModule} from "./core/app.routing.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import {LoginComponent} from "./authentication/login/login.component";
import {OrganizationComponent} from "./crud-tables/organization/organization.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {CrudTablesModule} from "./crud-tables/crud-tables.module";
import {ProductService} from "./crud-tables/service/product.service";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    AppComponent,
    UserComponent,
    PaypalComponent,
    Safe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CustomMaterialModule,
    NgbModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forRoot(Approutes),
    PerfectScrollbarModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthenticationModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    CrudTablesModule
  ],
  providers: [UserService, AuthService, OrganizationService, ProductService, TokenStorage, PaypalService, Safe, LoginComponent,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
