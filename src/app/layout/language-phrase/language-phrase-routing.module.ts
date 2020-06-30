import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguagePhraseComponent } from './language-phrase.component';


const routes: Routes = [{
	path:'',
	component:LanguagePhraseComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguagePhraseRoutingModule { }
