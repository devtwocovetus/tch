import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


import { AssignIntakeListRoutingModule } from './assign-intake-list-routing.module';
import { AssignIntakeListComponent } from './assign-intake-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [AssignIntakeListComponent],
  imports: [
    CommonModule,
    TranslateModule,
        AssignIntakeListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ]
})
export class AssignIntakeListModule { }
