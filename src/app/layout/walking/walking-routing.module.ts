import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalkingComponent } from './walking.component';


const routes: Routes = [
{path:'',component:WalkingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalkingRoutingModule { }
