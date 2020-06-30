import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstrumentationMasterComponent } from './instrumentation-master.component';

const routes: Routes = [{
	path:'',
	component:InstrumentationMasterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstrumentationMasterRoutingModule { }
