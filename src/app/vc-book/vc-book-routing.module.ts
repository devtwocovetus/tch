import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VcBookComponent } from './vc-book.component';

const routes: Routes = [{
	path:'',
	component:VcBookComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VcBookRoutingModule { }
