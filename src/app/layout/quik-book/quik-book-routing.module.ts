import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuikBookComponent } from './quik-book.component';



const routes: Routes = [
{path:'',component:QuikBookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuikBookRoutingModule { }
