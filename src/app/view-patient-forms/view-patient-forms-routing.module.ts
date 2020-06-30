import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPatientFormsComponent } from './view-patient-forms.component';


const routes: Routes = [{
	path:'',
	component:ViewPatientFormsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPatientFormsRoutingModule { }
