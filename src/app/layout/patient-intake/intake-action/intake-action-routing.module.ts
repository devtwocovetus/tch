import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntakeActionComponent } from './intake-action.component';


const routes: Routes = [{
	path:'',
	component:IntakeActionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntakeActionRoutingModule { }
