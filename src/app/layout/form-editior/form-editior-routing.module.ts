import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormEditiorComponent } from './form-editior.component';


const routes: Routes = [{
	path:'',
	component:FormEditiorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormEditiorRoutingModule { }
