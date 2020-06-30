import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginUserComponent } from './login-user.component';

const routes: Routes = [{
	path:'',
	component:LoginUserComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginUserRoutingModule { }
