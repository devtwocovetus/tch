import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalkinListComponent } from './walkin-list.component';


const routes: Routes = [{
	path:'', 
	component:WalkinListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalkinListRoutingModule { }
