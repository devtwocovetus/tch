import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurgeryFormsComponent } from './surgery-forms.component';


const routes: Routes = [{
	path:'',
	component:SurgeryFormsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurgeryFormsRoutingModule { }
