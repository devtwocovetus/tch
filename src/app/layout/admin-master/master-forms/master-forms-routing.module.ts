import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterFormsComponent } from './master-forms.component';


const routes: Routes = [{
	path:'',
	component:MasterFormsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterFormsRoutingModule { }
