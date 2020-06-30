import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsIntakeComponent } from './actions-intake.component';


const routes: Routes = [{
		path:'',
		component:ActionsIntakeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsIntakeRoutingModule { }
