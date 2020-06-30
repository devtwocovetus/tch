import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignIntakeListComponent } from './assign-intake-list.component';


const routes: Routes = [{
	path:'',
	component:AssignIntakeListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignIntakeListRoutingModule { }
