import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddIntakeComponent } from './add-intake.component';


const routes: Routes = [{
	path:'',
	component:AddIntakeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddIntakeRoutingModule { }
