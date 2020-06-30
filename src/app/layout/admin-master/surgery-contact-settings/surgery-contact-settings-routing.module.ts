import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurgeryContactSettingsComponent } from './surgery-contact-settings.component';


const routes: Routes = [{
	path:'',
	component:SurgeryContactSettingsComponent

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurgeryContactSettingsRoutingModule { }
