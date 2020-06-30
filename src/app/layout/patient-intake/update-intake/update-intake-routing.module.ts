import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateIntakeComponent } from './update-intake.component';


const routes: Routes = [{
	path:'',
	component:UpdateIntakeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateIntakeRoutingModule { }
