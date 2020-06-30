import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhysicianContactSettingsComponent } from './physician-contact-settings.component';


const routes: Routes = [{
	path:'',
	component:PhysicianContactSettingsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicianContactSettingsRoutingModule { }
