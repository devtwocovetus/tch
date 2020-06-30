import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadDocComponent } from './upload-doc.component';


const routes: Routes = [{
	path:'',
	component: UploadDocComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadDocRoutingModule { }
