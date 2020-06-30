import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddIntakeTypeComponent } from './add-intake-type.component';


const routes: Routes = [{
	path:'',
	component:AddIntakeTypeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddIntakeTypeRoutingModule { }
