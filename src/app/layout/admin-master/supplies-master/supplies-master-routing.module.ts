import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SuppliesMasterComponent } from './supplies-master.component';

const routes: Routes = [{
	path:'',
	component:SuppliesMasterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesMasterRoutingModule { }
