import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditSurgeryCenterComponent } from './edit-surgery-center.component';


const routes: Routes = [{
	path:'',
	component:EditSurgeryCenterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditSurgeryCenterRoutingModule { }
