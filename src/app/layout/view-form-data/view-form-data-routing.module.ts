import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewFormDataComponent } from './view-form-data.component';


const routes: Routes = [{
	path:'',
	component:ViewFormDataComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewFormDataRoutingModule { }
