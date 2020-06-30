import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAttachmentsComponent } from './add-attachments.component';


const routes: Routes = [{
	path:'',
	component:AddAttachmentsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAttachmentsRoutingModule { }
