import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VcViewComponent } from './vc-view.component';


const routes: Routes = [{
	path:'',
	component:VcViewComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VcViewRoutingModule { }
