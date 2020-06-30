import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhysicianCenterSettingsComponent } from './physician-center-settings.component';


const routes: Routes = [{
	path:'',
	component:PhysicianCenterSettingsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhysicianCenterSettingsRoutingModule { }
