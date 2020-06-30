import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPermissionRoutingModule } from './user-permission-routing.module';
import { UserPermissionComponent } from './user-permission.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [UserPermissionComponent],
  imports: [
    CommonModule,
DataTablesModule,
    UserPermissionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class UserPermissionModule { }
