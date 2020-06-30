import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPhysicianOfficeComponent } from './edit-physician-office.component';


const routes: Routes = [{
	path:'',
	component:EditPhysicianOfficeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPhysicianOfficeRoutingModule { }
