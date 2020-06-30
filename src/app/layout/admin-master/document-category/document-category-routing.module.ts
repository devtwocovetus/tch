import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentCategoryComponent } from './document-category.component';


const routes: Routes = [{
	path:'',
	component:DocumentCategoryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentCategoryRoutingModule { }
