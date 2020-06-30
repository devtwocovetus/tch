import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
showLoader
  dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject();
constructor(private translate: TranslateService,) { }

  ngOnDestroy(): void {
	// Do not forget to unsubscribe the event
	this.dtTrigger.unsubscribe();
}

ngOnInit() {
    this.dtOptions = {
	pagingType: 'full_numbers',
	pageLength: 10
};

  	console.log('dadsadsads')
  }

}
//import { TranslateModule } from '@ngx-translate/core';


//this.translate.instant(