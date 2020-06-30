import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterRelationshipComponent } from './master-relationship.component';


const routes: Routes = [{
	path:'',
	component:MasterRelationshipComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRelationshipRoutingModule { }
