import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRelationshipRoutingModule } from './master-relationship-routing.module';
import { MasterRelationshipComponent } from './master-relationship.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [MasterRelationshipComponent],
  imports: [
    CommonModule,
DataTablesModule,
    MasterRelationshipRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ]
})
export class MasterRelationshipModule { }
