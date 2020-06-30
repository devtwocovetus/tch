import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditIntakeComponent } from './edit-intake.component';


const routes: Routes = [{
	path:'',
	component:EditIntakeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditIntakeRoutingModule { }
