import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VcHistoryComponent } from './vc-history.component';


const routes: Routes = [{
	path:'',
	component:VcHistoryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VcHistoryRoutingModule { }
