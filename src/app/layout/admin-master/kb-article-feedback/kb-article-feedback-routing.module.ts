import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KbArticleFeedbackComponent } from './kb-article-feedback.component';


const routes: Routes = [{
	path:'',
	component:KbArticleFeedbackComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KbArticleFeedbackRoutingModule { }
