import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterBlockComponent } from './master-block.component';


const routes: Routes = [{
	path:'',
	component:MasterBlockComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterBlockRoutingModule { }
