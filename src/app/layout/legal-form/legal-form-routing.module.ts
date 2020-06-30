import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LegalFormComponent } from './legal-form.component';


const routes: Routes = [{
	path:'',
	component:LegalFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalFormRoutingModule { }
