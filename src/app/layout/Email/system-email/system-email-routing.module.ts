import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemEmailComponent } from './system-email.component';


const routes: Routes = [{
	path:'',
	component:SystemEmailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemEmailRoutingModule { }
