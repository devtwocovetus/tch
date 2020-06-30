import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterProcedureComponent } from './master-procedure.component';


const routes: Routes = [{
	path:'',
	component:MasterProcedureComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterProcedureRoutingModule { }
