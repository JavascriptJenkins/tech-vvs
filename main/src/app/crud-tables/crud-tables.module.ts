import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { OrganizationComponent } from './organization/organization.component';
import {ProductComponent} from "./product/product.component";

@NgModule({
  imports: [CommonModule, RouterModule, NgxDatatableModule, Ng2SmartTableModule],
  declarations: [OrganizationComponent, ProductComponent]
})

export class CrudTablesModule {}
