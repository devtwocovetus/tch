import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-kb-article-feedback',
  templateUrl: './kb-article-feedback.component.html',
  styleUrls: ['./kb-article-feedback.component.css']
})
export class KbArticleFeedbackComponent implements OnInit {
  rating:number

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private UserService:UserService, private router:Router,
    private location: Location, private title: Title, private translate: TranslateService, private toster: ToastrService) { }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.rating = 0
  }
  onRatingSet(evt){

  }
  goBack(){
  	this.location.back()
  }

}
