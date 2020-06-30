import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KbAttachmentComponent } from './kb-attachment.component';


const routes: Routes = [{
	path:'',
	component:KbAttachmentComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KbAttachmentRoutingModule { }
