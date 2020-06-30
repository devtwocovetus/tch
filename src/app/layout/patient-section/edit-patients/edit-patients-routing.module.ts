import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPatientsComponent } from './edit-patients.component';

const routes: Routes = [
{path:'',component:EditPatientsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPatientsRoutingModule { }
