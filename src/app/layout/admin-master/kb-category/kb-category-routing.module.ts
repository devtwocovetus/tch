import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KbCategoryComponent } from './kb-category.component';


const routes: Routes = [{
	path:'',
	component:KbCategoryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KbCategoryRoutingModule { }
