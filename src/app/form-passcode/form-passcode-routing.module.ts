import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormPasscodeComponent } from './form-passcode.component';


const routes: Routes = [{
	path:'',
	component:FormPasscodeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormPasscodeRoutingModule { }
