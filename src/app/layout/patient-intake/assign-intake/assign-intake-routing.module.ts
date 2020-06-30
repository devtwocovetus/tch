import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignIntakeComponent } from './assign-intake.component';


const routes: Routes = [{
	path:'',
	component:AssignIntakeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignIntakeRoutingModule { }
