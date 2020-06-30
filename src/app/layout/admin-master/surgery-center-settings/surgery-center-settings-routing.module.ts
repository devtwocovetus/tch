import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurgeryCenterSettingsComponent } from './surgery-center-settings.component';


const routes: Routes = [{
	path:'',
	component:SurgeryCenterSettingsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurgeryCenterSettingsRoutingModule { }
