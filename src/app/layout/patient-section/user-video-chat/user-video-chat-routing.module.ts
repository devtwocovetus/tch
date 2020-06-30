import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserVideoChatComponent } from './user-video-chat.component';


const routes: Routes = [{
	path:'',
	component:UserVideoChatComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserVideoChatRoutingModule { }
