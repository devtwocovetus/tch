import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VcEditComponent } from './vc-edit.component';


const routes: Routes = [{
	path:'',
	component: VcEditComponent
	}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VcEditRoutingModule { }
