import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicalFormComponent } from './medical-form.component';


const routes: Routes = [{
	path:'',
	component:MedicalFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalFormRoutingModule { }
